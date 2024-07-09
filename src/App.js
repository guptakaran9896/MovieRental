import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Pages/Login/Login';
import "./assets/scss/module.scss";
import "./assets/scss/theme.scss";
import "toastr/build/toastr.min.css";
import ForgetPasswordPage from './Pages/Login/ForgetPassword';
import Dashboard from './Pages/Dashboard/Dashboard';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/forgot-password" element={<ForgetPasswordPage/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
