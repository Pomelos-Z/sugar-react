import {Button, Card, Form, Input, message} from "antd";
import {insertConfig, updateConfig} from "../../service/ConfigService";

function ConfigEdit(props) {

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
                updateConfig(id, {...fieldsValue, type: query.style}).then(res => {
                    if (!res.success) {
                        message.error(res.msg)
                        return
                    }
                    props.history.push({pathname: "/config/", query: {active: query.style}})
                })
            } else {
                insertConfig({...fieldsValue, type: query.style}).then(res => {
                    if (!res.success) {
                        message.error(res.msg)
                        return
                    }
                    props.history.push({pathname: "/config/", query: {active: query.style}})
                })
            }
        })
    }

    return (
        <div>
            <Card title="配置编辑" extra={
                <Button type="primary" onClick={() => props.history.push("/config/")}>返回</Button>
            }>
                <Form onSubmit={e => handleSubmit(e)}>
                    <Form.Item label="类型名称">
                        {getFieldDecorator('name', {
                            rules: [{
                                required: true,
                                message: "请输入类型名称"
                            }],
                            initialValue: query.type
                        })(<Input style={{width: 1000}}/>)}
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

export default Form.create({name: "configEdit"})(ConfigEdit)