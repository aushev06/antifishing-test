import React from "react";
import {Modal, Button} from 'antd';
import Pagination from '../../components/Pagination'
import Table from '../../components/Table'
import SendForm from '../../components/SendForm'
import EmailsModal from '../../components/EmailsModal'
import {AppContext} from "../../provider";

const columns = [
    {
        title: 'Id',
        dataIndex: 'dataKey',
        render: text => <a>{text}</a>,
    },
    {
        title: 'First Name',
        dataIndex: 'first_name',
    },
    {
        title: 'Second Name',
        dataIndex: 'second_name',
    }, {
        title: 'Third Name',
        dataIndex: 'third_name',
    }, {
        title: 'Departament',
        dataIndex: 'department',
    }, {
        title: 'Position',
        dataIndex: 'position',
    }, {
        title: 'Guid',
        dataIndex: 'guid',
    }, {
        title: 'Exists',
        dataIndex: 'exists',
    }, {
        title: 'Has Changes',
        dataIndex: 'has_changes',
    }, {
        title: 'Email',
        dataIndex: 'email',
    }, {
        title: 'Ldap Login',
        dataIndex: 'ldap_login',
    }, {
        title: 'Ldap Profile Id',
        dataIndex: 'ldap_profile_id',
    }, {
        title: 'Marks',
        dataIndex: 'marks',
    }, {
        title: 'Ldap External Id',
        dataIndex: 'ldap_external_id',
    },
];


const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};


export default () => {
    const {
        getData,
        data,
        isReady,
        page,
        setPage,
        pagination,
        selections,
        setSelections,
        send,
        onCloseDrawer,
        shownDrawer,
        isVisibleDrawer,
        setText,
        modalVisible,
        okModal,
        showModal,
        emails,
    } = React.useContext(AppContext);

    React.useEffect(() => {
        getData();
    }, [isReady, page, selections])


    if (false === isReady) {
        return <div>
            Loading...
        </div>
    }

    return (
        <div className={"ant-layout-content"}>
            <div className={"site-content"}>
                <div className={"site-layout-content"}>

                    <Button style={{marginBottom: 5}} type={"primary"} onClick={showModal}>Список отправленных эмайлов</Button>

                    <Table handleClick={shownDrawer} setSelections={setSelections} selections={selections}
                           columns={columns}
                           data={data}/>
                    <Pagination setPage={setPage} currentPage={page} pagesCount={pagination?.pages}/>

                    <SendForm onSend={send} onClose={onCloseDrawer} showDrawer={shownDrawer} handleChange={setText}
                              isVisible={isVisibleDrawer}/>

                    <EmailsModal isVisible={modalVisible} emails={emails} handleOk={okModal} showModal={showModal}/>
                </div>
            </div>
        </div>
    )
}