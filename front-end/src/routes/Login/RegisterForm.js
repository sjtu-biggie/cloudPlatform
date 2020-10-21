import React from 'react'
import axios from 'axios'
import { Form, Input, message,Row,Col } from 'antd'
import { inject, observer } from 'mobx-react/index'
import { calculateWidth } from '../../utils/utils'
import PromptBox from '../../components/PromptBox'


@inject('appStore') @observer @Form.create()
class RegisterForm extends React.Component {
  state = {
    focusItem: -1,
    isPhone:false,
  };
  registerSubmit = async (e) => {
    e.preventDefault();
    this.setState({
      focusItem: -1
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // const users = this.props.appStore.users;
        // // 检测用户名是否存在
        // const result = users.find(item => item.username === values.registerUsername);
        // if (result) {
        //   this.props.form.setFields({
        //     registerUsername: {
        //       value: values.registerUsername,
        //       errors: [new Error('用户名已存在')]
        //     }
        //   });
        //   return
        // }
        const obj =  {
          username: values.registerUsername,
          password: values.registerPassword,
          sid:values.registerStudentNumber,
          email:values.registerEmail,
          telephone:values.registerPhoneNumber,
        };
        this.register(obj);
      }
    })
  };
  register = async (obj) => {
    let config = {
      method: 'post',
      data: obj,
      url: 'http://106.13.209.140:8000/register',
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
    if (message1==='注册成功') {
      message.success('注册成功',5);
      this.gobackLogin();
    }else{
      message.error(message1);
    }
  };
  gobackLogin = () => {
    let storage = window.localStorage;
    let tt = storage.getItem("user");
    console.log(tt);
    this.props.switchShowBox('login');
    setTimeout(() => this.props.form.resetFields(), 500);
  };

  render () {
    const {getFieldDecorator, getFieldError, getFieldValue} = this.props.form;
    const {focusItem} = this.state;

    return (
      <div  className={this.props.className}>
        <h3 className='title'>注册</h3>
        <Form onSubmit={this.registerSubmit}>
          <Form.Item help={getFieldError('registerUsername') && <PromptBox info={getFieldError('registerUsername')}
                                                                           width={calculateWidth(getFieldError('registerUsername'))}/>}>
            {getFieldDecorator('registerUsername', {
              validateFirst: true,
              rules: [
                {required: true, message: '用户名不能为空'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 0})}
                onBlur={() => this.setState({focusItem: -1})}
                maxLength={16}
                placeholder='用户名'
                addonBefore={<span className='iconfont icon-User' style={focusItem === 0 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>

          <Form.Item help={getFieldError('registerStudentNumber') && <PromptBox info={getFieldError('registerStudentNumber')}
                                                                           width={calculateWidth(getFieldError('registerStudentNumber'))}/>}>
            {getFieldDecorator('registerStudentNumber', {
              validateFirst: true,
              rules: [
                {required: true, message: '学号不能为空'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
                <Input
                    onFocus={() => this.setState({focusItem: 4})}
                    onBlur={() => this.setState({focusItem: -1})}
                    maxLength={16}
                    placeholder='学号'
                    addonBefore={<span className='iconfont icon-fenlei' style={focusItem === 4 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>

          <Form.Item help={getFieldError('registerPassword') && <PromptBox info={getFieldError('registerPassword')}
                                                                           width={calculateWidth(getFieldError('registerPassword'))}/>}>
            {getFieldDecorator('registerPassword', {
              validateFirst: true,
              rules: [
                {required: true, message: '密码不能为空'},
                {pattern: '^[^ ]+$', message: '密码不能有空格'}
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 1})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 1 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          <Form.Item help={getFieldError('confirmPassword') && <PromptBox info={getFieldError('confirmPassword')}
                                                                          width={calculateWidth(getFieldError('confirmPassword'))}/>}>
            {getFieldDecorator('confirmPassword', {
              validateFirst: true,
              rules: [
                {required: true, message: '请确认密码'},
                {
                  validator: (rule, value, callback) => {
                    if (value && value !== getFieldValue('registerPassword')) {
                      callback('两次输入不一致！')
                    }
                    callback()
                  }
                },
              ]
            })(
              <Input
                onFocus={() => this.setState({focusItem: 2})}
                onBlur={() => this.setState({focusItem: -1})}
                type='password'
                maxLength={16}
                placeholder='确认密码'
                addonBefore={<span className='iconfont icon-suo1' style={focusItem === 2 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
          {this.state.isPhone===false?
          <Form.Item help={getFieldError('registerEmail') && <PromptBox info={getFieldError('registerEmail')}
                                                                           width={calculateWidth(getFieldError('registerEmail'))}/>}>
            {getFieldDecorator('registerEmail', {
              validateFirst: true,
              rules: [
                {required: true, message: '邮箱不能为空'},
                {pattern: '^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$', message: '错误的邮箱格式'},
              ]
            })(
                <Input
                    onFocus={() => this.setState({focusItem: 3})}
                    onBlur={() => this.setState({focusItem: -1})}
                    maxLength={20}
                    placeholder='邮箱'
                    addonBefore={<span className='iconfont icon-fenlei' style={focusItem === 3 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>
:
          <Form.Item help={getFieldError('registerPhoneNumber') && <PromptBox info={getFieldError('registerPhoneNumber')}
                                                                           width={calculateWidth(getFieldError('registerPhoneNumber'))}/>}>
            {getFieldDecorator('registerPhoneNumber', {
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
          </Form.Item>}


            <Row className="bottom">
              <Col span={12}>
                <input className='loginBtn' type="submit" value='注册'/>
              </Col>
              <Col span={6}>
                <span className='registerBtn' onClick={()=>this.setState({isPhone:!this.state.isPhone})}>{this.state.isPhone===false?"手机注册":"邮箱注册"}</span>
              </Col>
              <Col span={6}>
                <span className='registerBtn' onClick={this.gobackLogin}>返回登录</span>
              </Col>
            </Row>
        </Form>
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

export default RegisterForm
