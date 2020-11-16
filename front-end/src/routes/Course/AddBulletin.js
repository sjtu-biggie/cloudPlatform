import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker, Switch} from 'antd'
import TextArea from "antd/es/input/TextArea";
import axios from "axios";

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

/**
 * @return {string}
 */
function CurentTime() {
    let now = new Date();

    let year = now.getFullYear();       //年
    let month = now.getMonth() + 1;     //月
    let day = now.getDate();            //日

    let hh = now.getHours();            //时
    let mm = now.getMinutes();          //分
    let ss = now.getSeconds();           //秒

    let clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day + " ";

    if (hh < 10)
        clock += "0";

    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";

    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}

@Form.create()
class AddBulletin extends React.Component {
    state = {
        text: '获取验证码',
        disabled: false,

    };
    componentWillMount= ()=> {
        console.log(this.props.classes);
    };
    timer = 0;
    handleSubmit = async (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, values) => {
            if (err) {
                message.warning('请填写正确的公告内容')
            } else {
                message.success('公告发布成功');
                values.courseId = this.props.course_id;
                values.publishDate = CurentTime();
                let config = {
                    method: 'post',
                    data: values,
                    url: 'http://106.13.209.140:8787/course/addBulletin',
                    headers: {
                        withCredentials: true,
                    }
                };
                const user = await axios(config)
                    .then(function (response) {
                        if(values.note === false){
                            console.log("not send");
                            return;
                        }
                        console.log(response.data);
                        axios({
                            method: 'POST',
                            url: 'http://106.13.209.140:8000/getAllStudentsByTheClass',
                            data: {
                                "theClass": "F1803702"
                            }
                        }).then(msg => {
                            console.log(msg.data);
                            let tos = [];
                            msg.data.map(item => {
                                tos.push(item.email);
                            });
                            console.log(tos);
                            axios({
                                method:'POST',
                                url:'http://106.13.209.140:8000/sendNotice',
                                data:{
                                    "tos":tos,
                                    "context":values.content,
                                }
                            }).then(msg=>{
                                console.log(msg.data);
                            }).catch(err=>{
                                console.log(err)
                            })


                        }).catch(err => {
                            console.log(err);
                        });


                        return response.data;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        });
    };

    componentWillUnmount() {
        console.log(this.props.classes);
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
                                getFieldDecorator('title', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写公告标题'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem label='公告内容' {...formItemLayout} required>
                            {
                                getFieldDecorator('content', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写公告具体内容'
                                        }
                                    ]
                                })(
                                    <TextArea style={{height: '200px'}}/>
                                )
                            }
                        </FormItem>
                        <FormItem label='是否发送通知' {...formItemLayout} required>
                            {
                                getFieldDecorator('note', {})(
                                    <Switch defaultChecked/>
                                )
                            }
                        </FormItem>
                        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit" style={{marginLeft: '100px'}}>发布公告</Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default AddBulletin
