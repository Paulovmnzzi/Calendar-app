import React from 'react'
import { Redirect, Route } from 'react-router'

const PrivateRoutes = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
       <Route {...rest}
            component={ props => (
                isAuthenticated ? 
                <Component {...props} /> :
                <Redirect to='/login' />
            )}
        
       />
    )
}

export default PrivateRoutes
