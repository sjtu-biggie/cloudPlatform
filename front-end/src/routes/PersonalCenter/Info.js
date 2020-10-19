import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker, Avatar} from 'antd'
import PromptBox from "../../components/PromptBox";
import {calculateWidth} from "../../utils/utils";
import axios from "axios";

const FormItem = Form.Item;

@Form.create()
class PersonalCenter extends React.Component {
    state = {
        role: 'teacher',
        userInfo: {
            username:'加载中',
            email:'email',
            nickname:'nickname',
            sid:'sid',
            telephone:'tele',
            theClass:'class',
            theGrade:'grade'
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            focusItem: -1
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // const users = this.props.appStore.users
                // // 检测用户名是否存在
                // const result = users.find(item => item.username === values.registerUsername)
                // if (result) {
                //     this.props.form.setFields({
                //         registerUsername: {
                //             value: values.registerUsername,
                //             errors: [new Error('用户名已存在')]
                //         }
                //     })
                //     return
                // }
                const obj =  {
                    nickname: values.name,
                    email:values.Email,
                    telephone:values.Phonenumber,
                };

                console.log("obj:"+obj.nickname+":"+obj.email+":"+obj.telephone);
                this.updateUserInfo(obj);

                message.success('提交成功')
            }
        });
    }

    getUserInfo=async (username)=>{

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
        console.log(user);
        this.setState({
            userInfo:user
        })
        console.log("ui:"+this.state.userInfo.username);

    };

    updateUserInfo = async (obj) => {
        let config = {
            method: 'post',
            data: obj,
            url: 'http://106.13.209.140:8000/updateUser',
            headers: {
                withCredentials: true,
            }
        };
        console.log("传入数据",obj);
        const message1 = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        if (message1==='更新成功') {
            message.success('更新成功',5);
        }else{
            message.error(message1);
        }
    };

    componentWillMount() {
        let storage = window.localStorage;
        let r = storage.getItem("type");
        let username = storage.getItem("username");
        this.getUserInfo(username);
        this.setState({
            role: r
        });
    }

    render() {
        const {getFieldDecorator, getFieldError} = this.props.form
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
        const display2 = {
            display:(this.state.role === 'teacher') ? 'block' : 'none',
        }
        return (
            <div>
                <Card bordered={false} title='个人信息'>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                        <Form.Item label = '头像' style={display2} {...formItemLayout} >
                            <Avatar size={64} src =""/>
                        </Form.Item>

                        <Form.Item label = '用户名' {...formItemLayout}>
                            <Input placeholder={this.state.userInfo.username} disabled/>
                        </Form.Item>

                        <Form.Item label = '真实姓名' {...formItemLayout} help={getFieldError('name') && <PromptBox info={getFieldError('name')}
                                                                                                                   width={calculateWidth(getFieldError('name'))}/>}>
                            {getFieldDecorator('name', {
                                validateFirst: true,
                                rules: [
                                    {required: true, message: '真实姓名不能为空'},
                                    {pattern: '^[^ ]+$', message: '不能输入空格'},
                                ]
                            })(
                                <Input
                                    maxLength={16}
                                    placeholder={this.state.userInfo.nickname}
                                  />
                            )}
                        </Form.Item>

                        <Form.Item label = { this.state.role === 'teacher' ?'工号':'学号'} {...formItemLayout}>
                            <Input placeholder={this.state.userInfo.sid} disabled/>
                        </Form.Item>

                        <Form.Item label = '所在班级' {...formItemLayout}>
                            <Input placeholder={this.state.userInfo.theClass} disabled/>
                        </Form.Item>

                        <Form.Item label = '邮箱' {...formItemLayout} required help={getFieldError('Email') && <PromptBox info={getFieldError('Email')}
                                                                                      width={calculateWidth(getFieldError('Email'))}/>}>
                            {getFieldDecorator('Email', {
                                validateFirst: true,
                                rules: [
                                    {required: true, message: '邮箱不能为空'},
                                    {pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$', message: '错误的邮箱格式'},
                                ]
                            })(
                                <Input
                                    onFocus={() => this.setState({focusItem: 3})}
                                    onBlur={() => this.setState({focusItem: -1})}
                                    maxLength={30}
                                    placeholder={this.state.userInfo.email}
                                />
                            )}
                        </Form.Item>

                        <Form.Item label = '联系方式' {...formItemLayout} required help={getFieldError('Phonenumber') && <PromptBox info={getFieldError('Phonenumber')}
                                                                                            width={calculateWidth(getFieldError('Phonenumber'))}/>}>
                            {getFieldDecorator('Phonenumber', {
                                validateFirst: true,
                                rules: [
                                    {required: true, message: '手机不能为空'},
                                    {pattern: '^[^ ]+$', message: '不能输入空格'},
                                ]
                            })(
                                <Input
                                    onFocus={() => this.setState({focusItem: 5})}
                                    onBlur={() => this.setState({focusItem: -1})}
                                    maxLength={16}
                                    placeholder={this.state.userInfo.telephone}
                                />
                            )}
                        </Form.Item>
                        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const styles = {
    focus: {
        width: '20px',
        opacity: 1
    },
}

export default PersonalCenter
