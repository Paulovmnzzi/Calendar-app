import React from 'react'
import { Redirect, Route } from 'react-router'

const PublicRoutes = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {
    return (
        <>
            <Route 
                {...rest}
                component={ props => (
                    isAuthenticated ?
                    <Redirect to='/' /> :
                    <Component {...props} />

                )}
            
            />
        </>
    )
}

export default PublicRoutes
