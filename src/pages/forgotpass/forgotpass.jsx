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
  };

  return (
    <div className={styles.background + " forgot-password-page"}> 
      <div className={styles.card}>

        {/* TITLE (uses global h1 + .forgot-password-page h1 in CSS) */}
        <h1>Forgot Password</h1>

        {/* SUBTITLE */}
        <p className={styles.subtitle}>
          Enter your email to receive a verification code
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
            className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              required
            />

            <label className={styles.input}>Email</label>

            {/* Font Awesome icon (uses your .input-icon CSS) */}
            <i className={`fa-solid fa-envelope ${styles.inputIcon}`}></i>
          </div>

          {/* BUTTON (uses .btn1 absolute styling from your CSS) */}
          <button type="submit" className={styles.btn1}>
            Send Code
          </button>
        </form>

        {/* SWITCH TEXT (matches .switch in your CSS) */}
        <p className={styles.switch}>
          Remember your password?{" "}
          <span
            className={styles.link}
            onClick={() => navigate("/")}
          >
            LOGIN
          </span>
        </p>

      </div>
    </div>
  );
}