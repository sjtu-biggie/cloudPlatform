import React from 'react'
import {
    Card,
    Spin,
    Button,
    Radio,
    List,

    BackTop,
    Anchor,
    Affix,
    Icon,
    Form,
    Input,
    Menu,
    Dropdown, Row, Col
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'


const data3 = [];
for (let i = 0; i < 23; i++) {
    data3.push({
        course_name: `七年级数学 ${i}`,
        pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        start_date: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        end_date: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        nickname: "陈小红",
        id: 1,

        introduction: "这是一门有关数学的基础课程，讲述了和代数、函数有关的知识，是中学数学课程的重要组成部分"
    })
}
const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);

class CoursePageDemo extends React.Component {
    state = {
        //type indicate which content to render
        //parameter is detailed content of one type
        type: 1,
        parameter: 0,
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        course_name: "八年级数学"
    };

    componentDidMount() {

        this.setState({
            loading: true,
        });
        this.getData2();
        this.setState({
            loading: false
        });
        console.log(this.props.location.pathname);
        if (this.props.location.pathname === "/home/course/overall") {
            this.setState({type: 0});
            console.log(0);
        }
        if (this.props.location.pathname === "/home/course/ongoing") {
            this.setState({type: 1});
            console.log(1);
        }
        if (this.props.location.pathname === "/home/course/end") {
            this.setState({type: 2});
            console.log(2);
        }
    }

    getData2 = () => {
        this.setState({
            loadingMore: true
        });
        axios.get('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo').then(res => {
            this.setState({
                data2: this.state.data2.concat(res.data.results),
                loadingMore: false
            })
        })
    };
    syllabusRender = () => {

    };
    mainRender = () => {

    };
    bulletinRender = () => {

    };

    typeRender = () => {
        switch (this.state.type) {
            case 1:
                return this.mainRender();
            case 2:
                return this.syllabusRender();
            case 3:
                return this.bulletinRender();
            default:
                return "penis";
        }


    };

    render() {
        const {loadingMore} = this.state
        const loadMore = (
            <div style={styles.loadMore}>
                {/*不知道为什么这种写法有问题，会报错*/}
                {/*{loadingMore ? <Spin/> : <Button onClick={() => this.getData2()}>加载更多</Button>}*/}
                <Spin style={loadingMore ? {} : {display: 'none'}}/>
                <Button style={!loadingMore ? {} : {display: 'none'}} onClick={() => this.getData2()}>加载更多</Button>
            </div>
        );
        return (
            <div>
                <CustomBreadcrumb
                    arr={['课程', this.state.course_name]}/>
                <Card bordered={false} style={{marginBottom: '10px'}}>
                    <Menu mode="horizontal">
                        <Menu.Item onClick={() => {
                            this.setState({type: 1})
                        }}>主页</Menu.Item>
                        <Menu.Item onClick={() => {
                            this.setState({type: 2})
                        }}><Icon type="share-alt"/>大纲</Menu.Item>
                        <Menu.Item key="bulletin"><Icon type="appstore"/>公告</Menu.Item>
                        <Menu.SubMenu key='app' title={<span><Icon type='setting'/><span>作业</span></span>}>
                            <Menu.Item>总览</Menu.Item>
                            <Menu.Item>已提交</Menu.Item>
                            <Menu.Item>未提交</Menu.Item>
                            <Menu.Item>已截止</Menu.Item>
                            <Menu.Item>未截止</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key='exam' title={<span><Icon type='bar-chart'/><span>考试</span></span>}>
                            <Menu.Item>总览</Menu.Item>
                            <Menu.Item>进行中</Menu.Item>
                            <Menu.Item>已截止</Menu.Item>
                            <Menu.Item>已批改</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item key="rank"><Icon type="appstore"/>排名</Menu.Item>
                        <Menu.Item key="set" disabled><Icon type="setting"/>设置</Menu.Item>
                    </Menu>
                </Card>
                {this.typeRender()}

                <BackTop visibilityHeight={200} style={{right: 50}}/>
                {/*<Affix style={styles.affixBox}>*/}
                {/*  <Anchor offsetTop={200} affix={false}>*/}
                {/*    <Anchor.Link href='#howUse' title='课程搜索'/>*/}
                {/*    <Anchor.Link href='#basicUsage' title='课程列表'/>*/}
                {/*    <Anchor.Link href='#remoteLoading' title='公开课'/>*/}
                {/*  </Anchor>*/}
                {/*</Affix>*/}
            </div>
        )
    }
}

const styles = {
    haveBorder: {
        minHeight: 270,
        width: '80%',
        boxSizing: 'border-box'
    },
    noBorder: {
        minHeight: 270,
        width: '80%',
        padding: '0 24px',
        boxSizing: 'border-box',
        border: '1px solid #fff'
    },
    loadMore: {
        height: 32,
        marginTop: 16,
        lineHeight: '32px',
        textAlign: 'center',
    },
    listStyle: {
        width: '100%'
    },
    affixBox: {
        position: 'absolute',
        top: 200,
        right: 50,
        with: 170
    }
}

export default CoursePageDemo