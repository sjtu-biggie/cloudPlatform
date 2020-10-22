import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker} from 'antd'
import DraftDemo from './Draft'
import UploadDemo from './upload'
import axios from "axios";

const FormItem = Form.Item;
const Option = Select.Option;

const options1 = [
    {
        label: '一年级3班',
        value: 'F1803704',
    }
];

const options2 = [
    {
        value: '主观题',
        label: '主观题',
    },
    {
        value: '选择题',
        label: '选择题',
    },
    {
        value: '填空题',
        label: '填空题',
    }
];

@Form.create()
class Assign extends React.Component {
    state = {
        disabled: false,
        homework: null,
        userInfo: null,
        role: null,
        content: null,
        answer:null
    };

    getData2 = () => {
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
    };

    getUserInfo = async (username)=>{
        let config = {
            method: 'post',
            data :{
                'username':username
            },
            url: 'http://106.13.209.140:8000/getUserMessage',
            headers: {
                withCredentials: true,
            }
        };
        const user = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(user);
        this.setState({
            userInfo:user,
        })
    };

    addHomework=async (homework)=>{
        let config = {
            method: 'post',
            url: 'http://106.13.209.140:8383//addTeacherHomework',
            data:{
                'homework':homework
            },
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hw);
        this.setState({
            homework:hw,
        })
    };

    getContent = (result, t) => {
        console.log(t);
        this.setState({
            content: t
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                message.success('提交成功');
                values.startDate = values.startDate.format('YYYY-MM-DD HH:mm:ss');
                values.endDate = values.endDate.format('YYYY-MM-DD HH:mm:ss');
                this.setState({homework:values});
                console.log(values);
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.getData2();
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
                                    <Cascader options={options1} expandTrigger="hover" placeholder=''/>
                                )
                            }
                        </FormItem>
                        <FormItem label='作业类型' {...formItemLayout} required>
                            {
                                getFieldDecorator('type', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择作业类型'
                                        }
                                    ]
                                })(
                                    <Cascader options={options2} expandTrigger="hover" placeholder=''/>
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
                                <DraftDemo parent={ this }/>
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
                                    <DraftDemo parent={ this }/>
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
