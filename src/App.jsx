import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import Forgotpass from "./pages/forgotpass/Forgotpass";
import Signup from "./pages/signup/signup";
import Signup2 from "./pages/signup/signup2";
import OTP from "./pages/otp/otp";
import NewPassword from "./pages/newpass/newpass";
import Settings from "./pages/settings/settings";
import ChangePass from "./pages/chanepass/changepass";
import Masterlist from "./pages/masterlist/masterlist";


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
        <Route path="/settings" element={<Settings />} />
        <Route path="/changepass" element={<ChangePass />} />
        <Route path="/ml" element={<Masterlist />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;