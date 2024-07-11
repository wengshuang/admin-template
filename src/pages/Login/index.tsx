import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserInfoState, useUserInfo } from '@/store';

import styles from './index.module.less';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const setUserInfo = useUserInfo((state: UserInfoState) => state.setUserInfo);

  const onFinish = async () => {
    try {
      const res = await form.validateFields();
      console.log(res);

      setLoading(true);
      setTimeout(() => {
        localStorage.token = '123456';
        setLoading(false);
        navigate('/', {
          replace: true,
        });
        setUserInfo({ name: res.username });
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={styles['login']}>
      <div className="login-box">
        <div className="login-box-top">
          <span className="iconfont icon-a-adminguanliyuanguanlizheyonghukehu"></span>
          <span className="title">react-admin</span>
        </div>
        <Form form={form} name="control-hooks" layout="vertical" requiredMark={false}>
          <Form.Item
            name="username"
            label="用户名"
            rules={[
              {
                required: true,
                validator: async (rule, value) => {
                  if (value === 'admin' || value === 'user') {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('用户名错误'));
                },
              },
            ]}
          >
            <Input size="large" placeholder="admin或者user" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input size="large" />
          </Form.Item>
        </Form>
        <Button type="primary" style={{ width: '100%' }} onClick={onFinish} loading={loading}>
          登 录
        </Button>
      </div>
    </div>
  );
}
