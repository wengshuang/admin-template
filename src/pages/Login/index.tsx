import { useState } from 'react';
import { Button, Form, Input } from 'antd';

import styles from './index.module.less';
export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const onFinish = async () => {
    try {
      await form.validateFields();
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
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
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input size="large" />
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
