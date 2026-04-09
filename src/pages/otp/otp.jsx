import { useNavigate } from "react-router-dom";
import styles from "./otp.module.css";

export default function Otp() {
  const navigate = useNavigate();

  const handleVerify = (e) => {
    e.preventDefault();

    const code = e.target.code.value;

    if (!code || code.length !== 6) {
      alert("Enter a valid 6-digit code.");
      return;
    }

    // 👉 redirect to new password page
    navigate("/new-password");
  };

  return (
    <div className={`${styles["otp-page"]}`}>
      <div className={styles.background}>
        <div className={styles.card}>
          
          <h1>Verify Code</h1>
          <p className={styles.subtitle}>
            Enter the 6-digit code sent to your email
          </p>

          <form onSubmit={handleVerify}>
            <div className={styles["input-group"]}>
              <input
                type="text"
                name="code"
                maxLength="6"
                placeholder=" "
                required
              />
              <label>Verification Code</label>
            </div>

            {/* Button instead of <a> */}
            <button type="submit" className={styles.btn2}>
              Verify Code
            </button>
          </form>

          <p className={styles.switch}>
            Remember your password?{" "}
            <span
              className={styles.link}
              onClick={() => navigate("/login")}
              style={{ cursor: "pointer" }}
            >
              LOGIN
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}