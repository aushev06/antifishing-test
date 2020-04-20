import React from "react";
import {Drawer, Form, Button, Col, Row, Input, Select, DatePicker} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

const {Option} = Select;

export default ({isVisible, onClose, showDrawer, handleChange, onSend}) => {
    return (
        <div>
            <Drawer
                title="Отправить письмо"
                width={720}
                onClose={onClose}
                visible={isVisible}
                bodyStyle={{paddingBottom: 80}}
                footer={
                    <div
                        style={{
                            textAlign: 'right',
                        }}
                    >
                        <Button
                            onClick={onClose}
                            style={{marginRight: 8}}
                        >
                            Cancel
                        </Button>
                        <Button onClick={onSend} type="primary">
                            Отправить
                        </Button>
                    </div>
                }
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="text"
                                label="Text"
                            >
                                <Input.TextArea onChange={e => handleChange(e.target.value)} rows={4} placeholder="Text"/>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Drawer>
        </div>
    )
}