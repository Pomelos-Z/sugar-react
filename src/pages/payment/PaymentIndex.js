import {Card, Table, Button, Popconfirm, message} from "antd"
import {useEffect, useState} from "react";
import {getPaymentPage, deletePayment} from "../../service/PaymentService";
import {Money} from "react-format";

function PaymentIndex(props) {

    const [dataSource, setDataSource] = useState({})

    useEffect(() => {
        getPaymentPage(0, 20).then(res => {
            setDataSource(res.data)
        })
    }, [])

    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        }, {
            title: '支出类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center'
        }, {
            title: '支出时间',
            dataIndex: 'date',
            key: 'date',
            align: 'center'
        }, {
            title: '支出金额',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            render: (text, record, index) => {
                return (<Money locale="zh-CN" currency="CNY">
                    {text}
                </Money>)
            }
        }, {
            title: '备注',
            dataIndex: 'remarks',
            key: 'remarks',
            align: 'center'
        }, {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                return (<div>
                    <Button type="link" size="small" onClick={() => props.history.push({
                        pathname: `/payment/edit/${record.id}`,
                        query: record
                    })}>修改</Button>
                    <Popconfirm title="确定删除此条记录吗？" okText="确认" cancelText="取消" onConfirm={() => {
                        deletePayment(record.id).then(res => {
                            if (!res.success) {
                                message.error(res.msg)
                                return
                            }
                            getPaymentPage(0, 20).then(res => {
                                setDataSource(res.data)
                            })
                        })
                    }}>
                        <Button type="link" size="small">删除</Button>
                    </Popconfirm>
                </div>)
            }
        },
    ];

    const changePage = (page) => {
        getPaymentPage(page - 1, 20).then(res => {
            setDataSource(res.data)
        })
    }

    return (
        <div>
            <Card title="支出明细" extra={
                <Button type="primary" onClick={() => props.history.push("/payment/edit/")}>新增</Button>
            }>
                <Table rowKey="id"
                       dataSource={dataSource.data}
                       columns={columns}
                       bordered
                       pagination={{
                           total: dataSource.count,
                           defaultPageSize: 20,
                           onChange: changePage
                       }}/>
            </Card>
        </div>
    )
}

export default PaymentIndex