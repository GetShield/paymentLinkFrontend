import React, { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import JsonData from "./data/data.json";
import "./App.css";
import PaymentLink from "./Payments/PaymentLink";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { AuthProvider } from "./providers/AuthContext";
import ProtectedComponent from "./components/ProtectedComponent";
import PaymentDetail from "./Payments/PaymentDetail";
import TronLink from "./services/Tron";

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [account, setAccount] = useState(null);
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);


  return (
    <AuthProvider>

      <Router>
        <div className="App">
          <Navigation />
          <main className="container" style={{ marginTop: "100px" }}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/register" exact element={<SignUp />} />
              <Route path="/login" exact element={<Login />} />
              <Route path="/paylink" exact element={<PaymentDetail />} />
              {/* <Route path="/payment-link" element={<PaymentLink />} /> */}
              <Route path="*" element={<Home />} />

              <Route path="/payment-link" element={
                <ProtectedComponent>
                  <PaymentLink />
                </ProtectedComponent>
              } />
              {/* Agrega más rutas según sea necesario */}
            </Routes>
            {/* <TronLink /> */}
          </main>
        </div>
      </Router>
    </AuthProvider>

  );
};

export default App;