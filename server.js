const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED PROMISE:", err);
});


app.use(express.json());

app.use(
  cors({origin: ["http://localhost:5173", "http://localhost:5174"],
  }),
);

app.use(
  "/files",
  express.static(path.join(process.cwd(), "src/Tokyo_City/upload_files"))
)

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folder = req.params.folderId;

    const uploadPath = path.join(
      process.cwd(),
      "src",
      "Tokyo_City",
      "upload_files",
      folder
    );

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });


/* ===============================
   UPLOAD FILES
================================ */
app.post("/api/upload/:folderId", upload.array("file-upload", 10), (req, res) => {
  try {

    const folderId = req.params.folderId;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    res.json({
      message: "Upload successful",
      files: req.files
    });

  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
});

/* ===============================
   GET ALL FILES IN upload_files
================================ */
app.get("/api/files/:folderId", (req, res) => {
  const folderId = req.params.folderId;

  const folderPath = path.join(
    process.cwd(),
    "src/Tokyo_City/upload_files",
    folderId
  );

  if (!fs.existsSync(folderPath)) {
    return res.json([]);
  }

  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).json({ message: "Error reading folder" });

    const fileList = files.map((file) => ({
      name: file,
      url: `/files/${folderId}/${file}`,
    }));

    res.json(fileList);
  });
});

/* ===============================
   GET A SINGLE FILE
================================ */
app.get("/view/:folderId/:filename", (req, res) => {
  const { folderId, filename } = req.params;

  const filePath = path.join(
    process.cwd(),
    "src/Tokyo_City/upload_files",
    folderId,
    filename
  );

  const ext = path.extname(filePath).toLowerCase();

  const types = {
    ".pdf": "application/pdf",
    ".docx":
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ".xlsx":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ".jpg": "image/jpeg",
    ".png": "image/png",
    ".mp4": "video/mp4",
  };

  res.setHeader("Content-Type", types[ext] || "application/octet-stream");
  res.setHeader("Content-Disposition", "inline");

  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send("File not found");
  });
});

// ===============================
// DELETE FILES
// ===============================
app.post("/api/delete/:folder", (req, res) => {
  const { folder } = req.params;
  const { files } = req.body;

  console.log("Folder:", folder);
  console.log("Files:", files);

  if (!files || !Array.isArray(files)) {
    return res.status(400).json({ error: "No files provided" });
  }

  const folderPath = path.join(
    process.cwd(),
    "src",
    "Tokyo_City",
    "upload_files",
    folder
  );

  try {
    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    });

    res.json({ message: "Files deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Delete failed" });
  }
});


// ===============================
// SEARCH FILES (by partial match)
// ===============================
app.get("/api/search-bar", (req, res) => {
  const { filename, folder } = req.query;

  const folderPath = path.join(
    process.cwd(),
    "src",
    "Tokyo_City",
    "upload_files",
    folder
  );

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error("Search error:", err);
      return res.status(500).json({ error: "Unable to scan folder" });
    }

    const filtered = files.filter(file =>
      file.toLowerCase().includes(filename.toLowerCase())
    );

    res.json(filtered.map(name => ({ name })));
  });
});



/* ===============================
   STATIC FILES
================================ */
app.use(express.static("src"));

/* ===============================
   START SERVER
================================ */
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});