import React, { useState } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, MailOutlined, } from '@ant-design/icons';
import { Form, message, Tabs, Button } from 'antd';
import Footer from '@/components/Footer';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { forgotPassword } from './service';
import styles from './index.less';

const Forgotpassword = () => {

    const [form] = Form.useForm();
    const intl = useIntl();
    const [submitting, setSubmitting] = useState(false);

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

                    {status === 'error' && loginType === 'account' && (
                        <LoginMessage
                            content={intl.formatMessage({
                                id: 'pages.login.accountLogin.errorMessage',
                                defaultMessage: '账户或密码错误(admin/ant.design)',
                            })}
                        />
                    )}
                    <ProFormText
                        name="email"
                        fieldProps={{
                            size: 'large',
                            prefix: <MailOutlined className={styles.prefixIcon} />,
                        }}
                        placeholder={intl.formatMessage({
                            id: 'pages.form.email.placeholder',
                            defaultMessage: 'Your email address',
                        })}
                        rules={[
                            {
                                required: true,
                                message: (
                                    <FormattedMessage
                                        id="pages.form.email.required"
                                        defaultMessage="Please enter your email address!"
                                    />
                                ),
                            },
                            {
                                type: 'email',
                                message: (<FormattedMessage
                                    id="pages.form.email.type"
                                    defaultMessage="Please enter a valid email address!"
                                />),
                            },
                        ]}
                    />
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

export default Forgotpassword;