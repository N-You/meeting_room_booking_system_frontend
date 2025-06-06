import { Input, Form, Button, message } from "antd";
import { login } from "./interfaces";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

interface LoginUser {
    username: string;
    password: string;
}

const FormLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

const FormItemLayout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 }
}

export function Login() {

    const navigate = useNavigate();

    const onFinish = useCallback(async (values: LoginUser) => {
        const res = await login(values.username, values.password);

        const { code, message: msg, data } = res.data;
        if (res.status === 201 || res.status === 200) {
            message.success('登录成功');

            localStorage.setItem('access_token', data.accessToken);
            localStorage.setItem('refresh_token', data.refreshToken);
            localStorage.setItem('user_info', JSON.stringify(data.userInfo));

            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            message.error(data || '系统繁忙，请稍后再试');
        }
    }, []);

    return (
        <>
            <style>
                {
                    `
                #login-container {
                width: 400px;
                margin: 100px auto 0 auto;
                text-align: center;
                }
                #login-container .links {
                    display: flex;
                justify-content: space-between; 
                }
                #login-container .btn {
                    width: 100%;
                }
                    `
                }
            </style>
            <div id="login-container">
                <h1>会议室预订系统</h1>
                <Form
                    {...FormLayout}
                    onFinish={onFinish}
                    colon={false}
                    autoComplete="off"
                >
                    <Form.Item
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        {...FormItemLayout}
                    >
                        <div className='links'>
                            <a href='/register'>创建账号</a>
                            <a href='/update_password'>忘记密码</a>
                        </div>
                    </Form.Item>

                    <Form.Item
                        {...FormItemLayout}
                    >
                        <Button className='btn' type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}
