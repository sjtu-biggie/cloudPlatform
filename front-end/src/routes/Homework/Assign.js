import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker, Upload, Icon, Popconfirm} from 'antd'
import DraftDemo from './Draft'
import UploadDemo from './upload'
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

const FormItem = Form.Item;
const Option = Select.Option;

const options1 = [
    {
        label: '加载中',
        value: '加载中',
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
        text:'加载中',
        dfileList:[],
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
        courseId:null,
        option:null,
        loading:false,
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
        const options1 = [
            {
                label:user.theClass,
                value:user.theClass,
            }
        ];
        console.log(options1);
        this.setState({
            userInfo:user,
            option: options1,
            loading:true,
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
    };

    componentWillUnmount() {

        this.setState({
            courseId: this.props.course.id
        });
        this.getData2();
    }

    render=()=> {
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

        console.log()

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
                                    <Cascader options={this.state.loading === false ? options1: this.state.option} expandTrigger="hover" placeholder=''/>
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
                    <Upload
                        flieList = {this.state.dfileList}
                        accept=".png,.jpg,.jpeg"
                        action={ 'https://www.mocky.io/v2/5cc8019d300000980a055e76'}
                        onChange={({ file, fileList }) =>{
                        if (file.status !== 'uploading') {
                            console.log(file,file.originFileObj, fileList);
                            let fr = new FileReader();
                            fr.onload = async (e)=>{
                                // target.result 该属性表示目标对象的DataURL
                                console.log(e.target.result);
                                let config = {
                                    method: 'post',
                                    data :{
                                        "img":e.target.result,
                                        //"url": "F:/Documentation/Courseware/Software Introduction 2021/cloudPlatform/front-end/src/pic/deadHomework1.jpg",
                                        //是否需要识别结果中每一行的置信度，默认不需要。 true：需要 false：不需要
                                        "prob": false,
                                        //是否需要单字识别功能，默认不需要。 true：需要 false：不需要
                                        "charInfo": false,
                                        //是否需要自动旋转功能，默认不需要。 true：需要 false：不需要
                                        "rotate": false,
                                        //是否需要表格识别功能，默认不需要。 true：需要 false：不需要
                                        "table": false,
                                        //字块返回顺序，false表示从左往右，从上到下的顺序，true表示从上到下，从左往右的顺序，默认false
                                        "sortPage": false
                                    },
                                    url: 'https://ocrapi-advanced.taobao.com/ocrservice/advanced',
                                    headers: {
                                        Authorization:'APPCODE 41d14f8d1c4e405bb2c800e1cfb72272'
                                    }
                                };
                                const result = await axios(config)
                                    .then(function (response) {
                                        console.log(response.data);
                                        return response.data;
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                                file.status = 'removed';

                                this.setState({
                                    text:result.content
                                })
                            };
                            fr.readAsDataURL(file.originFileObj);

                        }

                        }}
                    >
                        <Popconfirm placement="top" title={this.state.text} okText="确认">
                            <Button style={{transform: 'translateX(900px)'}}
                            ><Icon type="upload"/>从图片中识别作业内容</Button>
                        </Popconfirm>

                    </Upload>
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
