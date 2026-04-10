import { useState } from "react";
import styles from "./masterlist.module.css";

export default function Masterlist() {
  const [activeTab, setActiveTab] = useState("team");
  const [search, setSearch] = useState("");

  // SAMPLE DATA
  const teamMembers = [
    {
      name: "Sample Name",
      address: "Sample Address",
      contact: "09123456789",
      birthdate: "June 01, 2000",
      emergency: "Emergency Name",
      emergencyNum: "09123456789",
    },
    {
      name: "Maria Santos",
      address: "Quezon City",
      contact: "09876543210",
      birthdate: "March 15, 2001",
      emergency: "Sofia Santos",
      emergencyNum: "09777777777",
    },
  ];

  const [pending, setPending] = useState([
    {
      name: "Juan Dela Cruz",
      email: "juan@sunlife.com.ph",
      contact: "09123456789",
    },
  ]);

  // FILTER FUNCTION
  const filterData = (data) => {
    return data.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  };

  // APPROVE / REJECT
  const handleRemove = (index) => {
    const updated = [...pending];
    updated.splice(index, 1);
    setPending(updated);
  };

  return (
    <div className={styles.page}>
      {/* NAVBAR */}
      <header className={styles.header}>
        <h1>
          TOKYO CITY
          <img
            className={styles["logo-img"]}
            src="/src/images/logo.png"
            alt="Logo"
          />
        </h1>

        <nav className={styles.navbar}>
          <ul>
            <li>
              <a href="/landing">Home</a>
            </li>

            <div className={styles.dropdown}>
              <button className={styles.dropbtn}>Elna Franco</button>

              <div className={styles["dropdown-content"]}>
                <a href="/settings">Settings</a>
                <a href="/advisor">Advisor</a>
                <a href="/">Logout</a>
              </div>
            </div>
          </ul>
        </nav>
      </header>

      {/* TABS */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "team" ? styles.active : ""}
          onClick={() => setActiveTab("team")}
        >
          TEAM MEMBERS
        </button>

        <button
          className={activeTab === "pending" ? styles.active : ""}
          onClick={() => setActiveTab("pending")}
        >
          PENDING REQUESTS
        </button>
      </div>

      {/* SEARCH */}
      <div className={styles["search-bar"]}>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TEAM MEMBERS */}
      {activeTab === "team" && (
        <div className={styles.container}>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Contact</th>
                <th>Birthdate</th>
                <th>Emergency Person</th>
                <th>Emergency Number</th>
              </tr>
            </thead>
            <tbody>
              {filterData(teamMembers).map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.address}</td>
                  <td>{member.contact}</td>
                  <td>{member.birthdate}</td>
                  <td>{member.emergency}</td>
                  <td>{member.emergencyNum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PENDING REQUESTS */}
      {activeTab === "pending" && (
        <div className={styles.container}>
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th style={{ textAlign: "right" }}>Approval</th>
              </tr>
            </thead>
            <tbody>
              {filterData(pending).map((user, index) => (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.contact}</td>
                  <td className={styles.actions}>
                    <button
                      className={styles.approve}
                      onClick={() => {
                        alert("User Approved ✅");
                        handleRemove(index);
                      }}
                    >
                      ✔
                    </button>

                    <button
                      className={styles.reject}
                      onClick={() => {
                        alert("User Rejected ❌");
                        handleRemove(index);
                      }}
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}