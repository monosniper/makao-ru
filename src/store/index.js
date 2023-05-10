import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios from "axios";
import $api, {API_URL} from "../http";
import UserService from "../services/UserService";
import CassaService from "../services/CassaService";
import UploadService from "../services/UploadService";
import GameService from "../services/GameService";

export default class Store {

    user = {};
    category = null;
    isAuth = true;
    isLoading = false;
    isLoginModalOpen = false;
    isPushModalOpen = false;
    gamesFilter = () => true

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool) {
        this.isLoading = bool;
    }

    setAuth(bool) {
        this.isAuth = bool;
    }

    setCategory(name) {
        this.category = name
    }

    setUser(user) {
        this.user = user;
    }

    setLoginModel(bool) {
        this.isLoginModalOpen = bool;
    }

    setPushModal(bool) {
        this.isPushModalOpen = bool;
    }

    async login(username, password, onSuccess, onError) {
        try {
            const response = await AuthService.login(username, password)

            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e);
        }
    }

    async register(username, email, password, onSuccess, onError) {
        try {
            const response = await AuthService.register(username, email, password);

            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e);
        }
    }

    async logout() {
        try {
            await AuthService.logout();
            localStorage.removeItem('token');

            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            console.log(e);
        }
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get(`${API_URL}refresh`, {withCredentials: true});
            localStorage.setItem('token', response.data.accessToken);

            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e) {
            this.setAuth(false);
        } finally {
            this.setLoading(false);
        }
    }

    async getClientToken() {
        try {
            const response = await CassaService.getClientToken();

            return response.data.client_token;
        } catch (e) {
            console.log(e)
        }
    }

    async updateUser(data, onSuccess, onError) {
        try {
            const response = await UserService.updateUser({data}, this.user.id);

            this.setUser(response.data);

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async resetPassword() {
        try {
            return await UserService.resetPassword(this.user.id);
        } catch (e) {
            console.log(e)
        }
    }

    async forget(email) {
        try {
            return await UserService.resetPasswordByEmail(email);
        } catch (e) {
            console.log(e)
        }
    }

    async updatePassword(oldPassword, newPassword, onSuccess, onError) {
        try {
            const response = await UserService.updatePassword({oldPassword, newPassword}, this.user.id);

            this.setUser(response.data);
            this.logout();
            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async getAllPulls() {
        try {
            const response = await CassaService.fetchPulls();

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async getPayHistory() {
        try {
            const response = await CassaService.getPayHistory();

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async betterBro(amount, withdrawal=false) {
        try {
            return await $api.post('betterbro-payment', {amount: amount*100, user_id: this.user.id, withdrawal})
        } catch (e) {
            console.log(e)
        }
    }

    async masterPay(amount, withdrawal=false) {
        try {
            return await $api.post('securemasterpay-payment', {amount: amount*100, user_id: this.user.id, withdrawal})
        } catch (e) {
            console.log(e)
        }
    }

    async getAllUsers() {
        try {
            const response = await UserService.fetchUsers();

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async pushMoney(data) {
        try {
            function encodeQuery(data) {
                let query = ""
                for (let d in data)
                    query += encodeURIComponent(d) + '=' +
                        encodeURIComponent(data[d]) + '&'
                return query.slice(0, -1)
            }

            const url = 'https://www.free-kassa.ru/merchant/cash.php?' + encodeQuery(data);


        } catch (e) {
            console.log(e)
        }
    }

    async createPull(cryptoNumber, crypto, amount, onSuccess, onError) {
        try {
            const response = await CassaService.createPull({cryptoNumber, crypto,  amount, user_id: this.user.id});

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async createPush(data) {
        try {
            return await CassaService.createPush({...data, user_id: this.user.id});
        } catch (e) {
            console.log(e)
        }
    }

    async createCryptoTransaction(crypto, bonus, transaction_number, amount) {
        try {
            return await CassaService.createCryptoTransaction({
                crypto,
                bonus,
                transaction_number,
                amount,
                user_id: this.user.id
            });
        } catch (e) {
            console.log(e)
        }
    }

    async createColdTransaction(data) {
        try {
            return await CassaService.createColdTransaction({
                ...data,
                user_id: this.user.id
            });
        } catch (e) {
            console.log(e)
        }
    }

    async acceptCryptoTransaction(id, onSuccess, onError) {
        try {
            const response = await CassaService.acceptCryptoTransaction(id);

            onSuccess && onSuccess(response);
            return response;
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async acceptPush(id, onSuccess, onError) {
        try {
            const response = await CassaService.acceptPush(id);

            onSuccess && onSuccess(response);
            return response;
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async rejectCryptoTransaction(id, onSuccess, onError) {
        try {
            const response = await CassaService.rejectCryptoTransaction(id);
            onSuccess && onSuccess(response);

            return response;
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async acceptPull(id, onSuccess, onError) {
        try {
            const response = await CassaService.acceptPull(id);

            onSuccess && onSuccess(response);
            return response;
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async rejectPull(id, onSuccess, onError) {
        try {
            const response = await CassaService.rejectPull(id);
            onSuccess && onSuccess(response);

            return response;
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async getCryptoTransactions() {
        try {
            const response = await CassaService.getCryptoTransactions();
            return response.data[0];
        } catch (e) {
            console.log(e)
        }
    }

    async getColdTransactions() {
        try {
            const response = await CassaService.getColdTransactions();
            return response.data[0];
        } catch (e) {
            console.log(e)
        }
    }

    async setTransactionStatus(transaction_id, status, onSuccess, onError) {
        try {
            const response = await CassaService.updateTransaction(transaction_id, {status});

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async getTransactionStatus(transaction_id) {
        try {
            const response = await CassaService.getTransaction(transaction_id);

            return response.data[0].status;
        } catch (e) {
            console.log(e)
        }
    }

    async uploadFiles(data, del) {
        try {
            data.forEach(async (item) => {
                await UploadService.uploadFile(item.file, item.dir, del);
            })
        } catch (e) {
            console.log(e)
        }
    }

    async getAllFakePushs() {
        try {
            const response = await CassaService.fetchFakePushs();

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async acceptUserVerification(user_id, onSuccess, onError) {
        try {
            const response = await UserService.acceptUserVerification(user_id);

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async rejectUserVerification(user_id, onSuccess, onError) {
        try {
            const response = await UserService.rejectUserVerification(user_id);

            onSuccess && onSuccess(response);
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async pendingUserVerification() {
        try {
            const response = await UserService.setUserToPendingForVerification(this.user.id);

            this.setUser(response.data);
        } catch (e) {
            console.log(e)
        }
    }

    async getVerificationImages(user_id) {
        try {
            const response = await UserService.getVerificationImages(user_id);

            return response.data[0];
        } catch (e) {
            console.log(e)
        }
    }

    async getSongs() {
        try {
            const response = await UploadService.getSongs();

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async getGames() {
        try {
            const response = await GameService.getGames();

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async createGame(name, slug, image, onSuccess, onError) {
        try {
            const response = await GameService.createGame(name, slug, image);

            onSuccess && onSuccess(response);
            return response.data;
        } catch (e) {
            onError && onError(e);
            console.log(e)
        }
    }

    async deleteGame(slug) {
        try {
            const response = await GameService.deleteGame(slug);

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async deleteSong(song) {
        try {
            const response = await UploadService.deleteSong(song);

            return response.data;
        } catch (e) {
            console.log(e)
        }
    }

    async sendPay(params) {
        try {
            await UserService.sendPay(params);
        } catch (e) {
            console.log(e)
        }
    }
}