import {LockOutlined, UserOutlined,} from '@ant-design/icons';
import {LoginForm, ProFormCheckbox, ProFormText} from '@ant-design/pro-components';
import {history, useModel} from '@umijs/max';
import { Col, message, Row} from 'antd';
import React from 'react';
import useStyles from './index.style';
import {userLoginUsingPost} from "@/services/swagger/userController";


const Login: React.FC = () => {
  const {initialState, setInitialState} = useModel('@@initialState');
  const {styles} = useStyles();
  const handleSubmit = async (values: API.UserLoginRequest) => {
    try {
      // 登录
      const msg = await userLoginUsingPost({
        userAccount: values.userAccount,
        userPassword: values.userPassword
      });
      const defaultLoginSuccessMessage = '登录成功！';
      message.success(defaultLoginSuccessMessage);
      // 保存已登录用户信息
      setInitialState({
        ...initialState,
        currentUser: msg.data,
      });
      const urlParams = new URL(window.location.href).searchParams;
      history.push(urlParams.get('redirect') || '/');
      return;
    } catch (error: any) {
      const defaultLoginFailureMessage = `登录失败，${error.message}`;
      message.error(defaultLoginFailureMessage);
    }
  };
  return (
    <>
      <Row>
        <Col span={10} xs={0} sm={0} md={10} lg={10} xl={10} xxl={10}>
          <div className={styles.container}/>
        </Col>
        <Col
          span={14}
          className={styles.loginFrom}
          xs={24}
          sm={24}
          md={14}
          lg={14}
          xl={14}
          xxl={14}
        >
          <div>
            <LoginForm
              contentStyle={{
                minWidth: 400,
                padding: '32px 0 ',
              }}
              title="化疗管理系统"
              initialValues={{
                autoLogin: true,
              }}
              onFinish={async (values) => {
                await handleSubmit(values as API.UserLoginRequest);
              }}
            >
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined/>,
                }}
                placeholder={'请输入账号'}
                rules={[
                  {
                    required: true,
                    message: '用户名为必填项',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    message: '请输入密码',
                  },
                ]}
              />
              <div
                style={{
                  marginBottom: 24,
                }}
              >
                <ProFormCheckbox noStyle name="autoLogin">
                  自动登录
                </ProFormCheckbox>
                <a
                  style={{
                    float: 'right',
                  }}
                >
                  忘记密码 ?
                </a>
              </div>
            </LoginForm>
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Login;
