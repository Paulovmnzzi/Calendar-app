import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginScreen from '../components/auth/LoginScreen';
import CalendarScreen from '../components/calendar/CalendarScreen';
import { startCheking } from './../redux/actions/auth';

const AppRouter = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        dispatch(startCheking())

    }, [dispatch])


    return (
        <>
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path='/login' component={LoginScreen} />

                        <Route exact path='/' component={CalendarScreen} />
                        <Redirect to='/' />
                    </Switch>
                </div>
            </BrowserRouter>
        </>
    )
}

export default AppRouter
