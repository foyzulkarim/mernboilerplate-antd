import React, { useState, useEffect } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, MailOutlined, } from '@ant-design/icons';
import { Form, message, Input, Button, Popover, Progress } from 'antd';
import Footer from '@/components/Footer';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { forgotPassword, verifyToken, resetPassword } from './service';
import styles from './index.less';

const FormItem = Form.Item;

const passwordStatusMap = {
    ok: (
        <div className={styles.success}>
            <span>Strength: strong</span>
        </div>
    ),
    pass: (
        <div className={styles.warning}>
            <span>Strength: Medium</span>
        </div>
    ),
    poor: (
        <div className={styles.error}>
            <span>Strength: too short</span>
        </div>
    ),
};
const passwordProgressMap = {
    ok: 'success',
    pass: 'normal',
    poor: 'exception',
};

const Resetpassword = (props) => {

    const [form] = Form.useForm();
    const intl = useIntl();
    const [submitting, setSubmitting] = useState(false);
    const [token, setToken] = useState('');
    const [visible, setVisible] = useState(false);
    const [popover, setPopover] = useState(false);
    const confirmDirty = false;

    useEffect(() => {
        const { token } = props.location.query;
        console.log('token', token);
        const verify = async () => {
            const result = await verifyToken({ token });
            if (result instanceof Error) {
                message.error(result.message);
                history.push('/user/login');
            }
            else {
                setToken(token);
            }
        };
        verify();
    }, []);

    const getPasswordStatus = () => {
        const value = form.getFieldValue('password');

        if (value && value.length > 9) {
            return 'ok';
        }

        if (value && value.length > 5) {
            return 'pass';
        }

        return 'poor';
    };

    const renderPasswordProgress = () => {
        const value = form.getFieldValue('password');
        const passwordStatus = getPasswordStatus();
        return value && value.length ? (
            <div className={styles[`progress-${passwordStatus}`]}>
                <Progress
                    status={passwordProgressMap[passwordStatus]}
                    className={styles.progress}
                    strokeWidth={6}
                    percent={value.length * 10 > 100 ? 100 : value.length * 10}
                    showInfo={false}
                />
            </div>
        ) : null;
    };

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
        const result = await resetPassword({ ...values, token });
        console.log(result);
        if (result instanceof Error) {
            message.error(result.message);
        }
        else {
            message.success(result.message);
            form.resetFields();
            history.push('/user/login');
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