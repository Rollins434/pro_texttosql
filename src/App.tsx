// App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Layout from "./component/Layout";
import Login from "./component/Login";
// import Registration from "./component/Registration";

import ProtectedRoute from "./component/ProtectedRoute";
import LoginLayout from "./component/LoginLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={ <ProtectedRoute allowedRoles={["Admin"]}><Home /></ProtectedRoute>} />

          {/* <Route path="register" element={<Registration />} /> */}
          {/* Protected routes */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                {/* Admin Component */}
                <h1></h1>
              </ProtectedRoute>
            }
          />
          <Route
            path="user"
            element={
              <ProtectedRoute allowedRoles={["User", "Admin"]}>
                {/* User Component */}
                <h1></h1>
              </ProtectedRoute>
            }
          />
        </Route>
        <Route
          path="login"
          element={
            <LoginLayout>
              <Login />
            </LoginLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
