import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startCheking } from './../redux/actions/auth';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

const AppRouter = () => {

    const dispatch = useDispatch();
    const { cheking, uid } = useSelector(state => state.auth)

    useEffect(() => {

        dispatch(startCheking())

    }, [dispatch])

    if (cheking) {
        return <h5>Wait..</h5>
    }

    return (
        <>
            <BrowserRouter>
                <div>
                    <Switch>
                        <PublicRoutes
                            exact path='/login'
                            component={LoginScreen}
                            isAuthenticated = { !!uid } 
                            />
                            {/* la doble negación de un string es true, y la doble negación de un null es false */}
                        <PrivateRoutes
                            exact
                            path='/'
                            component={CalendarScreen} 
                            isAuthenticated = { !!uid }
                            /> 
                        <Redirect to='/login' />
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    )
}

export default AppRouter
