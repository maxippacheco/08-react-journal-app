import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen'
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { LoadingScreen } from "../components/loading/LoadingScreen";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import { startLoadingNotes } from "../actions/notes";

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        //crear observable = objeto que se dispara varias veces
        //el objeto esta pendiente a la autenticacion

        firebase.auth().onAuthStateChanged( async (user) => {

            //? evalua si el objeto existe
            if (user?.uid) {
                dispatch( login(user.uid, user.displayName) )    
                setIsLoggedIn(true);
            
                dispatch(startLoadingNotes(user.uid))

            }else{
                setIsLoggedIn(false);
            }

            //ya tengo la respuesta de firebase, es decir, el observable ya cargo y se que el usuario existe
            setChecking(false);

        });
        
    }, [ dispatch, setChecking, setIsLoggedIn ]);

    if ( checking ) {
        return (
            <LoadingScreen />
        )
    }

    return (
        <div>
            <Router>
                <Switch>

                    <PublicRoute
                        path='/auth'
                        component={AuthRouter}
                        isAuthenticated= {isLoggedIn}
                    />


                    <PrivateRoute
                        exact
                        path='/'
                        component={JournalScreen}
                        isAuthenticated = {isLoggedIn}
                    />


                    <Redirect to='/auth/login' />



                </Switch>
            </Router>
        </div>
    )
}
