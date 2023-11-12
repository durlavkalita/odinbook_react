import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import People from "./pages/People";
import RegistrationForm from "./components/forms/RegistrationForm";
import Navbar from "./components/display/Navbar";
import LoginForm from "./components/forms/LoginForm";
import ProtectedRoute from "./components/utility/ProtectedRoute";
import Explore from "./pages/Explore";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home></Home>
            </ProtectedRoute>
          }
        />
        <Route
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore></Explore>
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/register" Component={RegistrationForm}></Route>
        <Route path="/login" Component={LoginForm}></Route>
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile></Profile>
            </ProtectedRoute>
          }
        />
        <Route
          path="/people"
          element={
            <ProtectedRoute>
              <People></People>
            </ProtectedRoute>
          }
        />
        {/* <Route component={NotFound} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
