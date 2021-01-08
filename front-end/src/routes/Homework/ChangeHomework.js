import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker, Checkbox} from 'antd'
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
        role: null,
        content: null,
        answer: null,
        loading: false,
        conUpload: null,
        ansUpload: null,
        student:null,
        iFrameHeight:'100%'
    };
    componentWillReceiveProps(nextProps, nextContext) {
    }

    getData2 = () => {
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
        this.getHomeworkOne(this.props.homeworkId);
    };

    getHomeworkOne = async (homeworkId)=>{
        console.log(this.props.homeworkId);
        let config = {
            method: 'post',
            url: 'http://124.70.201.12:8383/getTeacherHomeworkOne?homeworkId=' + homeworkId,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        let classIds = hw.range.split(',');
        hw.classIds = classIds;
        console.log(hw);
        this.setState({
            homework:hw,
            homeworkId:this.props.homeworkId
        });
        this.getStudentInfo(classIds);

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
            url: 'http://124.70.201.12:8000/getUserMessage',
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
    postAnswer = async ()=>{
        let ob = {
            homeworkId: parseInt(this.state.homeworkId)
        };
        let config = {
            method: 'post',
            url: 'http://124.70.201.12:8383/UpdateAnspost?homeworkId='+this.state.homeworkId,
            headers: {
                withCredentials: true,
            }
        };
        const newAnspost = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        let homework = this.state.homework;
        homework.anspost = newAnspost;
        this.setState({
            homework:homework
        })
    };
    getStudentInfo = async (values)=>{
        let ob = {
            classIds: values
        };
        let config = {
            method: 'post',
            data : ob,
            url: 'http://124.70.201.12:8000/getAllUsersByClassIds',
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
        this.setState({
            student:studentInfo,
        })
    };


    getContent = (result, t) => {
        this.setState({
            content: t
        })
    };

    getAnswer = (result, t) => {
        this.setState({
            answer: t
        })
    };

    getConUpload = (result, fileList) => {
        let conPath = [];
        for(let i=0;i<fileList.length;i++){
            conPath.push(fileList[i].response)
        }
        let conUpload=conPath.join(',');
        this.setState({
            conUpload: conUpload
        })
    };

    getAnsUpload = (result, fileList) => {
        let ansPath = [];
        for(let i=0;i<fileList.length;i++){
            ansPath.push(fileList[i].response)
        }
        let ansUpload = ansPath.join(',');
        this.setState({
            ansUpload: ansUpload
        })
    };

    editStudentHomework = async (homework)=>{
        let tos=[];
        for (let i = 0; i < this.state.student.length; ++i){
            tos.push(this.state.student[i].email)
            console.log(tos);
            homework.studentId = this.state.student[i].username;
            homework.nickName = this.state.student[i].nickname;
            console.log(homework);
            let config = {
                method: 'post',
                url: 'http://124.70.201.12:8383/editStudentHomeworkByTeacher',
                //url: 'http://localhost:8080/editStudentHomeworkByTeacher',
                data: homework,
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
        }
        axios({
            url:'http://124.70.201.12:8000/sendNotice',
            method:'POST',
            data:{
                "tos":tos,
                "context":"作业已修改，请及时查收",
            }
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })
    }

    editHomework = async (homework)=>{
        console.log(homework);
        let obj = {
            answer: this.state.answer === null ? this.state.homework.answer : this.state.answer,
            answerUpload:  this.state.ansUpload === null ? this.state.homework.answerUpload:this.state.ansUpload,
            content: this.state.content === null ? this.state.homework.content : this.state.content,
            contentUpload: this.state.conUpload === null ? this.state.homework.contentUpload:this.state.conUpload,
            courseId: this.state.homework.courseId,
            delayable: homework.delayable,
            endTime: homework.endTime,
            startTime: homework.startTime,
            handinAlready: this.state.homework.handinAlready,
            handinAmount: this.state.homework.handinAmount,
            id: this.state.homework.id,
            range: this.state.homework.range,
            syllabus: this.state.homework.syllabus,
            subject:this.state.homework.subject,
            title: homework.title,
            type: this.state.homework.type,
            homeworkId: this.state.homework.homeworkId,
            teacherId: this.state.homework.teacherId
        }
        console.log(obj);
        let config = {
            method: 'post',
            url: 'http://124.70.201.12:8383/editTeacherHomework',
            //url: 'http://localhost:8080/editTeacherHomework',
            data:obj,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            homework:hw,
        })
        this.editStudentHomework(obj);
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                message.success('提交成功');
                values.startTime = this.format(values.startDate);
                values.endTime = this.format(values.endDate);
                if(values.delayable === true){
                    values.delayable = 1;
                }else{
                    values.delayable = 0;
                }
                console.log(values);
                this.editHomework(values);
            }
        });
    };

    componentWillMount() {
        this.getData2();
    }
    package=(value)=>{
        if(value===undefined) return "加载中";
        console.log(value);
        let tt = [];
      for(let i = 1;i<=value.chapterNum;++i){
          let chapter = 'chapter' + i;
          let string = "";
          if(value[chapter].type==="选择题"){
              let title = value[chapter].title;
              tt.push(<p>选择题：{title}</p>);
              string = "选项：";
          }else{
              let title = value[chapter].text;
              tt.push(<p>填空题：{title}</p>);
              string = "答案："
          }
          let content = value[chapter].content;
          for(let j of content){
              string = string+j+"    ";
          }
          tt.push(<p>{string}</p>)
      }
      return tt;
    };
    render=()=> {
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
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写作业名称'
                                        }
                                    ]
                                })(
                                    <Input disabled={this.state.ableState} placeholder={this.state.homework.title}/>
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
                                    <DatePicker disabled={this.state.ableState} placeholder={this.format(this.state.homework.startTime)} onChange={() => {

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
                                    <DatePicker  disabled={this.state.ableState} placeholder={this.format(this.state.homework.endTime)} onChange={() => {

                                    }}> </DatePicker>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否允许迟交' {...formItemLayout} required>
                            {
                                getFieldDecorator('delayable', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写是否允许迟交'
                                        }
                                    ]
                                })(
                                    <Checkbox disabled={this.state.ableState} defaultchecked = {this.state.homework.delayable}>允许迟交</Checkbox>
                                )
                            }
                        </FormItem>

                        <FormItem label='作业内容' {...formItemLayout} required>
                            {
                                (
                                    this.state.homework.type==="主观题"?
                                    <iframe disabled={this.state.ableState} style={{width:'100%', height:this.state.iFrameHeight}} title={"s"}
                                            src={'data:text/html;charset=UTF-8,'+this.state.homework.content}/>:this.package(this.state.homework.syllabus)
                                )
                            }
                        </FormItem>
                        {this.state.homework.type==="主观题"?
                        <FormItem label='作业答案' {...formItemLayout} required>
                            {
                                (
                                    <iframe disabled={this.state.ableState} style={{width:'100%', height:this.state.iFrameHeight}} title={"s"} src={'data:text/html;charset=UTF-8,'+this.state.homework.answer}/>
                                )
                            }
                        </FormItem>:null }
                        <FormItem style={display2} label='作业详情' {...DraftLayout} >
                            {
                                (
                                    <DraftDemo parent={this} flag='content'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='上传作业附件' {...formItemLayout} style={display2} >
                            {
                                (
                                    <UploadDemo parent={this} flag='content'/>
                                )
                            }
                        </FormItem>

                        <FormItem style={display2} label='参考答案'  {...DraftLayout}>
                            {
                                (
                                    <DraftDemo parent={this} flag='answer'/>
                                )
                            }
                        </FormItem>
                        <FormItem label='上传答案附件' {...formItemLayout} style={display2}>
                            {
                                (
                                    <UploadDemo parent={this} flag='answer'/>
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
                            <Button type="dashed" style={{marginLeft: 50}} onClick={()=>{
                                this.postAnswer();
                            }}>
                                {this.state.homework.anspost===1?
                                    "取消答案公布":"公布答案"
                                }
                            </Button>
                        </FormItem>
                    </Form>

                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default ChangeHomework
