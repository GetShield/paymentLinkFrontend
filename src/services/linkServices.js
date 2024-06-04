import { fetchApi, fetchWithAuth } from './loginServices';
import QRCode from 'react-qr-code';

const API_URL = "/api/linkPayments/"; // Asegúrate de que esta URL es correcta
export const createLink = async (linkData, token) => {
    try {
        const response = await fetchWithAuth(API_URL, token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(linkData)
        });

        if (!response.ok) {
            throw new Error('Error creating link');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating link:', error);
        // throw error;
    }
};

export const getLinks = async (token) => {
    try {
        const response = await fetchWithAuth(API_URL + "all", token, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = response;
        return data;
    } catch (error) {
        console.log('Error getLinks:', error);
        // throw error;
    }
};

export const addWallet = async (id, wallet) => {
    try {
        console.log(id, wallet)
        const response = await fetchApi(API_URL + "walletTriedpayment", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, wallet })
        });

        const data = response;
        return data;
    } catch (error) {
        console.log('Error addWallet:', error);
    }
};

export const savePayment = async (id, hash) => {
    try {
        const response = await fetchApi(API_URL + "save/" + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ hash })
        });

        const data = response;
        return data;
    } catch (error) {
        console.log('Error addWallet:', error);
    }
};

export const getLink = async (id, token) => {
    try {
        const response = await fetchWithAuth(API_URL + "get/" + id, token, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = response;
        return data;
    } catch (error) {
        console.log('Error getLinks:', error);
        // throw error;
    }
};


export const QRGenerator = (link) => {
    return (
        <div>
            <QRCode value={link} />
        </div>
    );
};
