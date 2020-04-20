import React from "react";
import {Form, Input} from "antd";
import {Link} from "react-router-dom";

import {useFormik} from "formik";
import {AppContext} from "../../../../../provider";

import {UserOutlined, LockOutlined, MailOutlined} from '@ant-design/icons';
import {Button, Block} from '../../../../../components';
import validateField from "../../../../../utils/helpers/validateField";


const validate = values => {
    const errors = {};

    const rules = {
        email: value => {
            if (!value) {
                errors.email = "Введите E-Mail";
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = "Неверный E-Mail";
            }
        },

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
        password_confirmation: value => {

            if (!value) {
                errors.password_confirmation = "Введите пароль повторно";
            }

            if (value !== values.password) {
                errors.password_confirmation = "Пароли не совпадают";
            }
        },


    };

    Object.keys(values).forEach(key => rules[key] && rules[key](values[key]));

    return errors;
};


const RegisterForm = props => {
    const {signUp, setUser} = React.useContext(AppContext);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            password_confirmation: '',
            email: ''

        },
        validate,
        onSubmit: (values) => {
            signUp(values.email, values.username, values.password)
                .then(r => {
                    localStorage.setItem('token', r.data.token);

                    window.location.href = '/';


                })
                .catch(err => {
                    let errors = {};
                    err.response.data.map(errorItem => errors = ({
                        ...errors,
                        [errorItem.field]: errorItem.message
                    }));

                    formik.setErrors(errors);
                    formik.setSubmitting(false);
                })

        },
    });


    return (
        <div>
            <div className="auth__top">
                <h2>Зарегистрироваться</h2>
                <p style={{fontSize: 14}}>Пожалуйста, пройдите регистрацию</p>
            </div>
            <Block>
                <Form onSubmit={formik.handleSubmit} className="register-form">

                    <Form.Item
                        validateStatus={validateField("email", formik.touched, formik.errors)}
                        help={!formik.touched.email ? "" : formik.errors.email}
                        hasFeedback
                    >
                        <Input
                            id="email"
                            prefix={<MailOutlined type="mail" style={{color: "rgba(0,0,0,.25)"}}/>}
                            size="large"
                            placeholder="E-Mail"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </Form.Item>

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

                    <Form.Item
                        validateStatus={validateField("password_confirmation", formik.touched, formik.errors)}
                        help={!formik.touched.password_confirmation ? "" : formik.errors.password_confirmation}
                        hasFeedback
                    >
                        <Input
                            id="password_confirmation"
                            prefix={<LockOutlined type="lock" style={{color: "rgba(0,0,0,.25)"}}/>}
                            size="large"
                            type="password"
                            placeholder="Потвердите пароль"
                            value={formik.values.password_confirmation}
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
                            Зарегистрироваться
                        </Button>
                    </Form.Item>
                    <Link className="auth__register-link" to="/login">
                        У меня уже есть аккаунт
                    </Link>
                </Form>
            </Block>
        </div>
    );
};

export default RegisterForm;