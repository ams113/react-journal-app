import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { firebase } from '../firebase/firebase-config'
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { JournalPage } from '../components/journal/JournalPage';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Spinner } from '../shared/Spinner';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checkingAuthenticated, setCheckingAuthenticated] = useState(true)
    const [isAuthenticated, setIsAutenticated] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged(
            ( user ) => {

                if ( user?.uid ) {
                    dispatch( login( user.uid, user.displayName ) );
                    setIsAutenticated( true );
                    
                    dispatch( startLoadingNotes( user.uid ) );
                    
                    
                } else {
                    setIsAutenticated( false )
                }

                setCheckingAuthenticated( false )
            }
        )
    }, [dispatch, setCheckingAuthenticated, setIsAutenticated]);

    if ( checkingAuthenticated ) {

        return (
            <div className="auth__main">
                <Spinner />
            </div>
        )
    }
    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        isAuthenticated={ isAuthenticated } 
                        path="/auth" 
                        component={AuthRouter} 
                    />

                    <PrivateRoute 
                        exact 
                        isAuthenticated={ isAuthenticated }
                        path="/" 
                        component={JournalPage} 
                    />

                    <Redirect to="/auth/login" />
                </Switch>
            </div>
        </Router>
    );
}
