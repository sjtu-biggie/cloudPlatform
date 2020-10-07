import React from 'react'
import {Card, Cascader, Form, Select, Input, Button, message, BackTop, DatePicker} from 'antd'
import PromptBox from "../../components/PromptBox";
import {calculateWidth} from "../../utils/utils";

const FormItem = Form.Item;

@Form.create()
class PersonalCenter extends React.Component {
    state = {
        focusItem: -1
    }
    timer = 0;
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            focusItem: -1
        })
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const users = this.props.appStore.users
                // 检测用户名是否存在
                const result = users.find(item => item.username === values.registerUsername)
                if (result) {
                    this.props.form.setFields({
                        registerUsername: {
                            value: values.registerUsername,
                            errors: [new Error('用户名已存在')]
                        }
                    })
                    return
                }

                const obj = [...this.props.appStore.users, {
                    username: values.registerUsername,
                    password: values.registerPassword
                }]
                localStorage.setItem('users', JSON.stringify(obj))
                this.props.appStore.initUsers()
                message.success('提交成功')
            }
        });
    }

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    render() {
        const {getFieldDecorator, getFieldValue, getFieldError} = this.props.form
        const {focusItem} = this.state
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
                <Card bordered={false} title='个人信息'>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                        <Form.Item label = '用户名' {...formItemLayout}>
                            <Input placeholder={'username'} disabled/>
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
                                    onFocus={() => this.setState({focusItem: 0})}
                                    onBlur={() => this.setState({focusItem: -1})}
                                    maxLength={16}
                                    placeholder='姓名'
                                    addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
                            )}
                        </Form.Item>

                        <Form.Item label = '学号' {...formItemLayout}>
                            <Input placeholder={12345} disabled/>
                        </Form.Item>

                        <Form.Item label = '所在学校' {...formItemLayout}>
                            <Input placeholder={'上海交通大学附属小学'} disabled/>
                        </Form.Item>

                        <Form.Item label = '所在班级' {...formItemLayout}>
                            <Input placeholder={'一年级(3)班'} disabled/>
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
                                    placeholder='邮箱'
                                    addonBefore={<span className='iconfont icon-fenlei' style={focusItem === 3 ? styles.focus : {}}/>}/>
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
                                    placeholder='手机号'
                                    addonBefore={<span className='iconfont icon-fenlei' style={focusItem === 5 ? styles.focus : {}}/>}/>
                            )}
                        </Form.Item>
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

const styles = {
    focus: {
        width: '20px',
        opacity: 1
    },
}

export default PersonalCenter
