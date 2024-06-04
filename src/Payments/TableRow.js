import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { getFirstAndLastFourChars } from '../services/tronLinkService';

const TableRow = ({ item, index }) => {
    const [showQR, setShowQR] = useState(false);
    const [link, setLink] = useState(process.env.REACT_APP_URL + "/paylink?id=" + item.id);
    const toggleQR = () => {
        setShowQR(!showQR);
    };
    return (

        <tr key={index}>
            <td>{item.amount} {item.token}</td>
            <td>{item.date}</td>
            <td> <p style={{ color: (item.status == "pending" ? "red" : "green"), fontWeight: "800", textTransform: "capitalize", letterSpacing: "1px" }}>{item.status}</p></td>
            <td>
                <a href={link} target="_blank" rel="noopener noreferrer">Link</a>

            </td>
            <td>
                {showQR && <QRCode value={link} />}
                <button onClick={toggleQR}>
                    {showQR ? 'Hide QR' : 'Show QR'}
                </button>
            </td>
            <td>
                {item.hash?.map(x => {
                    return <a href={process.env.REACT_APP_URL_TX + x} target='_blank'>{getFirstAndLastFourChars(x)} </a>
                })}
            </td>


        </tr>
    );
};

export default TableRow;