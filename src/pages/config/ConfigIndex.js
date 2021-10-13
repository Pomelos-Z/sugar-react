import {Button, Card, message, Popconfirm, Table, Tabs} from "antd";
import {useEffect, useState} from "react";
import {getConfigPage, deleteConfig} from "../../service/ConfigService";

const {TabPane} = Tabs;

function ConfigIndex(props) {

    let {
        query
    } = props.location

    if (query === undefined) {
        query = {active: 0}
    }

    const columns = [
        {
            title: '类型名称',
            dataIndex: 'type',
            key: 'type',
            align: 'center'
        }, {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                return (<div>
                    <Button type="link" size="small"
                            onClick={() => props.history.push({
                                pathname: `/config/edit/${record.id}`,
                                query: record
                            })}>修改</Button>
                    <Popconfirm disabled={!record.canDelete} title="确定删除此条记录吗？" okText="确认" cancelText="取消"
                                onConfirm={() => {
                                    deleteConfig(record.id).then(res => {
                                            if (!res.success) {
                                                message.error(res.msg)
                                                return
                                            }
                                            getConfigPage(0, -1, record.style).then(res => {
                                                setDataSource(res.data)
                                            })
                                        }
                                    )
                                    console.log(record);
                                }}>
                        <Button disabled={!record.canDelete} type="link" size="small">删除</Button>
                    </Popconfirm>
                </div>)
            }
        },
    ];

    const [dataSource, setDataSource] = useState({})

    useEffect(() => {
        getConfigPage(0, -1, query.active).then(res => {
            setDataSource(res.data)
        })
    }, [query.active])

    const callback = (key) => {
        getConfigPage(0, -1, key).then(res => {
            setDataSource(res.data)
        })
    }

    return (
        <div>
            <Tabs defaultActiveKey={query.active + ''} onChange={callback}>
                <TabPane tab="收入类型配置" key="0">
                    <Card title="收入类型" extra={
                        <Button type="primary" onClick={() => props.history.push({
                            pathname: "/config/edit/",
                            query: {style: 0}
                        })}>新增</Button>
                    }>
                        <Table rowKey="id" dataSource={dataSource.data} columns={columns} bordered pagination={false}/>
                    </Card>
                </TabPane>
                <TabPane tab="支出类型配置" key="1">
                    <Card title="支出类型" extra={
                        <Button type="primary" onClick={() => props.history.push({
                            pathname: "/config/edit/",
                            query: {style: 1}
                        })}>新增</Button>
                    }>
                        <Table rowKey="id" dataSource={dataSource.data} columns={columns} bordered pagination={false}/>
                    </Card>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default ConfigIndex