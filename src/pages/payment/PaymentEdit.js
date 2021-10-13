import {Button, Card, DatePicker, Form, Input, InputNumber, message, Select} from "antd";
import {useState} from "react";
import {getConfigPage} from "../../service/ConfigService";
import moment from "moment";
import {insertPayment, updatePayment} from "../../service/PaymentService";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const {Option} = Select;
const {TextArea} = Input;

function PaymentEdit(props) {

    let {
        query
    } = props.location

    let id = props.match.params.id

    if (query === undefined) {
        query = {}
    }

    const [select, setSelect] = useState([])

    if (select.length === 0) {
        getConfigPage(0, -1, 1).then(res => {
            const data = res.data;
            if (data) {
                setSelect(data.data)
            }
        });
    }

    const {
        form: {getFieldDecorator}
    } = props

    const handleSubmit = e => {
        e.preventDefault()
        props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return
            }
            if (id !== undefined) {
                updatePayment(id, fieldsValue).then(res => {
                    if (!res.success) {
                        message.error(res.msg)
                        return
                    }
                    props.history.push("/payment/")
                })
            } else {
                insertPayment(fieldsValue).then(res => {
                    if (!res.success) {
                        message.error(res.msg)
                        return
                    }
                    props.history.push("/payment/")
                })
            }
        })
    }

    return (
        <div>
            <Card title="支出明细编辑" extra={
                <Button type="primary" onClick={() => props.history.push("/payment/")}>返回</Button>
            }>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Item label="支出类型">
                        {getFieldDecorator('type', {
                            rules: [{
                                required: true,
                                message: "请选择类型"
                            }],
                            initialValue: query.typeId
                        })(
                            <Select style={{width: 1000}} allowClear placeholder="请选择类型">
                                {select.map(e => <Option value={e.id} key={e.id}>{e.type}</Option>)}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="支出日期">
                        {getFieldDecorator('date', {
                            rules: [{
                                required: true,
                                message: "请选择日期"
                            }],
                            initialValue: moment(query.date)
                        })(
                            <DatePicker locale={locale} format="YYYY-MM-DD" style={{width: 1000}} placeholder="请选择日期"/>
                        )}
                    </Form.Item>
                    <Form.Item label="支出金额">
                        {getFieldDecorator('amount', {
                            rules: [{
                                required: true,
                                message: "请输入金额"
                            }],
                            initialValue: query.amount
                        })(<InputNumber
                            formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            stringMode
                            step="0.01"
                            placeholder="请输入金额"
                            style={{width: 1000}}/>)}
                    </Form.Item>
                    <Form.Item label="备注">
                        {getFieldDecorator('remarks', {
                            rules: [{
                                required: false
                            }],
                            initialValue: query.remarks
                        })(<TextArea rows={4} style={{width: 1000}}/>)}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Form.create({name: "paymentEdit"})(PaymentEdit)