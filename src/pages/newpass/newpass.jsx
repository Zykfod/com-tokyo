import { useState } from "react";
import styles from "./newpass.module.css";
import { useNavigate } from "react-router-dom";

export default function NewPassword() {
  const navigate = useNavigate();

  // ======================
  // STATES
  // ======================
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [rules, setRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  // ======================
  // TOGGLE PASSWORD
  // ======================
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // ======================
  // PASSWORD VALIDATION
  // ======================
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    setRules({
      length: value.length >= 8,
      uppercase: /[a-z]/.test(value) && /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    });
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(rules).every(Boolean)) {
      alert("Password does not meet requirements.");
      return;
    }

    alert("Password successfully changed!");
    navigate("/login");
  };

  return (
    <div className={styles.newPasswordPage}>
      <div className={styles.background}>
        <div className={styles.card}>
          <h1>Set New Password</h1>
          <p className={styles.subtitle}>
            Create a new password for your account
          </p>

          <form onSubmit={handleSubmit}>
            {/* PASSWORD */}
            <div className={styles.inputGroup}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <label>New Password</label>

              <span
                className={styles.togglePassword}
                onClick={togglePassword}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </div>

            {/* RULES */}
            <div className={styles.passwordRules}>
              <p>Password must contain:</p>
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
            <div className={styles.inputGroup}>
              <input type="password" placeholder=" " required />
              <label>Confirm Password</label>
            </div>

            {/* BUTTON */}
            <button type="submit" className={styles.btn3}>
              Reset Password
            </button>
          </form>

          <p className={styles.switch}>
            Remember your password?{" "}
            <span onClick={() => navigate("/")}>LOGIN</span>
          </p>
        </div>
      </div>
    </div>
  );
}