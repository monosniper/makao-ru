import React from 'react';
import {Link, Outlet, useMatch, useResolvedPath} from "react-router-dom";
import {PROFILE_ROUTE, VERIFICATION_ROUTE} from "../../utils/routes";
import ContentBlock from "../ContentBlock";
import {Container} from "reactstrap";
import {useTranslation} from "react-i18next";

const Cabinet = () => {
    const { t } = useTranslation();

    let resolvedProfile = useResolvedPath(PROFILE_ROUTE);
    let matchProfile = useMatch({ path: resolvedProfile.pathname, end: true});

    let resolvedVerification = useResolvedPath(VERIFICATION_ROUTE);
    let matchVerification = useMatch({ path: resolvedVerification.pathname, end: true });

    return (
        <Container className='cabinet-container'>
            <div className="profile-menu">
                <Link className={matchProfile ? "profile-menu-item active" : "profile-menu-item"} to={PROFILE_ROUTE}>{t('profile')}</Link>
                <Link className={matchVerification ? "profile-menu-item active" : "profile-menu-item"} to={VERIFICATION_ROUTE}>{t('verification')}</Link>
            </div>

            <ContentBlock>
                <Outlet />
            </ContentBlock>
        </Container>
    );
};

export default Cabinet;