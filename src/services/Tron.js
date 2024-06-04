import React, { useState, useEffect } from 'react';

const TronLink = () => {
    const [address, setAddress] = useState(null);
    const [network, setNetwork] = useState(null);
    const [tronWeb, setTronWeb] = useState(null);

    // useEffect(() => {
    //     const connectToTronLink = async () => {
    //         if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
    //             const tronWebInstance = window.tronWeb;
    //             setTronWeb(tronWebInstance);
    //             setAddress(tronWebInstance.defaultAddress.base58);

    //             const nodeInfo = await tronWebInstance.trx.getNodeInfo();
    //             setNetwork(nodeInfo.configNodeInfo.network_id);
    //         } else {
    //             console.error('TronLink is not installed or not logged in');
    //         }
    //     };

    //     connectToTronLink();
    // }, []);

    const sendToken = async () => {
        if (!tronWeb) return;

        const toAddress = 'TWNxsGw1o4rnP4FExQSEXuYzLtXm3dMkRd';
        const amount = tronWeb.toSun(10); // 10 TRX

        try {
            const transaction = await tronWeb.trx.sendTransaction(toAddress, amount);
            console.log('Transaction successful:', transaction);
        } catch (error) {
            console.error('Error sending token:', error);
        }
    };

    return (
        <div>
            <h1>TronLink Connection</h1>
            {address ? (
                <div>
                    <p>Address: {address}</p>
                    <p>Network: {network}</p>
                    <button onClick={sendToken}>Send 10 TRX</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default TronLink;
