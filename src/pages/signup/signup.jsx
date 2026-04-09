import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css"; // ✅ FIXED import

export default function Signup() { // ✅ FIXED component name (capitalized)
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
    navigate("/signup2");
  };

  return (
    <div className={styles["signup-page"]}>
      <div className={styles.background}>
        <div className={`${styles.card} ${styles["signup-card"]}`}>

          <h1>Sign Up</h1>
          <p className={styles.subtitle}>Create an account to get started</p>

          <form className={styles["signup-form"]} onSubmit={handleSubmit}>

            <div className={styles["form-row"]}>
              <div className={styles["input-group"]}>
                <input type="text" required placeholder=" " />
                <label>Full Name</label>
              </div>

              <div className={styles["input-group"]}>
                <input type="date" required placeholder=" " />
                <label>Birthdate</label>
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["input-group"]}>
                <input type="email" required placeholder=" " />
                <label>Email</label>
              </div>

              <div className={styles["input-group"]}>
                <input type="tel" required placeholder=" " />
                <label>Phone Number</label>
              </div>
            </div>

            <div className={styles["form-row"]}>
              <div className={styles["input-group"]}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  placeholder=" "
                />
                <label>Password</label>

                <span
                  className={styles["toggle-password"]}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                </span>
              </div>

              <div className={styles["input-group"]}>
                <input type="password" required placeholder=" " />
                <label>Confirm Password</label>
              </div>
            </div>

            <div className={styles["password-rules"]}>
              <p>Password must contain:</p>
              <ul>
                <li className={rules.length ? styles.valid : ""}>At least 8 characters</li>
                <li className={rules.uppercase ? styles.valid : ""}>Upper & Lowercase</li>
                <li className={rules.number ? styles.valid : ""}>One number</li>
                <li className={rules.special ? styles.valid : ""}>One special character</li>
              </ul>
            </div>

            <div className={styles.switchh}>
              <p>
                Already have an account?
                <span onClick={() => navigate("/")} className={styles.link}> LOGIN</span> {/* ✅ FIXED route */}
              </p>
            </div>

            <button type="submit" >Next</button>

          </form>
        </div>
      </div>
    </div>
  );
}