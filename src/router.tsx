import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Friends from "./pages/Friends";
import RegistrationForm from "./components/forms/RegistrationForm";
import Navbar from "./components/Navbar";
import LoginForm from "./components/forms/LoginForm";
const Router = () => {
  type AppRoute = "/" | "/home" | "/profile" | "/friends";
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/register" Component={RegistrationForm}></Route>
        <Route path="/login" Component={LoginForm}></Route>
        <Route path="/profile" Component={Profile} />
        <Route path="/friends" Component={Friends} />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
