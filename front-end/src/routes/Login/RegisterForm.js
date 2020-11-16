import React from 'react'
import axios from 'axios'
import  { Card,Form, Input, message,Row,Col,Button } from 'antd'
import { inject, observer } from 'mobx-react/index'
import { calculateWidth } from '../../utils/utils'
import PromptBox from '../../components/PromptBox'
import {values} from "mobx";
import input from "eslint-plugin-jsx-a11y/lib/util/implicitRoles/input";


@inject('appStore') @observer @Form.create()
class RegisterForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      focusItem: -1,
      isPhone:false,
      to:'',
      count:0,
      display:true,

    };
  }

  handleGetTo=(event)=>{

    this.setState({
      to:event.target.value,
      focusItem:-1
    })
  };

  countDown=()=>{
    const {count} =this.state;
    console.log("开始计时现在时间为"+count);
    let buttonMsg=document.getElementById("code");
    if(count<=0){
      buttonMsg.innerText="发送验证码";
      window.localStorage.setItem("veriCode",null);
      return ;
    }else{
      buttonMsg.innerText=count-1+"s"
      this.setState({
        count:count-1,
      })
    };
    setTimeout(this.countDown,1000);
  }

  sendVeriCode=()=>{
    let tools=this.state.isPhone?"手机号":"邮箱";
    console.log(this.state.to);
    if(this.state.to===''){
      message.info("请输入"+tools);
      return;
    }
    console.log("开始发送验证码");
    var url=this.state.isPhone?'http://106.13.209.140:8000/sendMessage':'http://106.13.209.140:8000/sendEmail';
    axios({
      method:'POST',
      url:url,
      params:{
        to:this.state.to,
      }
    }).then(msg=>{
      console.log(msg.data);
      message.info("验证码已发送,请在五分钟之内输入");
      window.localStorage.setItem("veriCode",msg.data);
      this.setState({
        count:301
      })
      this.countDown();
    }).catch(err=>{
      console.log(err);
    })
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
        // if (values.===window.localStorage.getItem("veriCode")){  }

          // console.log(values.registerVeriCode)
        if (values.registerVeriCode!==window.localStorage.getItem("veriCode")){
          alert("验证码错误");
          return null;
        }
        if(this.state.to!==values.registerEmail&&this.state.to!==values.registerPhoneNumber)
        {
          alert("现在邮箱或者手机与发送验证码的不一致");
          return null;
        }
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
        <div style={{height:'40px'}}>
        <Row>
          <Col span={24}>
          <h3 style={{textAlign:'center'}} className='title'>注册页面</h3>
          </Col>
        </Row>
        </div>
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
                onFocus={() =>
                {this.setState({focusItem: 1})}}
                onBlur={() => {this.setState({focusItem: -1})}}
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
                  onPaste={(e)=>{e.preventDefault()}}
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
                    value={this.state.to}
                    onFocus={() => this.setState({focusItem: 3})}
                    onBlur={this.handleGetTo
                      // this.setState({focusItem: -1});
                    }
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
                    value={this.state.to}
                    onFocus={() => this.setState({focusItem: 5})}
                    onBlur={this.handleGetTo}
                    maxLength={16}
                    placeholder='手机号'
                    addonBefore={<span className='iconfont icon-fenlei' style={focusItem === 5 ? styles.focus : {}}/>}/>
            )}
          </Form.Item>}

          <Form.Item help={getFieldError('registerVeriCode') && <PromptBox info={getFieldError('registerVeriCode')}
                                                                              width={calculateWidth(getFieldError('registerVeriCode'))}/>}>
            {getFieldDecorator('registerVeriCode', {
              validateFirst: true,
              rules: [
                {required: true, message: '请输入验证码'},
                {pattern: '^[^ ]+$', message: '不能输入空格'},
              ]
            })(
                <Row>
                  <Col span={16}>
                    <Input
                        onFocus={() => this.setState({focusItem: 5})}
                        onBlur={() => this.setState({focusItem: -1})}
                        maxLength={16}
                        placeholder='验证码'
                        addonBefore={<span className='iconfont icon-fenlei' style={focusItem === 5 ? styles.focus : {}}/>}/>
                  </Col>
                  <Col span={8}>
                    <Button type={'primary'} id="code" onClick={()=>{this.sendVeriCode()}} style={{width:'110px',textAlign:'center'}} disabled={this.state.count!==0} >发送验证码</Button>
                  </Col>

                </Row>
            )}
          </Form.Item>


            <Row className="bottom">
              <Col offset={1} span={8}>
                <input className='registerBtn' type="submit" value='注册'/>
              </Col>
              <Col span={8}>
                <span className='registerBtn' onClick={()=>this.setState({isPhone:!this.state.isPhone})}>{this.state.isPhone===false?"手机注册":"邮箱注册"}</span>
              </Col>
              <Col  span={7}>
                <span className='registerBtn' style={{textAlign:'center'}} onClick={this.gobackLogin}>返回登录</span>
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
