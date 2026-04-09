import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Forgotpass from "./pages/forgotpass/Forgotpass";
import Signup from "./pages/signup/signup";
import Signup2 from "./pages/signup/signup2";
import OTP from "./pages/otp/otp";
import NewPassword from "./pages/newpass/newpass";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/forgotPass" element={<Forgotpass />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/otp" element={<OTP />} />
        <Route path="/newpass" element={<NewPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;