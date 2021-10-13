import {Button, Card, DatePicker, Form, Input, message} from "antd";
import {insertAlarm, updateAlarm} from "../../service/AlarmService";
import moment from "moment";
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

const {TextArea} = Input;

function AlarmEdit(props) {

    let {
        query
    } = props.location

    let id = props.match.params.id

    if (query === undefined) {
        query = {}
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
                updateAlarm(id, fieldsValue).then(res => {
                    if (!res.success) {
                        message.error(res.msg)
                        return
                    }
                    props.history.push("/report")
                })
            } else {
                insertAlarm(fieldsValue).then(res => {
                    if (!res.success) {
                        message.error(res.msg)
                        return
                    }
                    props.history.push("/report")
                })
            }
        })
    }

    return (
        <div>
            <Card title="提醒事项新增" extra={
                <Button type="primary" onClick={() => props.history.push("/report")}>返回</Button>
            }>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Item label="提醒日期">
                        {getFieldDecorator('date', {
                            rules: [{
                                required: true,
                                message: "请选择日期"
                            }],
                            initialValue: moment(query.date, 'YYYY-MM-DD HH:mm')
                        })(
                            <DatePicker locale={locale}
                                        format="YYYY-MM-DD"
                                        style={{width: 1000}}
                                        placeholder="请选择日期"/>
                        )}
                    </Form.Item>
                    <Form.Item label="提醒事项">
                        {getFieldDecorator('remarks', {
                            rules: [{
                                required: true,
                                message: "请输入提醒事项"
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

export default Form.create({name: "alarmEdit"})(AlarmEdit)