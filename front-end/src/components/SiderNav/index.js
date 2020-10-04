import React from 'react'
import CustomMenu from "../CustomMenu/index";


class SiderNav extends React.Component {
    state = {
        menus: null,
        role: "student"
    };

    componentDidMount() {
        //TODO:get role of user from local storage
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
                        {key: '/home/homework/overall', title: '总览', icon: ''},
                        {key: '/home/homework/submitted', title: this.state.role === 'student' ? '已交' : '已收齐', icon: ''},
                        {key: '/home/homework/uncommitted', title: this.state.role === 'student' ? '未交' : '未收齐', icon: ''},
                        {key: '/home/homework/closed', title: '已截止', icon: ''},
                        {key: '/home/homework/notclosed', title: '未截止', icon: ''},
                        {key: '/home/homework/general', title: '提交情况', icon: ''},
                    ]
                },
                this.state.role === 'student' ?
                    {
                        title: '错题',
                        icon: 'info-circle-o',
                        key: '/home/mistakes'
                    } :
                    {
                        title: '管理',
                        icon: 'info-circle-o',
                        key: '/home/manage',
                    subs:[
                        {key: '/home/manage/studentTable', title: '学生管理', icon: ''},
                    ]

                    },
                {
                    title: '展示组件',
                    icon: 'desktop',
                    key: '/home/display',
                    subs: [
                        {key: '/home/display/carousel', title: '走马灯', icon: ''},
                        {key: '/home/display/collapse', title: '下拉组件', icon: ''},
                        {key: '/home/display/list', title: '列表', icon: ''},
                        {key: '/home/display/table', title: '表格', icon: ''},
                        /*{key: '/home/display/tabs', title: '标签页', icon: '',},*/
                    ]
                },
                {
                    title: '按钮',
                    icon: 'laptop',
                    key: '/home/general',
                    subs: [
                        {key: '/home/general/button', title: '正在进行', icon: '',},
                        {key: '/home/general/icon', title: '已结束', icon: '',},
                    ]
                },
                {
                    title: '导航组件',
                    icon: 'bars',
                    key: '/home/navigation',
                    subs: [
                        {key: '/home/navigation/dropdown', title: '下拉菜单', icon: ''},
                        {key: '/home/navigation/menu', title: '导航菜单', icon: ''},
                        {key: '/home/navigation/steps', title: '步骤条', icon: ''},
                    ]
                },

                {

                    title: '输入组件',
                    icon: 'edit',
                    key: '/home/entry',
                    subs: [
                        {
                            key: '/home/entry/form',
                            title: '表单',
                            icon: '',
                            subs: [
                                {key: '/home/entry/form/basic-form', title: '基础表单', icon: ''},
                                {key: '/home/entry/form/step-form', title: '分步表单', icon: ''}
                            ]
                        },
                        {key: '/home/entry/upload', title: '上传', icon: ''},
                    ]

                },
                {
                    title: '反馈组件',
                    icon: 'message',
                    key: '/home/feedback',
                    subs: [
                        {key: '/home/feedback/modal', title: '对话框', icon: '',},
                        {key: '/home/feedback/notification', title: '通知提醒框', icon: ''},
                        {key: '/home/feedback/spin', title: '加载中', icon: '',}
                    ]
                },
                {
                    title: '其它',
                    icon: 'bulb',
                    key: '/home/other',
                    subs: [
                        {key: '/home/other/animation', title: '动画', icon: '',},
                        {key: '/home/other/gallery', title: '画廊', icon: '',},
                        {key: '/home/other/draft', title: '富文本', icon: ''},
                        {key: '/home/other/chart', title: '图表', icon: ''},
                        {key: '/home/other/loading', title: '加载动画', icon: ''},
                        {key: '/home/other/404', title: '404', icon: ''},
                        {key: '/home/other/springText', title: '弹性文字', icon: ''},
                    ]

                }

            ]
        })
    }

    render() {

        return (
            <div style={{height: '100vh', overflowY: 'scroll'}}>
                <div style={styles.logo}><p
                    style={{margin: '10px 0', fontSize: '20px', fontWeight: 'bold', color: 'navajowhite'}}>学易 ·
                    云作业平台</p></div>
                <CustomMenu menus={this.state.menus}/>
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
