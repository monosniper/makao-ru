import {
    ADMIN_ROUTE,
    BONUSES_ROUTE,
    CABINET_ROUTE,
    CASSA_ROUTE, COLD_TRANSACTIONS_ROUTE,
    ERROR_PAY_ROUTE,
    FAQ_ROUTE,
    GAME_DEMO_ROUTE,
    GAME_ROUTE,
    GET_PAY_ROUTE,
    HOME_ROUTE,
    PAYHISTORY_ROUTE,
    PROFILE_ROUTE,
    PULL_MONEY_ROUTE,
    PULLS_MONEY_ROUTE,
    PUSH_MONEY_ROUTE,
    PUSHS_MONEY_ROUTE,
    SETTINGS_ROUTE,
    STOCKS_ROUTE,
    SUCCESS_PAY_ROUTE,
    TOURNAMENTS_ROUTE, TRANSACTIONS_ROUTE,
    USERS_ROUTE,
    VERIFICATION_ROUTE,
    VERIFICATIONS_ROUTE
} from "./utils/routes";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import Verification from "./components/pages/Verification";
import Cabinet from "./components/pages/Cabinet";
import Cassa from "./components/pages/Cassa";
import PushMoney from "./components/pages/PushMoney";
import PullMoney from "./components/pages/PullMoney";
import PayHistory from "./components/pages/PayHistory";
import Admin from "./components/pages/Admin";
import PullsMoney from "./components/pages/PullsMoney";
import Users from "./components/pages/Users";
import Faq from "./components/pages/Faq";
import Game from "./components/pages/Game";
import Settings from "./components/pages/Settings";
import Verifications from "./components/pages/Verifications";
import ErrorPay from "./components/pages/ErrorPay";
import SuccessPay from "./components/pages/SuccessPay";
import GetPay from "./components/pages/GetPay";
import Tournaments from "./components/pages/Tournaments";
import Stocks from "./components/pages/Stocks";
import Bonuses from "./components/pages/Bonuses";
import PushsMoney from "./components/pages/PushsMoney";
import EphiriumStockPage from "./components/pages/EphiriumStockPage";
import Transactions from "./components/pages/Transactions";
import ColdTransactions from "./components/pages/ColdTransactions";

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        element: <Home/>,
    },
    {
        path: FAQ_ROUTE,
        element: <Faq/>,
    },
    {
        path: GAME_DEMO_ROUTE,
        element: <Game/>,
    },
    {
        path: SUCCESS_PAY_ROUTE,
        element: <SuccessPay/>,
    },
    {
        path: ERROR_PAY_ROUTE,
        element: <ErrorPay/>,
    },
    {
        path: GET_PAY_ROUTE,
        element: <GetPay/>,
    },
    {
        path: TOURNAMENTS_ROUTE,
        element: <Tournaments/>,
    },
    {
        path: STOCKS_ROUTE,
        element: <Stocks/>,
    },
    {
        path: '/stocks/ephirium',
        element: <EphiriumStockPage/>,
    },
    {
        path: BONUSES_ROUTE,
        element: <Bonuses/>,
    },
];

export const privateRoutes = [
    ...publicRoutes,

    {
        path: CABINET_ROUTE,
        element: <Cabinet/>,
        children: [
            {
                path: PROFILE_ROUTE,
                element: <Profile/>,
            },
            {
                path: VERIFICATION_ROUTE,
                element: <Verification/>,
            },
        ]
    },

    {
        path: CASSA_ROUTE,
        element: <Cassa/>,
        children: [
            {
                path: PUSH_MONEY_ROUTE,
                element: <PushMoney/>,
            },
            {
                path: PULL_MONEY_ROUTE,
                element: <PullMoney/>,
            },
            {
                path: PAYHISTORY_ROUTE,
                element: <PayHistory/>,
            },
        ]
    },

    {
        path: ADMIN_ROUTE,
        element: <Admin/>,
        children: [
            {
                path: USERS_ROUTE,
                element: <Users/>,
            },
            {
                path: PULLS_MONEY_ROUTE,
                element: <PullsMoney/>,
            },
            {
                path: TRANSACTIONS_ROUTE,
                element: <Transactions/>,
            },
            {
                path: COLD_TRANSACTIONS_ROUTE,
                element: <ColdTransactions/>,
            },
            {
                path: SETTINGS_ROUTE,
                element: <Settings/>,
            },
            {
                path: VERIFICATIONS_ROUTE,
                element: <Verifications/>,
            },
            {
                path: PUSHS_MONEY_ROUTE,
                element: <PushsMoney/>,
            },
        ]
    },

    {
        path: GAME_ROUTE,
        element: <Game/>,
    },

];