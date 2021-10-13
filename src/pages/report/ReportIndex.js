import {Statistic, Card, Row, Col, Table, Button, Popconfirm, Tag, Tooltip, message} from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined, WarningOutlined} from '@ant-design/icons';
import './ReportIndex.css'
import {Money} from 'react-format'
import {useEffect, useState} from "react";
import {getIncomeReport, getPaymentReport} from "../../service/ReportService";
import {getAlarmPage, deleteAlarm} from "../../service/AlarmService";

function ReportIndex(props) {

    const [incomeSou, setIncomeSou] = useState({})

    const [paymentSou, setPaymentSou] = useState({})

    const [alarmSou, setAlarmSou] = useState({})

    useEffect(() => {
        getIncomeReport().then(res => {
            setIncomeSou(res.data)
        })
        getPaymentReport().then(res => {
            setPaymentSou(res.data)
        })
        getAlarmPage(0, 20).then(res => {
            setAlarmSou(res.data)
        })
    }, [])

    const columns = [
        {
            title: '截止日期',
            dataIndex: 'date',
            key: 'date',
            align: 'center'
        }, {
            title: '提醒',
            dataIndex: 'differ',
            key: 'differ',
            align: 'center',
            render: data => {
                let color = data > 7 ? 'geekblue' : 'volcano';
                if (data < 0) {
                    return (
                        <Tag color={color} key={data}>
                            <WarningOutlined/> <span>已经超过截止日期{0 - data}天</span>
                        </Tag>
                    )
                }
                return (
                    <Tag color={color} key={data}>
                        <WarningOutlined/> <span>距离截止日期还剩{data}天</span>
                    </Tag>
                )
            }
        }, {
            title: '提醒内容',
            dataIndex: 'remarks',
            key: 'remarks',
            align: 'center'
        }, {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
                return (<div>
                    <Button type="link" size="small" onClick={() => props.history.push({
                        pathname: `/alarm/edit/${record.id}`,
                        query: record
                    })}>修改</Button>
                    <Popconfirm title="确定删除此条提醒吗？" okText="确认" cancelText="取消" onConfirm={() => {
                        deleteAlarm(record.id).then(res => {
                            if (!res.success) {
                                message.error(res.msg)
                                return
                            }
                            getAlarmPage(0, 20).then(res => {
                                setAlarmSou(res.data)
                            })
                        })
                    }}>
                        <Button type="link" size="small">删除</Button>
                    </Popconfirm>
                </div>)
            }
        },
    ];

    const detailColumns = [
        {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            align: 'center'
        }, {
            title: '合计金额',
            dataIndex: 'amount',
            key: 'amount',
            align: 'center',
            render: (text, record, index) => {
                return (<Money locale="zh-CN" currency="CNY">
                    {text}
                </Money>)
            }
        }
    ];

    const changePage = (page) => {
        getAlarmPage(page - 1, 20).then(res => {
            setAlarmSou(res.data)
        })
    }

    return (
        <div className="site-statistic-demo-card">
            <Row gutter={16}>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="本月收入"
                            value={incomeSou.content}
                            precision={2}
                            valueStyle={{color: '#3f8600'}}
                            prefix="¥"
                            suffix={<ArrowUpOutlined/>}
                        />
                        <br/>
                        <Table rowKey="type" columns={detailColumns} dataSource={incomeSou.data} pagination={false}/>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card>
                        <Statistic
                            title="本月支出"
                            value={paymentSou.content}
                            precision={2}
                            valueStyle={{color: '#cf1322'}}
                            prefix="¥"
                            suffix={<ArrowDownOutlined/>}
                        />
                        <br/>
                        <Table rowKey="type" columns={detailColumns} dataSource={paymentSou.data} pagination={false}/>
                    </Card>
                </Col>
            </Row>
            <br/>
            <Card title="提醒事项" extra={
                <Tooltip placement="topLeft" title="新建提醒事项后会提前七天进行展示预警通知" arrowPointAtCenter>
                    <Button type="primary" onClick={() => props.history.push("/alarm/edit")}>新增提醒事项</Button>
                </Tooltip>
            }>
                <Table rowKey="id"
                       dataSource={alarmSou.data}
                       columns={columns}
                       bordered
                       pagination={{
                           total: alarmSou.count,
                           defaultPageSize: 20,
                           onChange: changePage
                       }}/>
            </Card>
        </div>
    )
}

export default ReportIndex