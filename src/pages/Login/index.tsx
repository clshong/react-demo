import React from 'react';
import { useNavigate } from "react-router-dom";
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

interface formObj {
    userName: string,
    passWord: string
}

type formObjType = keyof formObj



const Login: React.FC = () => {
    const navigate = useNavigate();

    const onFinish: FormProps<formObjType>['onFinish'] = (values) => {
        console.log('Success:', values);
        if (values) {
            navigate('/')
        }
    };
    const onFinishFailed: FormProps<formObjType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className='h-screen w-screen flex flex-col justify-center items-center'>
            <Form
                className=' '
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item<formObjType>
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item<formObjType>
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}


export default Login;

