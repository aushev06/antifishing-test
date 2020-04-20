import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom';
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import {AppContext} from './provider/index'

function Main() {
    const {user, me, isReady} = React.useContext(AppContext)

    React.useEffect(() => {
        me()
    }, [])


    if (false === isReady) {
        return <div>
            Loading...
        </div>
    }


    return (
        <Switch>
            <GuestRoute
                user={user}
                path={["/login", "/signup"]}>
                <Auth/>
            </GuestRoute>

            <PrivateRoute user={user} path={"/"}>
                <Home/>
            </PrivateRoute>


        </Switch>
    )
}

export default Main;


function PrivateRoute({children, user, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                null !== user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}

function GuestRoute({children, user, ...rest}) {
    return (
        <Route
            {...rest}
            render={({location}) =>
                null === user ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/",
                            state: {from: location}
                        }}
                    />
                )
            }
        />
    );
}