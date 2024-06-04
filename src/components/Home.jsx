import React, { useState, useEffect } from "react";
import PaymentLink from "../Payments/PaymentLink";
import JsonData from "../data/data.json";

export const Home = (props) => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
        setLandingPageData(JsonData);
    }, []);
    return (
        <div>
            <div>
                <h2>Inicio</h2>
                <p>Bienvenido a la aplicación de generación de links de pago.</p>
                <nav>

                </nav>
            </div>
            {/* <PaymentLink /> */}
        </div>
    );
};
