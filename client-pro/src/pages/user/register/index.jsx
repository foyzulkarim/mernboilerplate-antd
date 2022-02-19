import { useState, useEffect } from 'react';
import { Form, Button, Col, Input, Popover, Progress, Row, Select, message } from 'antd';
import { useIntl, Link, useRequest, history, FormattedMessage } from 'umi';
import { fakeRegister } from './service';
import styles from './style.less';

const FormItem = Form.Item;
const { Option } = Select;
const InputGroup = Input.Group;
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

const Register = () => {
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [prefix, setPrefix] = useState('86');
  const [popover, setPopover] = useState(false);
  const intl = useIntl();
  const confirmDirty = false;
  let interval;
  const [form] = Form.useForm();
  useEffect(
    () => () => {
      clearInterval(interval);
    },
    [interval],
  );

  const onGetCaptcha = () => {
    let counts = 59;
    setCount(counts);
    interval = window.setInterval(() => {
      counts -= 1;
      setCount(counts);

      if (counts === 0) {
        clearInterval(interval);
      }
    }, 1000);
  };

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

  const { loading: submitting, run: register } = useRequest(fakeRegister, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.status === 'ok') {
        message.success('注册成功！');
        history.push({
          pathname: '/user/register-result',
          state: {
            account: params.email,
          },
        });
      }
    },
  });

  const onFinish = (values) => {
    register(values);
  };

  const checkConfirm = (_, value) => {
    const promise = Promise;

    if (value && value !== form.getFieldValue('password')) {
      return promise.reject('The passwords entered twice do not match!');
    }

    return promise.resolve();
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

  const changePrefix = (value) => {
    setPrefix(value);
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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Register</span>
            </Link>
          </div>
          <div className={styles.desc}>
            {intl.formatMessage({
              id: 'pages.layouts.userLayout.title',
            })}
          </div>
        </div>
        <div className={styles.main}>
          <Form form={form} name="UserRegister" onFinish={onFinish}>
            <FormItem
              name="firstName"
              rules={[
                {
                  required: true,
                  message: 'Please input the first name!',
                },
              ]}
            >
              <Input size="large" placeholder="First name" />
            </FormItem>
            <FormItem
              name="lastName"
              rules={[
                {
                  required: true,
                  message: 'Please input the last name!',
                },
              ]}
            >
              <Input size="large" placeholder="Last name" />
            </FormItem>
            <FormItem
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input the username!',
                },
              ]}
            >
              <Input size="large" placeholder="Username" />
            </FormItem>
            <FormItem
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input the email address!',
                },
                {
                  type: 'email',
                  message: 'Email address format error!',
                },
              ]}
            >
              <Input size="large" placeholder="Email" />
            </FormItem>
            <FormItem
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: 'Please enter phone number!',
                },
                {
                  pattern: /\d{11}$/,
                  message: 'Malformed phone number!',
                },
              ]}
            >
              <Input size="large" placeholder="eg. 01XXXXXXXXX" />
            </FormItem>
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
            <FormItem>
              <div>
                <Button
                  block
                  loading={submitting}
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  <span>Register</span>
                </Button>
              </div>
              <div style={{
                marginTop: 24,
              }}>
                <Button block type="default">
                  <Link to="/user/login">
                    <FormattedMessage id="pages.login.register" defaultMessage="Login" />
                  </Link>
                </Button>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
