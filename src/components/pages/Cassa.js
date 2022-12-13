import React from 'react';
import {Link, Outlet, useMatch, useResolvedPath} from "react-router-dom";
import {
    PAYHISTORY_ROUTE,
    PULL_MONEY_ROUTE,
    PUSH_MONEY_ROUTE,
} from "../../utils/routes";
import {Container} from "reactstrap";
import ContentBlock from "../ContentBlock";
import {useTranslation} from "react-i18next";

const Cassa = () => {
    const { t } = useTranslation();

    let resolvedPushMoneyRoute = useResolvedPath(PUSH_MONEY_ROUTE);
    let matchPushMoneyRoute = useMatch({ path: resolvedPushMoneyRoute.pathname, end: true});

    let resolvedPullMoneyRoute = useResolvedPath(PULL_MONEY_ROUTE);
    let matchPullMoneyRoute = useMatch({ path: resolvedPullMoneyRoute.pathname, end: true});

    let resolvedPayHistoryRoute = useResolvedPath(PAYHISTORY_ROUTE);
    let matchPayHistoryRoute = useMatch({ path: resolvedPayHistoryRoute.pathname, end: true});

    return (
        <Container className='cabinet-container'>
            <div className="profile-menu">
                <Link className={matchPushMoneyRoute ? "profile-menu-item active" : "profile-menu-item"} to={PUSH_MONEY_ROUTE}>{t('push')}</Link>
                <Link className={matchPullMoneyRoute ? "profile-menu-item active" : "profile-menu-item"} to={PULL_MONEY_ROUTE}>{t('withdraw')}</Link>
                <Link className={matchPayHistoryRoute ? "profile-menu-item active" : "profile-menu-item"} to={PAYHISTORY_ROUTE}>{t('history')}</Link>
            </div>

            <ContentBlock>
                <Outlet />
            </ContentBlock>
        </Container>
    );
};

export default Cassa;