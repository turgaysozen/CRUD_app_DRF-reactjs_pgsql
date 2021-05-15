import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { auth } from '../services'

// it gets a route and render or redirect to login component after checking authenticated status
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (auth()) {
                    return <Component props={props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: "/admin/login",
                            state: {
                                from: props.location
                            }

                        }
                    } />
                }
            }}
        />
    )
}