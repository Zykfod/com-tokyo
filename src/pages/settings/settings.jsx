import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./settings.module.css";

export default function Settings() {
  const navigate = useNavigate();

  // ======================
  // STATE
  // ======================
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // ======================
  // LOAD DATA
  // ======================
  useEffect(() => {
    const storedName = localStorage.getItem("userFullname") || "";
    const storedEmail = localStorage.getItem("userEmail") || "";
    const storedAddress = localStorage.getItem("userAddress") || "";
    const storedCity = localStorage.getItem("userCity") || "";

    setName(storedName);
    setEmail(storedEmail);

    const fullAddress =
      storedAddress && storedCity
        ? `${storedAddress}, ${storedCity}`
        : storedAddress + storedCity;

    setAddress(fullAddress);
  }, []);

  // ======================
  // HANDLERS
  // ======================
  const handleUpdate = () => {
    navigate("/changepass");
  };

  return (
    <div className={styles.page}>
      <div className={styles["settings-container"]}>
        
        {/* LEFT SIDE */}
        <div className={styles.settingsleft}>
          <h2>ACCOUNT SETTINGS</h2>

          <img
            src="/src/images/profile1.jpg"
            alt="profile"
            className={styles.settingsprofile}
          />

          <div className={styles.settingslocation}>TOKYO CITY</div>
        </div>

        <div className={styles.settingsdivider}></div>

        {/* RIGHT SIDE */}
        <div className={styles.settingsright}>
          <button
            className={styles.settingsclose}
            onClick={() => navigate("/landing")}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <label className={styles["settings-label"]}>Full Name</label>
          <input
            type="text"
            className={styles["settings-input"]}
            value={name}
            readOnly
          />

          <label className={styles["settings-label"]}>Email Address</label>
          <input
            type="email"
            className={styles["settings-input"]}
            value={email}
            readOnly
          />

          <label className={styles["settings-label"]}>Address</label>
          <input
            type="text"
            className={styles["settings-input"]}
            value={address}
            readOnly
          />

          <button
            className={styles.settingschange}
            onClick={handleUpdate}
          >
            CHANGE PASSWORD
          </button>
        </div>

      </div>
    </div>
  );
}