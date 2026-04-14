import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./signup.module.css";

export default function Signup2() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emergencyContact: "",
    phone: "",
    address: "",
    city: ""
  });

  const [showModal, setShowModal] = useState(false);

  // ======================
  // HANDLE INPUT CHANGE
  // ======================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ======================
  // HANDLE SUBMIT
  // ======================
  const handleSubmit = (e) => {
    e.preventDefault();

    // show modal instead of redirect
    setShowModal(true);
  };

  // ======================
  // CONTINUE BUTTON
  // ======================
  const handleContinue = () => {
    setShowModal(false);
    navigate("/"); // change if needed
  };

  return (
    <div className={`${styles["signup2-page"]}`}>
      <div className={styles.background}>
        <div className={styles.card}>

          <h1>Sign Up</h1>
          <p className={styles.subtitle}>
            Create an account to get started
          </p>

          <form onSubmit={handleSubmit}>
            
            {/* ROW 1 */}
            <div className={styles["form-row"]}>
              <div className={styles["input-group"]}>
                <input
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Emergency Contact</label>
              </div>

              <div className={styles["input-group"]}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder=" "
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                />
                <label>Emergency Contact Phone Number</label>
              </div>
            </div>

            {/* ROW 2 */}
            <div className={styles["form-row"]}>
              <div className={styles["input-group"]}>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>Address</label>
              </div>

              <div className={styles["input-group"]}>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder=" "
                  required
                />
                <label>City</label>
              </div>
            </div>

            {/* LOGIN SWITCH */}
            <div className={styles.switchhh}>
              <p>
                Already have an account?{" "}
                <span
                  className={styles.link}
                  onClick={() => navigate("/")}
                  style={{ cursor: "pointer" }}
                >
                  LOGIN
                </span>
              </p>
            </div>

            {/* SUBMIT BUTTON */}
            <button type="submit" className={styles.signup2btn}>
              Create Account
            </button>

          </form>
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles["modal-box"]}>
            <h2>Congratulations!</h2>
            <h2> Account Successfully Created!</h2>
            <p>
              Your account is being processed, Kindly wait for the confirmation.
            </p>
            <button onClick={handleContinue} className={styles.continueBtn}>
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}