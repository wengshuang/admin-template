import { Card, Col, Row } from 'antd';

export default function Home() {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={12} lg={6}>
        <Card bordered={false}>Card content</Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <Card bordered={false}>Card content</Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <Card bordered={false}>Card content</Card>
      </Col>
      <Col xs={24} sm={12} md={12} lg={6}>
        <Card bordered={false}>Card content</Card>
      </Col>
    </Row>
  );
}
