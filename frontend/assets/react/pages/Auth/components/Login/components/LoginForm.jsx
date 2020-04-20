import React from "react";
import {Form, Input} from "antd";
import {Link} from "react-router-dom";
import {useFormik} from "formik";
import {AppContext} from "../../../../../provider";

import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {Button, Block} from '../../../../../components';
import validateField from "../../../../../utils/helpers/validateField";


const validate = values => {
    const errors = {};

    const rules = {
        username: value => {
            if (!value) {
                errors.username = "Введите логин";
            }
        },
        password: value => {
            if (!value) {
                errors.password = "Введите пароль";
            }
        },


    };

    Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));

    return errors;
};


const LoginForm = props => {

    const {login, setUser} = React.useContext(AppContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            login(values.username, values.password)
                .then(r => {
                    localStorage.setItem('token', r.data.token);
                    window.location.href = '/';
                })
                .catch(err => {
                    err.response.data.map(errorItem => formik.setErrors({[errorItem.field]: errorItem.message}));

                    formik.setSubmitting(false)
                })

        },
    });

    return (
        <div>
            <div className="auth__top">
                <h2>Войти в аккаунт</h2>
                <p>Пожалуйста, войдите в свой аккаунт</p>
            </div>
            <Block>
                <Form onSubmit={formik.handleSubmit} className="login-form">
                    <Form.Item
                        validateStatus={validateField("username", formik.touched, formik.errors)}
                        help={!formik.touched.username ? "" : formik.errors.username}
                        hasFeedback
                    >
                        <Input
                            id="username"
                            prefix={<UserOutlined type="user" style={{color: "rgba(0,0,0,.25)"}}/>}
                            size="large"
                            placeholder="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

                    <Form.Item
                        validateStatus={validateField("password", formik.touched, formik.errors)}
                        help={!formik.touched.password ? "" : formik.errors.password}
                        hasFeedback
                    >
                        <Input
                            id="password"
                            prefix={<LockOutlined type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                            size="large"
                            type="password"
                            placeholder="Пароль"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>


                    <Form.Item>
                        {formik.isSubmitting && !formik.isValid && <span>Ошибка!</span>}
                        <Button
                            disabled={formik.isSubmitting}
                            onClick={formik.handleSubmit}
                            type="primary"
                            size="large"
                        >
                            Войти в аккаунт
                        </Button>
                    </Form.Item>
                    <Link className="auth__register-link" to="/signup">
                        Зарегистрироваться
                    </Link>
                </Form>
            </Block>
        </div>
    );
};

export default LoginForm;