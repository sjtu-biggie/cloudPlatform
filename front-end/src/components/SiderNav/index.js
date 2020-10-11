import React from 'react'
import CustomMenu from "../CustomMenu/index";
import {Row} from "antd";
import axios from "axios";



class SiderNav extends React.Component {
    state = {
        menus: null,
        role: "student"
    };
    componentWillMount() {
        this.getData2();
    }
    getData2 = () => {
        this.setState({
            loadingMore: true
        });
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
    };
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
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(user);
        this.setState({
            userInfo:user,
            role:user.type
        });
        if(this.state.role==='student'){
            this.setState({
                menus: [
                    {
                        title: '首页',
                        icon: 'home',
                        key: '/home'
                    },
                    {
                        title: '课程',
                        icon: 'laptop',
                        key: '/home/course',
                        subs: [
                            {key: '/home/course/overall', title: '所有课程', icon: '',},
                            {
                                key: '/home/course/ongoing',
                                title: this.state.role === 'student' ? '正在进行' : '正在授课',
                                icon: '',
                            },
                            {key: '/home/course/end', title: '已结束', icon: '',},
                        ]
                    },
                    {
                        title: '作业',
                        icon: 'desktop',
                        key: '/home/homework',
                        subs: [
                            {key: '/home/homework/overall', title: '所有作业', icon: ''},
                            {key: '/home/homework/submitted', title: this.state.role === 'student' ? '已交' : '已收齐', icon: ''},
                            {key: '/home/homework/uncommitted', title: this.state.role === 'student' ? '未交' : '未收齐', icon: ''},
                            {key: '/home/homework/closed', title: '已截止', icon: ''},
                            {key: '/home/homework/notclosed', title: '未截止', icon: ''},
                        ]
                    },
                    {
                        title: '错题',
                        icon: 'info-circle-o',
                        key: '/home/mistakes'
                    },
                    {
                        title: '帮助',
                        icon: 'file-unknown',
                        key: '/home/display/list'
                    }
                ]
            })
            return;
        }
        if(this.state.role==='manager'){
            this.setState({
                menus: [
                    {
                        title: '首页',
                        icon: 'home',
                        key: '/home'
                    },
                    {
                        title: '用户管理',
                        icon: 'solution',
                        key: '/home/manage/manager'
                    },
                    {
                        title: '帮助',
                        icon: 'file-unknown',
                        key: '/home/display/list'
                    }
                ]
            });
            return;
        }
        if(this.state.role==='teacher'){
            this.setState({
                menus: [
                    {
                        title: '首页',
                        icon: 'home',
                        key: '/home'
                    },
                    {
                        title: '课程',
                        icon: 'laptop',
                        key: '/home/course',
                        subs: [
                            {key: '/home/course/overall', title: '所有课程', icon: '',},
                            {
                                key: '/home/course/ongoing',
                                title: this.state.role === 'student' ? '正在进行' : '正在授课',
                                icon: '',
                            },
                            {key: '/home/course/end', title: '已结束', icon: '',},
                        ]
                    },
                    {
                        title: '作业',
                        icon: 'desktop',
                        key: '/home/homework',
                        subs: [
                            {key: '/home/homework/overall', title: '所有作业', icon: ''},
                            {key: '/home/homework/submitted', title: this.state.role === 'student' ? '已交' : '已收齐', icon: ''},
                            {key: '/home/homework/uncommitted', title: this.state.role === 'student' ? '未交' : '未收齐', icon: ''},
                            {key: '/home/homework/closed', title: '已截止', icon: ''},
                            {key: '/home/homework/notclosed', title: '未截止', icon: ''},
                        ]
                    },
                    {
                        title: '班级',
                        icon: 'info-circle-o',
                        key: '/home/mistakes'
                    },
                    {
                        title: '帮助',
                        icon: 'file-unknown',
                        key: '/home/display/list'
                    }
                ]
            })
            return;
        }
        this.setState({
            menus: [
                {
                    title: '首页',
                    icon: 'home',
                    key: '/home'
                },
                {
                    title: '帮助',
                    icon: 'file-unknown',
                    key: '/home/display/list'
                }
            ]
        })
    };
    componentDidMount() {
        //TODO:get role of user from local storage

    }
    // {
    //     title: '展示组件',
    //     icon: 'desktop',
    //     key: '/home/display',
    //     subs: [
    //         {key: '/home/display/carousel', title: '走马灯', icon: ''},
    //         {key: '/home/display/collapse', title: '下拉组件', icon: ''},
    //         {key: '/home/display/list', title: '列表', icon: ''},
    //         {key: '/home/display/table', title: '表格', icon: ''},
    //         /*{key: '/home/display/tabs', title: '标签页', icon: '',},*/
    //     ]
    // },
    // {
    //     title: '按钮',
    //     icon: 'laptop',
    //     key: '/home/general',
    //     subs: [
    //         {key: '/home/general/button', title: '正在进行', icon: '',},
    //         {key: '/home/general/icon', title: '已结束', icon: '',},
    //     ]
    // },
    // {
    //     title: '导航组件',
    //     icon: 'bars',
    //     key: '/home/navigation',
    //     subs: [
    //         {key: '/home/navigation/dropdown', title: '下拉菜单', icon: ''},
    //         {key: '/home/navigation/menu', title: '导航菜单', icon: ''},
    //         {key: '/home/navigation/steps', title: '步骤条', icon: ''},
    //     ]
    // },
    //
    // {
    //
    //     title: '输入组件',
    //     icon: 'edit',
    //     key: '/home/entry',
    //     subs: [
    //         {
    //             key: '/home/entry/form',
    //             title: '表单',
    //             icon: '',
    //             subs: [
    //                 {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
    //                 {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
    //             ]
    //         },
    //         {key: '/home/entry/upload', title: '上传', icon: ''},
    //     ]
    //
    // },
    // {
    //     title: '反馈组件',
    //     icon: 'message',
    //     key: '/home/feedback',
    //     subs: [
    //         {key: '/home/feedback/modal', title: '对话框', icon: '',},
    //         {key: '/home/feedback/notification', title: '通知提醒框', icon: ''},
    //         {key: '/home/feedback/spin', title: '加载中', icon: '',}
    //     ]
    // },
    // {
    //     title: '其它',
    //     icon: 'bulb',
    //     key: '/home/other',
    //     subs: [
    //         {key: '/home/other/animation', title: '动画', icon: '',},
    //         {key: '/home/other/gallery', title: '画廊', icon: '',},
    //         {key: '/home/other/draft', title: '富文本', icon: ''},
    //         {key: '/home/other/chart', title: '图表', icon: ''},
    //         {key: '/home/other/loading', title: '加载动画', icon: ''},
    //         {key: '/home/other/404', title: '404', icon: ''},
    //         {key: '/home/other/springText', title: '弹性文字', icon: ''},
    //     ]
    //
    // }

    render() {

        return (
            <div style={{height: '100vh', overflowY: 'scroll'}}>
                <div style={{}}>

                    <div style={styles.logo}><p
                style={{margin: '10px 0', fontSize: '20px', fontWeight: 'bold', color: 'navajowhite'}}>学易 ·
                云作业平台</p></div>

                <div><p
                    style={{marginLeft: '65px', fontSize: '18px', color: 'white'}}>{this.state.role==='student'?'学生用户':this.state.role==='teacher'?'教师用户':this.state.role==='teacher'?'管理员用户':'未认证用户'}</p></div>
                </div>
                <img style={{marginLeft:'20px'}} width={160} src={require('../../pic/sjtulogored.png')}/>
<div style={{marginTop:'30px'}}/>
                <CustomMenu  menus={this.state.menus}/>

            </div>
        )
    }
}

const styles = {
    logo: {
        height: '32px',

        margin: '16px'
    }
};

export default SiderNav
