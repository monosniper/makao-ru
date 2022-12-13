import React, {useContext, useEffect} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../routes";
import {HOME_ROUTE, PROFILE_ROUTE} from "../utils/routes";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AppRouter = () => {

    const {store} = useContext(Context);

    const iterateRoutes = (routes) => {
        return routes.map(({path, element, children}) =>
            <Route key={path} path={path} element={element} exact={true}>
                {children ? iterateRoutes(children) : undefined}
            </Route>
        )
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.checkAuth();
        } else {
            store.setAuth(false);
        }
    }, []);

    if(store.isLoading) return <h1>Loading...</h1>

    return store.isAuth ?
        (
            <Routes>
                {iterateRoutes(privateRoutes)}
                <Route path="*" element={<Navigate replace to={PROFILE_ROUTE}/>}/>
            </Routes>
        )
        :
        (
            <Routes>
                {iterateRoutes(publicRoutes)}
                <Route path="*" element={<Navigate replace to={HOME_ROUTE}/>}/>
            </Routes>
        );
};

export default observer(AppRouter);