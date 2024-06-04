import React, { useEffect, useState } from 'react';
import { useAsyncError, useSearchParams } from 'react-router-dom';
import { addWallet, getLink } from '../services/linkServices';
import { connectToTronLink, parseAmountToDecimals, sendTRC20, sendTokenWithMemo, showAlert } from '../services/tronLinkService';

const PaymentDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [paymentInfo, setPaymentInfo] = useState(null);
    const [error, setError] = useState(null);
    const [tronWeb, setTronWeb] = useState(null);
    const [chainMainet, setChainMainet] = useState(null);
    // useEffect(() => {
    //     window.addEventListener('message', function (e) {
    //         console.log(e.data.message, "action")
    //         if (e.data.message && e.data.message.action == "connectWeb") {
    //             console.log("conected webA")
    //             alert(123);
    //         }

    //         if (e.data.message && e.data.message.action == "setNode") {
    //             // handler logic
    //             console.log('got setNode event', e.data)
    //             setChainMainet(e?.data?.message?.data?.node?.chainId)
    //         }
    //     })
    // }, []);
    // useEffect(() => {
    //     window.addEventListener("tronLink#initialized", function (e) {
    //         console.log(123, "e", e.window?.tronWeb)
    //     })
    // }, []);
    const loadInfoPayment = () => {
        let id = searchParams.get("id")
        console.log(id, "ID")
        const fetchPaymentInfo = async () => {
            try {
                const data = await getLink(id);
                if (data?.amount) {
                    setPaymentInfo(data);
                } else {
                    setError("payment not found.11")
                }
            } catch (error) {
                setError('Failed to fetch payment information');
            }
        };
        if (id)
            fetchPaymentInfo();
    }
    useEffect(() => {
        loadInfoPayment();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    if (!paymentInfo) {
        return <div>Loading...</div>;
    }

    const handlePayment = async () => {
        // Lógica para manejar el pago
        // alert('Payment initiated!'); 
        // sendTRC20(tronWeb, "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t", "TWNxsGw1o4rnP4FExQSEXuYzLtXm3dMkRd", 1 * 10 ** 6).then(res => { //PROD

        // sendTRC20(tronWeb, "TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs", "TWNxsGw1o4rnP4FExQSEXuYzLtXm3dMkRd", parseAmountToDecimals(paymentInfo.amount, 6)).then(res => {   

        const recipient = process.env.REACT_APP_WALLET;
        const amount = paymentInfo.amount;
        const tokenID = process.env.REACT_APP_TOKEN_USDT; // cambiar por paymentInfo.tokenAddress
        if (!tronWeb || !tronWeb.ready) {
            showAlert("Info", "We need access to your wallet");
            await connectToTronLink().then(async res => {
                if (res.tronWeb != null) {
                    setTronWeb(res)
                    addWallet(paymentInfo.id, res.address)

                    try {
                        sendTRC20(res.tronWeb, tokenID, recipient, parseAmountToDecimals(amount, 6), paymentInfo.id).then(res => {
                            loadInfoPayment();
                        })
                    } catch (error) {
                        console.error('Transaction failed:', error);
                    }
                }
            });
        } else {
            try {
                addWallet(paymentInfo.id, tronWeb.address)
                sendTRC20(tronWeb.tronWeb, tokenID, recipient, parseAmountToDecimals(amount, 6), paymentInfo.id).then(res => {
                    loadInfoPayment();
                })
            } catch (error) {
                console.error('Transaction failed:', error);
            }
        }
        // sendTokenWithMemo("TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs", "TWNxsGw1o4rnP4FExQSEXuYzLtXm3dMkRd", parseAmountToDecimals(paymentInfo.amount, 6), "memo1").then(res => {
        //     console.log(res, "res")
        // });
    };
    const html_toPay = () => {
        return <div>
            {/* <button class="" onClick={() => {
                window.tronLink.request({ method: 'tron_requestsetNode' });
            }}>Connect Tron</button> */}
            <h2>Payment Details</h2>
            <p><strong>Payment ID:</strong> {paymentInfo.id}</p>
            <p><strong>Merchant </strong> {paymentInfo.merchant.name}</p>
            <p>{paymentInfo.merchant.description}</p>
            <p><strong>Amount:</strong> {paymentInfo.amount} {paymentInfo.token}</p>
            {
                // chainMainet == process.env.REACT_APP_CHAIN_ID
                (true) ? <button onClick={handlePayment}>Pay</button> : <div> <strong>You need to conect to main network.</strong></div>
            }
        </div>
    }
    const html_toPaid = () => {
        return <div>
            <h2>Payment Details</h2>
            <p><strong>Payment ID:</strong> {paymentInfo.id}</p>
            <p><strong>Merchant </strong> {paymentInfo.merchant.name}</p>
            <p>{paymentInfo.merchant.description}</p>
            <p><strong>Amount:</strong> {paymentInfo.amount} {paymentInfo.token}</p>
            <p><strong>Status:</strong> {paymentInfo.status}</p>
        </div>
    }
    return (
        <div >

            {
                (error == null) ? (paymentInfo.status == "pending") ? html_toPay() : html_toPaid()
                    :
                    <div>
                        <div class="alert alert-warning" role="alert">
                            <strong>{error}</strong>
                        </div>

                    </div>
            }
        </div>
    );
};

export default PaymentDetail;
