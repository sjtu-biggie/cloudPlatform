import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker} from 'antd'
import DraftDemo from './Draft'
import UploadDemo from './upload'
import axios from "axios";

const FormItem = Form.Item;

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

const options2 = [
    {
        value: '1',
        label: '主观题',
    },
    {
        value: '2',
        label: '选择题',
    },
    {
        value: '3',
        label: '填空题',
    }
];


const Hw = {
    title: '加载中',
    class: '加载中',
    type: '加载中',
    content: '加载中',
    answer: '加载中',
    startTime: '加载中',
    endTime: '加载中',

}

@Form.create()
class ChangeHomework extends React.Component {
    state = {
        disabled: false,
        homework: Hw,
       // homework: null,
        homeworkId: 0,
        ableState: true,
        buttonName:'修改作业',
        userInfo: null,
        role: null
    };
    componentWillReceiveProps(nextProps, nextContext) {
        this.getHomeworkOne(nextProps.homeworkId);
    }

    getData2 = () => {
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
        this.getHomeworkOne(this.props.homeworkId);
    };

    format = (shijianchuo) => {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    };

    add0 = (m) => {
        return m < 10 ? '0' + m : m
    }

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
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            userInfo:user,
        })
    };

    getHomeworkOne = async (homeworkId)=>{
        let config = {
            method: 'post',
            url: 'http://106.13.209.140:8383/getTeacherHomeworkOne?homeworkId=' + homeworkId,
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

    getConUpload = (result, fileList) => {
        this.setState({
            conFile:fileList,
        })
        let conPath = [];
        for(let i=0;i<fileList.length;i++){
            conPath.push(fileList[i].response)
        }
        let conUpload=conPath.join(',')
        this.setState({
            conUpload: conUpload
        })
    }

    getAnsUpload = (result, fileList) => {
        this.setState({
            ansFile:fileList,
        })
        let ansPath = [];
        for(let i=0;i<fileList.length;i++){
            ansPath.push(fileList[i].response)
        }
        let ansUpload = ansPath.join(',')
        this.setState({
            ansUpload: ansUpload
        })
    }

    editHomework = async (homework)=>{
        let config = {
            method: 'post',
            url: 'http://106.13.209.140:8383//editTeacherHomework',
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

    componentWillMount() {
        this.getData2();
    }

    render() {
        const display2 = {
            display:(this.state.buttonName === '取消修改') ? 'block' : 'none',
            width: '100%',
            margin: '0 auto'
        }

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
                <Card bordered={false}>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                        <FormItem label='作业名称' {...formItemLayout} required>
                            {
                                getFieldDecorator('title', {
                                    initialValue:this.state.homework === null ? '暂无': this.state.homework.title,
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写作业名称'
                                        }
                                    ]
                                })(
                                    <Input disabled={this.state.ableState}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='布置范围' {...formItemLayout}>
                            {
                                (
                                    <Cascader disabled options={options} expandTrigger="hover" placeholder={this.state.homework.range}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='作业类型' {...formItemLayout}>
                            {

                                (
                                    <Cascader  style={{width: 100}} disabled options={options2} expandTrigger="hover" placeholder={this.state.homework.type}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='起止时间' {...formItemLayout} required>
                            {
                                getFieldDecorator('time', {
                                    // initialValue:[this.state.homework.startTime, this.state.homework.endTime],
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择起止时间'
                                        }
                                    ]
                                })(
                                    <DatePicker.RangePicker disabled={this.state.ableState} placeholder={[this.format(this.state.homework.startTime), this.format(this.state.homework.endTime)]}/>
                                )
                            }
                        </FormItem>
                        <FormItem style={display2} label='作业详情' {...DraftLayout} >
                            {
                                (
                                    <DraftDemo/>
                                )
                            }
                        </FormItem>
                        <FormItem label='上传作业附件' {...formItemLayout} style={display2} >
                            {
                                (
                                    <UploadDemo/>
                                )
                            }
                        </FormItem>
                        <FormItem style={display2} label='参考答案'  {...DraftLayout}>
                            {
                                (
                                    <DraftDemo disabled='true' placeholder = {this.state.homework.answer}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='上传答案附件' {...formItemLayout} style={display2}>
                            {
                                (
                                    <UploadDemo/>
                                )
                            }
                        </FormItem>
                        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" disabled={this.state.ableState}>提交</Button>
                            <Button type="primary" style={{marginLeft: 50}} onClick={()=>{
                                if (this.state.buttonName === '修改作业'){
                                    this.setState({
                                        ableState: false,
                                        buttonName:'取消修改'
                                    });
                                    message.success('开始修改');
                                }
                                else {
                                    this.setState({
                                        ableState: true,
                                        buttonName:'修改作业'
                                    });
                                    message.success('取消修改');
                                }
                            }}>{this.state.buttonName}</Button>
                        </FormItem>
                    </Form>

                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default ChangeHomework
