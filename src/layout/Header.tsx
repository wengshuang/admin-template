import { Layout } from 'antd';
import styles from './index.module.less';
const { Header } = Layout;
export default function CustomHeader() {
  return (
    <Header className={styles['header']}>
      <div className="header-left">
        <span className="iconfont icon-a-adminguanliyuanguanlizheyonghukehu"></span>
        <span className="title">react-admin</span>
      </div>
      <div className="header-right">
        <span className="username">欢迎，管理员</span>
      </div>
    </Header>
  );
}
