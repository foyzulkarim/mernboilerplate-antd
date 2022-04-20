import React, { useState, useEffect } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, MailOutlined, } from '@ant-design/icons';
import { Form, message, Input, Button, Popover } from 'antd';
import Footer from '@/components/Footer';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { forgotPassword, verifyToken } from './service';
import styles from './index.less';

const FormItem = Form.Item;

const Resetpassword = (props) => {

    const [form] = Form.useForm();
    const intl = useIntl();
    const [submitting, setSubmitting] = useState(false);
    const [token, setToken] = useState('');
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const { token } = props.location.query;
        console.log('token', token);
        verifyToken({ token }).then((r) => {
            console.log('verified', r);
            setToken(token);
        }
        ).catch((e) => {
            console.log('error', e);
            message.error('Token is invalid');
            history.push('/user/login');
        });
    }, []);

    const checkPassword = (_, value) => {
        const promise = Promise; // 没有值的情况

        if (!value) {
            setVisible(!!value);
            return promise.reject('Please enter your password!');
        } // 有值的情况

        if (!visible) {
            setVisible(!!value);
        }

        setPopover(!popover);

        if (value.length < 6) {
            return promise.reject('');
        }

        if (value && confirmDirty) {
            form.validateFields(['confirm']);
        }

        return promise.resolve();
    };

    const checkConfirm = (_, value) => {
        const promise = Promise;

        if (value && value !== form.getFieldValue('password')) {
            return promise.reject('The passwords entered twice do not match!');
        }

        return promise.resolve();
    };

    const handleSubmit = async (values) => {
        console.log('values', values);
        const result = await forgotPassword(values);
        console.log(result);
        if (result instanceof Error) {
            message.error(result.message);
        }
        else {
            message.success(result.message);
            form.resetFields();
        }
    };

    return (<div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.top}>
                <div className={styles.header}>
                    <Link to="/">
                        <img alt="logo" className={styles.logo} src="/logo.svg" />
                        <span className={styles.title}>Ant Design</span>
                    </Link>
                </div>
                <div className={styles.desc}>
                    {intl.formatMessage({
                        id: 'pages.layouts.userLayout.title',
                    })}
                </div>
            </div>

            <div className={styles.main}>
                <ProForm
                    initialValues={{
                        autoLogin: true,
                    }}
                    submitter={{
                        searchConfig: {
                            submitText: intl.formatMessage({
                                id: 'pages.form.submit',
                                defaultMessage: 'Log in',
                            }),
                        },
                        render: (_, dom) => dom.pop(),
                        submitButtonProps: {
                            loading: submitting,
                            size: 'large',
                            style: {
                                width: '100%',
                            },
                        },
                    }}
                    onFinish={async (values) => {
                        await handleSubmit(values);
                    }}
                    form={form}
                >

                    <Popover
                        getPopupContainer={(node) => {
                            if (node && node.parentNode) {
                                return node.parentNode;
                            }

                            return node;
                        }}
                        content={
                            visible && (
                                <div
                                    style={{
                                        padding: '4px 0',
                                    }}
                                >
                                    {passwordStatusMap[getPasswordStatus()]}
                                    {renderPasswordProgress()}
                                    <div
                                        style={{
                                            marginTop: 10,
                                        }}
                                    >
                                        <span>Please enter at least 6 characters. Please do not use passwords that are easy to guess.</span>
                                    </div>
                                </div>
                            )
                        }
                        overlayStyle={{
                            width: 240,
                        }}
                        placement="right"
                        visible={visible}
                    >
                        <FormItem
                            name="password"
                            className={
                                form.getFieldValue('password') &&
                                form.getFieldValue('password').length > 0 &&
                                styles.password
                            }
                            rules={[
                                {
                                    validator: checkPassword,
                                },
                            ]}
                        >
                            <Input size="large" type="password" placeholder="At least 6 digit password, case sensitive" />
                        </FormItem>
                    </Popover>
                    <FormItem
                        name="confirm"
                        rules={[
                            {
                                required: true,
                                message: 'Confirm password',
                            },
                            {
                                validator: checkConfirm,
                            },
                        ]}
                    >
                        <Input size="large" type="password" placeholder="Confirm password" />
                    </FormItem>

                </ProForm>

                <div style={{
                    marginTop: 24,
                }}>
                    <Button block type="default">
                        <Link to="/user/login">
                            <FormattedMessage id="pages.login.submit" defaultMessage="Login" />
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
        <Footer />
    </div>);
}

export default Resetpassword;