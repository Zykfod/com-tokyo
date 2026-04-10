import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./forgotpass.module.css";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();

    // validate email domain
    if (!trimmedEmail.endsWith("@sunlife.com.ph")) {
      alert("Use your Sun Life email (@sunlife.com.ph).");
      return;
    }

    // store email for OTP page (optional demo use)
    localStorage.setItem("demoEmail", trimmedEmail);

    // go to OTP page
    navigate("/otp");
    //something wrong
  };

  return (
    <div className={`${styles.background} ${styles.forgotPasswordPage}`}>
  <div className={styles.card}>

    <h1 className={styles.title}>Forgot Password</h1>

    <p className={styles.subtitle}>
      Enter your email to receive a verification code
    </p>

    <form onSubmit={handleSubmit}>
      <div className={styles.inputGroup}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder=" "
          required
        />

        <label>Email</label>

        <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
      </div>

      <button type="submit" className={styles.button}>
        Send Code
      </button>
    </form>

    <p className={styles.switch}>
      Remember your password?{" "}
      <span className={styles.link} onClick={() => navigate("/")}>
        LOGIN
      </span>
    </p>

  </div>
</div>
  );
}