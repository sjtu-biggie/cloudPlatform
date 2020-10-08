import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import DraftDemo from './Draft'
import UploadDemo from './upload'

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
class Assign extends React.Component {
    state = {
        text: '获取验证码',
        disabled: false,
        homeworkJson: null
    };
    timer = 0;
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                message.success('提交成功');
                values.startDate = values.startDate.format('YYYY-MM-DD HH:mm:ss');
                values.endDate = values.endDate.format('YYYY-MM-DD HH:mm:ss');
                this.setState({homeworkJson:values});
                console.log(values);
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
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
        }

        return (
            <div>
                <Card bordered={false} title='布置作业'>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                        <FormItem label='作业名称' {...formItemLayout} required>
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
                        <FormItem label='布置范围' {...formItemLayout} required>
                            {
                                getFieldDecorator('range', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择布置班级'
                                        }
                                    ]
                                })(
                                    <Cascader options={options} expandTrigger="hover" placeholder=''/>
                                )
                            }
                        </FormItem>
                        <FormItem label='起止时间' {...formItemLayout} required>
                            {
                                getFieldDecorator('time', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择起止时间'
                                        }
                                    ]
                                })(
                                    <DatePicker.RangePicker/>
                                )
                            }
                        </FormItem>
                        <FormItem style={{width: '100%', margin: '0 auto'}} label='作业详情' {...DraftLayout}>
                        {
                            (
                                <DraftDemo/>
                            )
                        }
                    </FormItem>
                        <FormItem label='上传作业附件' {...formItemLayout} >
                            {
                                (
                                    <UploadDemo/>
                                )
                            }
                        </FormItem>
                        <FormItem style={{width: '100%', margin: '0 auto'}} label='参考答案' {...DraftLayout}>
                            {
                                (
                                    <DraftDemo/>
                                )
                            }
                        </FormItem>
                        <FormItem label='上传答案附件' {...formItemLayout} >
                            {
                                (
                                    <UploadDemo/>
                                )
                            }
                        </FormItem>

                        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" >提交</Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default Assign
