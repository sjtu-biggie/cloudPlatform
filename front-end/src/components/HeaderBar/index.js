import React from 'react'
import {Icon, Badge, Dropdown, Menu, Modal, Button, message} from 'antd'
import { NotificationOutlined } from '@ant-design/icons';
import screenfull from 'screenfull'
import { inject, observer } from 'mobx-react'
import { Link, withRouter } from 'react-router-dom'
import { isAuthenticated } from '../../utils/Session'
import  axios from 'axios'
//withRouter一定要写在前面，不然路由变化不会反映到props中去
@withRouter @inject('appStore') @observer
class HeaderBar extends React.Component {
  state = {
    icon: 'arrows-alt',
    count: 0,
    visible: false,
    // avatar: require('./img/04.jpg')
    // avatar: window.localStorage.getItem("iconBase64")
    avatar:''
  };

  componentDidMount () {

    screenfull.onchange(() => {
      this.setState({
        icon: screenfull.isFullscreen ? 'shrink' : 'arrows-alt'
      })
    })
  }

  componentDidMount(){
    axios({
      url:'http://106.13.209.140:8000/getUserMessageAndIcon',
      method:'POST',
      data:{
        'username':window.localStorage.getItem("username")
      },
      headers: {
        withCredentials: true,
      }

    }).then(msg=>{
      console.log("拿到数据");
      console.log(msg);
      this.setState({avatar:msg.data.iconBase64});
    }).catch(err=>{
      console.log(err);
    })
  }

  getNoteInfo=async (username)=>{
    let config = {
      method: 'get',
      url: 'http://106.13.209.140:8787/course/getNoteByUser?userId='+username,
      headers: {
        withCredentials: true,
      }
    };
    return await axios(config)
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
  };

  getNote=()=>{
    let username=localStorage.getItem("username");
    console.log(username)
    this.getNoteInfo(username).then((res) => {
      if (res === null) {
        message.success("failure loading courses!");
        return;
      }
      for (let i = 0; i < res.length; ++i) {
        if(res[i].reading===false){
          this.setState({
            count:this.state.count+1
          })
        }
      }
      console.log(this.state.count)
    });
  }


  componentWillMount() {
    this.getNote()
  }

  componentWillUnmount () {
    screenfull.off('change')
  }

  toggle = () => {
    this.props.onToggle()
  };
  screenfullToggle = () => {
    if (screenfull.enabled) {
      screenfull.toggle()
    }
  }
  logout = () => {
    this.props.appStore.toggleLogin(false)
    this.props.history.push("/login")
  }

  render () {
    const {icon, count, visible, avatar} = this.state
    const {appStore, collapsed, location} = this.props
    const notLogin = (
      <div>
        <Link to={{pathname: '/login', state: {from: location}}} style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
        <img src={require('../../assets/img/defaultUser.jpg')} alt=""/>
      </div>
    )
    const menu = (
      <Menu className='menu'>
        <Menu.ItemGroup title='用户中心' className='menu-group'>
          <Menu.Item>你好 - {isAuthenticated()}</Menu.Item>
          <Menu.Item onClick={()=>{this.props.history.push("/home/personalcenter")}}>个人信息</Menu.Item>
          <Menu.Item><p onClick={this.logout}>退出登录</p></Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    )
    const login = (
      <Dropdown overlay={menu}>
        <img onClick={() => this.setState({visible: true})} src={avatar} alt=""/>
      </Dropdown>
    )
    return (
      <div id='headerbar'>
        <Icon
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          className='trigger'
          onClick={this.toggle}/>
        <div style={{lineHeight: '64px', float: 'right'}}>
          <ul className='header-ul'>
            <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
            <li onClick={() => {this.props.history.push('/home/notification')}}>
              <Badge count={this.state.count} style={{marginRight: -17}}>
                <NotificationOutlined />
              </Badge>
            </li>
            <li>
              {appStore.isLogin ? login : notLogin}
            </li>
          </ul>
        </div>
        <Modal
          footer={null} closable={false}
          visible={visible}
          wrapClassName="vertical-center-modal"
          onCancel={() => this.setState({visible: false})}>
          <img src={avatar} alt="" width='100%'/>
        </Modal>
      </div>
    )
  }
}

export default HeaderBar