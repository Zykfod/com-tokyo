import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";

export default function Login() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = () => {
    navigate("/landing");
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles.background}>
        <div className={styles.card}>
          <h1>Login</h1>

          <p className={styles.subtitle}>
            Welcome back! Please login to your account
          </p>

          <form onSubmit={(e) => e.preventDefault()}>
            {/* EMAIL */}
            <div className={styles["input-group"]}>
              <input type="email" placeholder=" " required />
              <label>Email</label>
              <i className={`fa-solid fa-user ${styles["input-icon"]}`}></i>
            </div>

            {/* PASSWORD */}
            <div className={styles["input-group"]}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <label>Password</label>

              <span
                className={styles["toggle-password"]}
                onClick={togglePassword}
              >
                <i
                  className={`fa-solid ${
                    showPassword ? "fa-eye-slash" : "fa-eye"
                  }`}
                ></i>
              </span>
            </div>

            {/* FORGOT PASSWORD */}
            <a href="/forgotPass" className={styles.forgot}>
              Forgot password?
            </a>

            {/* BUTTON */}
            <button type="button" onClick={handleLogin}>
              Login
            </button>
          </form>

          {/* SWITCH */}
          <p className={styles.switch}>
            Don’t have an account?{" "}
            <span onClick={() => navigate("/signup")} className={styles.Lsignup}>SIGN UP</span>
          </p>
        </div>
      </div>
    </div>
  );
}