// src/services/tronLinkService.js
import BN from 'bn.js';
import { BigNumber } from 'bignumber.js';
import Swal from 'sweetalert2';
import { savePayment } from './linkServices';
let fire = null;
const addStrongTags = (text) => {
    // Verifica si el texto ya contiene la etiqueta <strong>
    if (!text.startsWith('<strong>') || !text.endsWith('</strong>')) {
        // Si no contiene la etiqueta, la agrega al principio y al final
        text = `<strong>${text}</strong>`;
    }
    return text;
};
export const showAlert = (title, text, icon) => {
    fire = Swal.fire({
        title: title || 'Default Title',
        html: addStrongTags(text) || 'Default Text',
        icon: icon || 'info',
        confirmButtonText: 'Ok'
    });

};
export function getFirstAndLastFourChars(inputString) {
    // Verificar que la longitud del string sea mayor o igual a 8
    if (inputString.length < 8) {
        throw new Error('String must be at least 8 characters long');
    }

    // Obtener los primeros 4 caracteres
    const firstFourChars = inputString.slice(0, 4);
    // Obtener los últimos 4 caracteres
    const lastFourChars = inputString.slice(-4);

    // Concatenar los primeros 4 caracteres y los últimos 4 caracteres
    return firstFourChars + lastFourChars;
}


export const connectToTronLink = async () => {
    try {
        // Verifica si TronLink está instalado
        if (!window.tronWeb) {
            showAlert('Error', 'TronLink is not installed', 'error');
            return null;
        }

        // Solicita al usuario permitir el acceso a la wallet
        // await window.tronLink.request({
        //     method: 'tron_requestNetwork',
        //     params: {
        //         network: {
        //             blockchain: 'trx',
        //             network: 'shasta'
        //         }
        //     }
        // });
        // return;
        console.log(window.tronLink)
        let user = await window.tronLink.request({ method: 'tron_requestAccounts' });

        console.log(user.code, "user")
        // Espera hasta que TronLink esté listo
        while (!window.tronWeb.ready) {
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        if (user.code == 200) {
            const tronWebInstance = window.tronWeb;
            const address = tronWebInstance.defaultAddress.base58;
            const nodeInfo = await tronWebInstance.trx.getNodeInfo();
            const network = nodeInfo.configNodeInfo.network_id;
            console.log(network, nodeInfo, "network nodeinfo")
            return {
                tronWeb: tronWebInstance,
                address,
                network
            };
        } else {
            return { tronWeb: null, address: null };
        }
    } catch (error) {
        console.log(error)
        showAlert('Error', error.message ? error.message : error, 'error');
        return { tronWeb: null, address: null };
    }
};

export const sendTRX = async (tronWeb, toAddress, amount) => {
    if (!tronWeb) {
        showAlert('Error', 'TronWeb instance is required', 'error');
        return;
    }

    const sunAmount = tronWeb.toSun(amount); // Convert to Sun (1 TRX = 1,000,000 Sun)

    try {
        const transaction = await tronWeb.trx.sendTransaction(toAddress, sunAmount);
        console.log('Transaction successful:', transaction);
        return transaction;
    } catch (error) {
        showAlert('Error sending token', error.message, 'error');

    }
};

export const sendTRC20 = async (tronWeb, contractAddress, toAddress, amount, id) => {
    if (!tronWeb) {
        showAlert('Error', 'TronWeb instance is required', 'error');
        return;
    }

    try {
        showAlert("Info", "Waiting for the transaction.");
        const contract = await tronWeb.contract().at(contractAddress);
        const transaction = await contract.transfer(toAddress, amount).send();
        console.log('TRC20 Token transfer successful:', transaction);
        await savePayment(id, transaction);
        showAlert("Token transfer successfull ", "Please save the next code : " + transaction, "success");
        return transaction;
    } catch (error) {
        console.log(error)
        showAlert('Error sending TRC20 token', "remember use the mainet network", 'error');

    }
};

export const sendTokenWithMemo = async (tronWeb, recipient, amount, tokenID, memo) => {
    try {
        console.log(tronWeb, "tronweb")
        // if (!tronWeb || !tronWeb.ready) {
        //     // await connectToTronLink();
        //     // return;
        // }
        if (!tronWeb || !tronWeb.ready) {

            showAlert('TronWeb is not initialized 1', 'Please connect to TronLink', 'error');
            return;
        }

        // Crear la transacción
        const transaction = await tronWeb.transactionBuilder.sendToken(
            recipient,
            amount,
            tokenID
        );

        // Agregar el memo a la transacción
        transaction.raw_data.data = tronWeb.toHex(memo);

        // Firmar la transacción utilizando signMessageV2
        const signedTransaction = await tronWeb.trx.signMessageV2(transaction);

        // Verificar la firma
        const isValid = await tronWeb.trx.verifyMessageV2(signedTransaction);

        if (!isValid) {
            showAlert('Invalid signature', 'The transaction will not be sent', 'error');
            throw new Error('Invalid signature. The transaction will not be sent.');
        }

        // Enviar la transacción firmada
        const receipt = await tronWeb.trx.sendRawTransaction(signedTransaction);

        console.log('Transaction receipt:', receipt);
        return receipt;
    } catch (error) {
        showAlert('Error sending transaction', error.message ? error.message : error, 'error');
        // 
    }
};

export const parseAmountToDecimals = (amount, decimals) => {
    const factor = new BigNumber(10).pow(decimals);
    const parsedAmount = new BigNumber(amount).times(factor);
    return parsedAmount.toFixed(0); // Retorna como string sin notación científica
};
