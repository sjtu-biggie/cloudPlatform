import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker, Switch} from 'antd'
import TextArea from "antd/es/input/TextArea";

const FormItem = Form.Item;
const Option = Select.Option;

const options = [
    {
        label: '一年级3班',
        value: '1-3',
    },
    {
        label: '一年级4班',
        value: '1-4',
    }
];

@Form.create()
class AddBulletin extends React.Component {
    state = {
        text: '获取验证码',
        disabled: false,

    };
    timer = 0;
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请填写正确的公告内容')
            } else {
                message.success('提交成功')
            }
        });
    };

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const DraftLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 4,
                },
            },
        };

        return (
            <div>
                <Card bordered={false} title='添加公告'>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                        <FormItem label='公告标题' {...formItemLayout} required>
                            {
                                getFieldDecorator('homework_name', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写作业名称'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem label='公告内容' {...formItemLayout} required>
                            {
                                getFieldDecorator('range', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写公告具体内容'
                                        }
                                    ]
                                })(
                                    <TextArea style={{height:'200px'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否发送通知' {...formItemLayout} required>
                            {
                                getFieldDecorator('time', {

                                })(
                                    <Switch defaultChecked  />
                                )
                            }
                        </FormItem>
                        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" style={{marginLeft:'100px'}}>发布公告</Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default AddBulletin
