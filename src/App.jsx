import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Component/Login";
import Signup from "./Component/Signup";
import Home from "./Component/Home";
import MyNavbar from "./Component/Navbar"; 
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./Component/RequireAuth"; 

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Default route → redirect to login */}
          <Route path="/" element={<Navigate to="/login" />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected route */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <>
                  <MyNavbar />
                  <Home />
                </>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
