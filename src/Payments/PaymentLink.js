import React, { useEffect, useState } from 'react';
import { QRGenerator, createLink, getLinks } from '../services/linkServices';
import { useToken } from '../providers/AuthContext';
import TableRow from './TableRow';
const PaymentLink = () => {
    const [currency, setCurrency] = useState('USDT');
    const [amount, setAmount] = useState('');
    const [paymentLink, setPaymentLink] = useState('');
    const { token } = useToken();
    const handleCurrencyChange = (event) => {
        setCurrency(event.target.value);
    };

    const [links, setLinks] = useState([]);
    const loadLinks = () => {
        getLinks(token).then(res => {
            setLinks(res);
        })
    }
    useEffect(() => {
        if (token) {
            loadLinks();
        }
    }, [token])

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        console.log(event.target.value)

    };

    const generatePaymentLink = () => {
        // Generar el link de pago usando los datos ingresados
        // const link = `https://example.com/pay?amount=${amount}&currency=${currency}`;
        createLink({ token: currency, amount }, token).then(res => {
            console.log(res, "res");
            loadLinks();
        });
        // setPaymentLink(link);
    };

    return (
        <div id="features" className="text-center pt-2" style={{ paddingTop: "45px" }}>
            <div className="container">
                <div className="col-md-12 ">
                    <h2>Generate Payment Link</h2>
                </div>
                <div className="col-12 row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <input
                                type="number"
                                value={amount}
                                min={0.000001}
                                onChange={handleAmountChange}
                                placeholder="Enter the amount"
                                class="form-control" required="" />
                            <p class="help-block text-danger"></p>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <select value={currency} onChange={handleCurrencyChange} className="form-control">
                                <option value="USDT">USDT</option>
                            </select>
                            <p class="help-block text-danger">coming soon ( BTC, ETH, USDC (ETH), USDT (ETH)) </p>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="form-group">
                            <button onClick={generatePaymentLink}>Generate Payment Link</button>
                            {paymentLink && (
                                <div>
                                    <p>Generated Payment Link:</p>
                                    <a href={paymentLink} target="_blank" rel="noopener noreferrer">
                                        {paymentLink}
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <table className='table '>
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Link</th>
                            <th>QR</th>
                            <th>Payments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            links?.map((item, index) => {


                                return <TableRow item={item} index={index} />
                            })
                        }

                    </tbody>
                </table>

            </div>
        </div >

    );
};

export default PaymentLink;
