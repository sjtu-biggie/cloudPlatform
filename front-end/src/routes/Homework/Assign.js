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
        homework: {
            courseId:0,
            homeworkId:0,
            teacherId:0,
            endTime:0,
            startTime:0,
            handinAmount:0,
            title:0,
            range:0,
            type:0,
            content:0,
            answer:0
        },
        userInfo: null,
        role: null,
        content: null,
        answer:null,
        courseId:null
    };

    add0=(m)=>{return m<10?'0'+m:m };

    format=(shijianchuo)=>
    {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
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
    getStudentInfo = async (obj)=>{
        let config = {
            method: 'post',
            data : obj,
            url: 'http://106.13.209.140:8000/getAllStudentsByClass',
            headers: {
                withCredentials: true,
            }
        };
        const studentInfo = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });

        let list1 = Array.from(studentInfo);
        for(let i = 0; i < list1.length; ++i){
            if (list1[i].type === 'teacher')
                list1.splice(i,1);
        }
        let list2 = Array.from(this.props.studentHomework);
        let data = [];
        for (let i = 0; i < list1.length; ++i){
            if (list2[i].score !== null){
                data.push({
                    username: list1[i].username,
                    sid: list1[i].sid,
                    nickname: list1[i].nickname,
                    theClass: list1[i].theClass,
                    theGrade: list2[i].score,
                    commit: '已提交',
                    correct:'已批改'
                })
            }
            else{
                if (list2[i].handinTime !== null){
                    data.push({
                        username: list1[i].username,
                        sid: list1[i].sid,
                        nickname: list1[i].nickname,
                        theClass: list1[i].theClass,
                        theGrade: null,
                        commit: '已提交',
                        correct:'未批改'
                    })
                }
                else{
                    data.push({
                        username: list1[i].username,
                        sid: list1[i].sid,
                        nickname: list1[i].nickname,
                        theClass: list1[i].theClass,
                        theGrade: null,
                        commit: '未提交',
                        correct:'未批改'
                    })
                }
            }
        }

        this.setState({
            studentInfo:studentInfo,
            data:data,
            orData: data,
            renderData: data
        })
        console.log(this.props);
        console.log(this.state.data);
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

    getAnswer = (result, t) => {
        console.log(t);
        this.setState({
            answer: t
        })
    }


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                values.startDate = this.format(values.startDate);
                values.endDate = this.format(values.endDate);
                if (values.startDate > values.endDate){
                    message.error('开始时间不能晚于结束时间');
                }
                else{
                    console.log(this.props);
                    values.courseId = this.props.course.course.id;
                    values.content = this.state.content;
                    values.answer = this.state.answer;
                    this.setState({
                        homework:values,
                    });
                    message.success('提交成功');
                    console.log(values);
                }
            }
        });
    }

    componentWillUnmount() {

        this.setState({
            courseId: this.props.course.id
        })
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
                                getFieldDecorator('title', {
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
                        <FormItem label='开始时间' {...formItemLayout} required>
                            {
                                getFieldDecorator('startDate', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择开始时间'
                                        }
                                    ]
                                })(
                                    <DatePicker onChange={() => {

                                    }}> </DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem label='结束时间' {...formItemLayout} required>
                            {
                                getFieldDecorator('endDate', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择结束时间'
                                        }
                                    ]
                                })(
                                    <DatePicker onChange={() => {

                                    }}> </DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem style={{width: '100%', margin: '0 auto'}} label='作业详情' {...DraftLayout}>
                        {
                            (
                                <DraftDemo parent={ this } flag = 'content'/>
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
                                    <DraftDemo parent={ this } flag = 'answer'/>
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
