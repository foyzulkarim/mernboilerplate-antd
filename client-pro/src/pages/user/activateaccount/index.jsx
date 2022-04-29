import React, { useEffect } from 'react';
import ProForm, { ProFormCaptcha, ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { LockOutlined, MailOutlined, } from '@ant-design/icons';
import { Form, message, Tabs, Button } from 'antd';
import Footer from '@/components/Footer';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { activateAccount } from './service';
import styles from './index.less';

const ActivateAccount = (props) => {

    useEffect(() => {
        const { token } = props.location.query;
        console.log('token', token);
        const verify = async () => {
            const result = await activateAccount({ token });
            if (result instanceof Error) {
                message.error(result.message);
            }
            else {
                message.success(result.message);
            }
            history.push('/user/login');
        };
        verify();
    }, []);

    return (<></>);
}

export default ActivateAccount;