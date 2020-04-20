import React from "react";
import { Modal, Button, Table } from 'antd';


const columns = [
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Text',
        dataIndex: 'text',
        key: 'text',
    },
];

export default ({isVisible, handleOk, emails}) => {
    return (
        <div>
            <Modal
                title="Список почт"
                visible={isVisible}
                onOk={handleOk}
                onCancel={handleOk}
                width={"50%"}
            >
                <Table dataSource={emails} columns={columns} />
            </Modal>
        </div>
    )
}