import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./css/index.css"
import LoginPage from './pages/LoginPage'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Reset from './Reset.jsx'
import Register from './Register.jsx'
import Login from './Login.jsx'
import Dashboard from './Dashboard.jsx'
import HomePage from './pages/AboutUs.jsx'
import AboutUs from './pages/AboutUs.jsx'

// Route additional pages here
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/loginPage",
    element: <LoginPage />,
  },
  {
    path: "/reset",
    element: <Reset />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/aboutus",
    element: <AboutUs />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
