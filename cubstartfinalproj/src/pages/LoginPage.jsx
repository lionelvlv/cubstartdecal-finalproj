import React from "react";
import Login from "../Login";
import Dashboard from "../Dashboard";
import Register from "../Register";
import Reset from "../Reset";
import Navbar from "../components/Navbar";

function LoginPage() {
  return (
    <div>
      <Navbar />
      <Login />
    </div>
  );
}

export default LoginPage;