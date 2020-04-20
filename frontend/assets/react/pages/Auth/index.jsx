import React from "react";
import {Route} from "react-router-dom";

import LoginForm from "./components/Login/components/LoginForm";
import RegisterForm from "./components/Signup/components/RegisterForm";

import "./Auth.scss";


const Auth = () => (
    <section className="auth">
        <div className="auth__content">
            <Route exact path="/login" component={LoginForm}/>
            <Route exact path="/signup" component={RegisterForm}/>
        </div>
    </section>
);

export default Auth;