import { useState, useRef, useEffect } from "react";
import styles from "./changepass.module.css";
import profileImg from "../../images/profile1.jpg";
import bgImg from "../../images/background4.jpg";

export default function ChangePass() {
  // ======================
  // STATES
  // ======================
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [showOtp, setShowOtp] = useState(false);
  const [error, setError] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);

  const otpRefs = useRef([]);

  const storedPassword = "OldPass123";

  // ======================
  // PASSWORD RULES
  // ======================
  const rules = {
    length: newPass.length >= 8,
    uppercase: /[a-z]/.test(newPass) && /[A-Z]/.test(newPass),
    number: /[0-9]/.test(newPass),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(newPass),
  };

  // ======================
  // OTP TIMER
  // ======================
  useEffect(() => {
    if (!showOtp) return;

    setTimeLeft(300);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showOtp]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // ======================
  // VALIDATION
  // ======================
  const handleUpdate = (e) => {
    e.preventDefault();
    setError("");

    if (currentPass !== storedPassword) {
      setError("Current password is incorrect.");
      return;
    }

    if (newPass === currentPass) {
      setError("New password cannot be the same as current password.");
      return;
    }

    if (newPass !== confirmPass) {
      setError("New passwords do not match.");
      return;
    }

    if (!Object.values(rules).every(Boolean)) {
      setError("Please meet all password requirements.");
      return;
    }

    setShowOtp(true);
  };

  // ======================
  // OTP HANDLERS
  // ======================
  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <div
      className={`${styles.page} ${showOtp ? styles["blur-background"] : ""}`}
      style={{
        backgroundImage: `url(${bgImg})`,
      }}
    >
      {/* MAIN CARD */}
      <div className={styles["changepass-container"]}>
        {/* LEFT */}
        <div className={styles["changepassleft"]}>
          <h2>ACCOUNT SETTINGS</h2>
          <img src={profileImg} className={styles["changepassprofile"]} />
          <div className={styles["changepasslocation"]}>TOKYO CITY</div>
        </div>

        <div className={styles["changepassdivider"]} />

        {/* RIGHT */}
        <div className={styles["changepassright"]}>
          <a href="#" className={styles["changepassclose"]}>
            <i className="fa-solid fa-xmark"></i>
          </a>

          {/* CURRENT */}
          <label className={styles["changepass-label"]}>
            Current Password
          </label>
          <div className={styles["password-wrapper"]}>
            <input
              type="password"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
              className={styles["changepass-input"]}
            />
          </div>

          {/* NEW */}
          <label className={styles["changepass-label"]}>New Password</label>
          <div className={styles["password-wrapper"]}>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className={styles["changepass-input"]}
            />
          </div>

          {/* RULES */}
          <div className={styles["password-rules"]}>
            <p className={styles.passwordRuleTitle}>
              Password must contain:
            </p>
            <ul>
              <li className={rules.length ? styles.valid : ""}>
                At least 8 characters
              </li>
              <li className={rules.uppercase ? styles.valid : ""}>
                Upper & Lowercase
              </li>
              <li className={rules.number ? styles.valid : ""}>
                One number
              </li>
              <li className={rules.special ? styles.valid : ""}>
                One special character
              </li>
            </ul>
          </div>

          {/* CONFIRM */}
          <label className={styles["changepass-label"]}>
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className={styles["changepass-input"]}
          />

          {/* ERROR */}
          {error && (
            <p style={{ color: "red", fontSize: "13px" }}>{error}</p>
          )}

          {/* BUTTON */}
          <button
            className={styles["changepassupdate"]}
            onClick={handleUpdate}
          >
            UPDATE PASSWORD
          </button>
        </div>
      </div>

      {/* OTP MODAL */}
      {showOtp && (
        <form className={styles["otp-Form"]}>
          <span className={styles.mainHeading}>Enter OTP</span>

          <p className={styles.otpSubheading}>
            We have sent a verification code to your mobile number
          </p>

          <p style={{ fontSize: "12px", color: "red" }}>
            {formatTime()}
          </p>

          <div className={styles.inputContainer}>
            {otp.map((val, i) => (
              <input
                key={i}
                ref={(el) => (otpRefs.current[i] = el)}
                maxLength="1"
                value={val}
                className={styles["otp-input"]}
                onChange={(e) => handleOtpChange(e.target.value, i)}
                onKeyDown={(e) => handleOtpKeyDown(e, i)}
              />
            ))}
          </div>

          <button className={styles.verifyButton}>
            Verify
          </button>

          <button
            type="button"
            className={styles.exitBtn}
            onClick={() => setShowOtp(false)}
          >
            ×
          </button>

          <p className={styles.resendNote}>
            Didn't receive the code?
            <button type="button" className={styles.resendBtn}>
              Resend Code
            </button>
          </p>
        </form>
      )}
    </div>
  );
}