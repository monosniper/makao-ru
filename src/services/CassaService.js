import $api from "../http";
import axios from 'axios';

export default class CassaService {
    static async fetchPulls() {
        return $api.get('cassa/pulls');
    }

    static async getPayHistory() {
        return $api.get('cassa/pay_history');
    }

    static async createPull(data) {
        return $api.post('cassa/pull', data);
    }

    static async createPush(data) {
        return $api.post('cassa/push', data);
    }

    static async createCryptoTransaction(data) {
        return $api.post('cassa/crypto/transactions', data);
    }

    static async createColdTransaction(data) {
        return $api.post('cassa/cold/transactions', data);
    }

    static async acceptCryptoTransaction(id) {
        return $api.get('cassa/crypto/transactions/accept/'+id);
    }

    static async acceptPush(id) {
        return $api.get('cassa/pushs/accept/'+id);
    }

    static async rejectCryptoTransaction(id) {
        return $api.get('cassa/crypto/transactions/reject/'+id);
    }

    static async acceptPull(id) {
        return $api.get('cassa/pulls/accept/'+id);
    }

    static async rejectPull(id) {
        return $api.get('cassa/pulls/reject/'+id);
    }

    static async getCryptoTransactions() {
        return $api.get('cassa/crypto/transactions');
    }

    static async getColdTransactions() {
        return $api.get('cassa/cold/transactions');
    }

    static async getTransactions() {
        return $api.get('cassa/transactions');
    }

    static async updateTransaction(transaction_id, data) {
        return $api.post(`cassa/transactions/${transaction_id}/update`, data);
    }

    static async getTransaction(transaction_id) {
        return $api.get(`cassa/transactions/${transaction_id}`);
    }

    static async getClientToken() {
        const params = new URLSearchParams();
        params.append('grant_type', 'client_credentials');

        const response = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
            auth: {
                username: process.env.REACT_APP_PAYPAL_SANDBOX_CLIENT_ID,
                password: process.env.REACT_APP_PAYPAL_SANDBOX_SECRET,
            }
        }).then(rs => {
            return axios.post('https://api-m.sandbox.paypal.com/v1/identity/generate-token', {}, {
                headers: {
                    Authorization: 'Bearer ' + rs.data.access_token,
                }
            });
        })

        return response;
    }

    static async fetchFakePushs() {
        // return $api.get('cassa/fake/pushs');
        return $api.get('cassa/pushs');
    }
}