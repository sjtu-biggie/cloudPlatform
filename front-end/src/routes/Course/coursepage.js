import React from 'react'
import './courseCss.css'
import Shuffle from 'shufflejs'
import 'animate.css'
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
    Dropdown, Row, Col, Collapse, Avatar, Pagination, Steps
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import FormDemo1 from '../../routes/Homework/Assign';
import LoadableComponent from "../../utils/LoadableComponent";



class CoursePageDemo extends React.Component {
    state = {
        step: 0,
        //type indicate which content to render
        //parameter is detailed content of one type
        type: 1,
        parameter: 0,
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        course: deadCourse,
        bulletins: bulletin,
        role: 'teacher',
        addHomework:false,
        deleteHomework: false,
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
    homeworkRender = () => {
        //TODO:传参给FormDemo1
        return (
            <div>
                <Card bordered={false} style={{marginBottom: 10,height:'90px'}} id="howUse">
                    <Row/>
                    <Button style={{float:'left'}} type="primary" icon="up-circle-o" size='large' onClick={()=>{
                        this.setState({addHomework:true})
                    }}>创建新的一次作业</Button>

                    <Button style={{float:'left',marginLeft:'20px'}} type="danger" icon="down-circle-o" size='large'>删除现有一次作业</Button>
                    <Button style={{float:'left',marginLeft:'20px'}} type="dashed"  size='large' onClick={()=>{
                        this.setState({addHomework:false,deleteHomework:false,})
                    }}>返回</Button>
                </Card>
                {
                    this.state.addHomework?<FormDemo1 datas={this.state.type}/>:null
                }

            </div>
        )

    };
    mainRender = () => {
        return (
            <div>
                <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                    <Row style={{height: "200px"}}>
                        <Col span={18}>
                            <p style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                display: 'block'
                            }}>课程名 : {this.state.course.course_name}</p>
                            <p style={{marginTop: '10px', height: '90px'}}>{this.state.course.introduction}</p>
                            <p style={{height: '10px'}}>开始时间：{this.state.course.start_date} 结束时间：{this.state.course.end_date}</p>
                        </Col>
                        <Col span={6}>
                        </Col>
                    </Row>

                </Card>

                <Row style={{}}>
                    <Col span={5}>
                        <Card bordered={false} style={{marginBottom: 10, height: "300px"}} id="howUse">
                            <p style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                display: 'block'
                            }}>授课教师 : {this.state.course.nickname}</p>
                            <img alt="logo"
                                 src={require('../../pic/defaultAvatar.png')}
                                 style={{height: '190px', weight: '160px'}}/>
                        </Card>
                    </Col>
                    <Col span={19}>
                        <Card bordered={false} style={{marginBottom: 10, height: "300px", marginLeft: 10}} id="howUse">
                            <p style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                                display: 'block',
                                paddingRight: '50px'
                            }}>老师有话说 ：</p>
                            <p>
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                                这门课是个人都能会，这门课是个人都能会，这门课是个人都能会，
                            </p>
                        </Card>
                    </Col>
                </Row>
                <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                    <p style={{
                        fontSize: '20px',
                        fontWeight: 'bold',
                        display: 'block'
                    }}>课程大纲 :</p>
                    {this._renderSyllabus()}
                </Card>


            </div>

        )
    };
    _renderSyllabus = () => {
        let i = 1;
        let chapterList = [];
        while (1) {
            let str = 'this.state.course.syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            else {
                console.log(i);
            }
            chapterList.push(contents);
            ++i;
        }
        return (
            <Collapse defaultActiveKey={['1']}>{chapterList.map((value, index) => {
                return (<Collapse.Panel header={value.title} key={index}>
                    <List
                        bordered
                        dataSource={value.content}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    /></Collapse.Panel>)
            })}</Collapse>);
    };
    bulletinRender = () => {
        return (
            <div>
                <Collapse style={{marginBottom: "10px"}}
                          defaultActiveKey={['1']}>{this.state.bulletins.map((value, index) => {
                    return (<Collapse.Panel header={value.title} key={index}>
                        <p>{value.bulletin}</p>
                        <p>{value.publish_date}</p>
                    </Collapse.Panel>)
                })}</Collapse>
                <Pagination defaultCurrent={1} total={50}/>
            </div>);

    };
    examRender = () => {
        return null;
    };
    rankRender = () => {
        return (
            <div>
                <Card bordered={false} style={{marginBottom: 10}} id='gradeCard'>
                    <Row>
                        <Col span={10} offset={6}>

                            <Steps current={this.state.step} style={{marginTop: '200px', fontWeight: 'bold'}}
                                   size="large">
                                <Steps.Step title="提交作业" onClick={() => {
                                    this.setState({step: 0})
                                }} description="排名更准确"/>
                                <Steps.Step title="查看排名" onClick={() => {
                                    this.setState({step: 1})
                                }} description="胜败乃兵家常事"/>
                                <Steps.Step title="排名分析" onClick={() => {
                                    this.setState({step: 2})
                                }} description="知己知彼"/>
                            </Steps>

                        </Col>
                    </Row>
                </Card>

            </div>
        );
    };


    typeRender = () => {
        switch (this.state.type) {
            case 1:
                return this.mainRender();
            case 2:
                return this.bulletinRender();
            case 3:
                return this.homeworkRender();
            case 4:
                return this.examRender();
            default:
                return this.rankRender();
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
                    arr={['课程', this.state.course.course_name]}/>
                <Card bordered={false} style={{marginBottom: '10px'}}>
                    <Menu mode="horizontal" onSelect={()=>{this.setState({addHomework:false,deleteHomework:false})}}>
                        <Menu.Item onClick={() => {
                            this.setState({type: 1})
                        }}>主页</Menu.Item>
                        <Menu.Item key="bulletin" onClick={() => {
                            this.setState({type: 2})
                        }}><Icon type="appstore"/>公告</Menu.Item>
                        <Menu.SubMenu key='app' onClick={() => {
                            this.setState({type: 3})
                        }} title={<span><Icon type='setting'/><span>作业</span></span>}>
                            <Menu.Item>总览</Menu.Item>
                            <Menu.Item>已提交</Menu.Item>
                            <Menu.Item>未提交</Menu.Item>
                            <Menu.Item>已截止</Menu.Item>
                            <Menu.Item>未截止</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key='exam' onClick={() => {
                            this.setState({type: 4})
                        }} title={<span><Icon type='bar-chart'/><span>考试</span></span>}>
                            <Menu.Item>总览</Menu.Item>
                            <Menu.Item>进行中</Menu.Item>
                            <Menu.Item>已截止</Menu.Item>
                            <Menu.Item>已批改</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.Item onClick={() => {
                            this.setState({type: 5})
                        }} key="rank"><Icon type="appstore"/>排名</Menu.Item>
                        <Menu.Item onClick={() => {
                            this.setState({type: 6})
                        }} key="set" disabled><Icon type="setting"/>设置</Menu.Item>
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
};
const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);
const deadCourse = {
    course_name: `七年级数学`,
    pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    start_date: '1999-10-12',
    end_date: '2020-10-10',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    nickname: "陈小红",
    id: 1,
    textbook: "人教版七年级数学上册",
    introduction: "这是一门有关数学的基础课程，讲述了和代数、函数有关的知识，是中学数学课程的重要组成部分",
    syllabus: {
        chapter1: {
            title: "一百以内算术",
            content: [
                "加法",
                "减法", "乘法", "除法"
            ]
        },
        chapter2: {
            title: "微积分",
            content: [
                "微分",
                "积分", "偏微分"
            ]
        },
        chapter3: {
            title: "数学史",
            content: [
                "时间简史",
                "二战史",
                "线性代数史"
            ]
        },
        chapter4: {
            title: "提高篇",
            content: [
                "矩阵",
                "行列式",
                "特征向量",
                "正交矩阵",
                "正定矩阵"
            ]
        },
    }
};
const bulletin = [];
//TODO:add pagination support
for (let i = 0; i < 10; i++) {
    bulletin.push({
        title: '重要通知' + i + '号',
        bulletin: `值得注意的是，这五大创新技术，包括了全新的“4680”型电池，号称能量密度提高五倍，动力输出提高 6 倍，续航里程可提高 16%。
　　马斯克称，新电池已经开始在一家工厂生产，将需要一年时间达到 10 千兆瓦时的产能。
　　另外，早在今年 4 月，马斯克就表示，今年的电池日活动是“特斯拉历史上最让人兴奋的日子之一”，预计将于 2020 年投产一种新型电池，这种电池能够驱动特斯拉汽车行驶百万英里，是普通电池包寿命的2-3 倍。
　　据悉，这种电池是一种锂离子电池，是宁德时代与特斯拉合作生产的，可以使电动汽车持续行驶 100 万英里。马斯克曾在推特上表示，他将会在“电池技术日”活动上详细介绍一项百万英里电池项目。
　　但是，直到此次电池日活动结束，投资者高度期待的“百万英里电池”依然不见踪影。特斯拉股价也由上涨5% 转为下跌近7%。`,
        publish_date: '1999-10-12',
    })
}
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    }];

export default CoursePageDemo