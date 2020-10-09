import React from 'react'
import {
    Card,
    Spin,
    Button,
    Radio,
    List,
    Switch,
    Avatar,
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

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

const data3 = [];
for (let i = 0; i < 6; i++) {
    data3.push({
        type: '数学',
        course_name: `七年级数学 ${i}`,
        pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        start_date: '1999-10-12',
        end_date: '2020-10-10',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        nickname: "陈小红",
        id: 1,
        introduction: "这是一门有关数学的基础课程，讲述了和代数、函数有关的知识，是中学数学课程的重要组成部分"
    })
}
for (let i = 0; i < 6; i++) {
    data3.push({
        type: '语文',
        course_name: `七年级语文 ${i}`,
        pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        start_date: '1999-11-12',
        end_date: '2020-10-12',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        nickname: "陈小绿",
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

class CourseDemo extends React.Component {
    state = {
        role: 'teacher',
        courses: data3,
        displayCourses:null,
        type: 0,
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        deleteCourses:false,
    };
    changeSubject=(subject)=>{
        let modifiedList=[];
        let courseButton=document.getElementById("courseButton");
        if(subject==="所有"){
            this.setState({
                displayCourses:this.state.courses,
            });
            courseButton.innerText="学科";
            return null;
        }else{
            for(let course of this.state.courses){
                if(course.type===subject){
                    modifiedList.push(course);
                }
            }
        }
        courseButton.innerText=subject;
        this.setState({
            displayCourses:modifiedList,
        });
    };
    componentWillMount() {
        //TODO:get role from local storage
        this.setState({
            loading: true,
        });
        this.getData2();
        this.setState({
            displayCourses:this.state.courses,
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
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(123);
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
        })
    };
    render() {
        const menu1 = (
            <Menu onClick={(e)=>{this.changeSubject(e.item.props.children)}}>
                <Menu.SubMenu title="所有">
                    <Menu.Item>所有</Menu.Item>
                    <Menu.Item>语文</Menu.Item>
                    <Menu.Item >数学</Menu.Item>
                    <Menu.Item>英语</Menu.Item>
                    <Menu.Item >物理</Menu.Item>
                    <Menu.Item >化学</Menu.Item>
                    <Menu.Item>生物</Menu.Item>
                    <Menu.Item >历史</Menu.Item>
                    <Menu.Item >地理</Menu.Item>
                    <Menu.Item>政治</Menu.Item>
                    <Menu.Item >体育</Menu.Item>
                    <Menu.Item >心理</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="文科类">
                    <Menu.Item onClick={() => {
                    }}>语文</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>英语</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>历史</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>地理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>政治</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="理科类">
                    <Menu.Item onClick={() => {
                    }}>数学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>物理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>化学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>生物</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item>其它</Menu.Item>
            </Menu>
        );
        const menu2 = (
            <Menu>
                <Menu.Item title="所有">所有</Menu.Item>
                <Menu.SubMenu title="一年级">
                    <Menu.Item>一年级上</Menu.Item>
                    <Menu.Item>一年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="二年级">
                    <Menu.Item>二年级上</Menu.Item>
                    <Menu.Item>二年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="三年级">
                    <Menu.Item>三年级上</Menu.Item>
                    <Menu.Item>三年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="四年级">
                    <Menu.Item>四年级上</Menu.Item>
                    <Menu.Item>四年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="五年级">
                    <Menu.Item>五年级上</Menu.Item>
                    <Menu.Item>五年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="六年级">
                    <Menu.Item>六年级上</Menu.Item>
                    <Menu.Item>六年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="七年级">
                    <Menu.Item>七年级上</Menu.Item>
                    <Menu.Item>七年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="八年级">
                    <Menu.Item>八年级上</Menu.Item>
                    <Menu.Item>八年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="九年级">
                    <Menu.Item>九年级上</Menu.Item>
                    <Menu.Item>九年级下</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );
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
                    arr={['课程', this.state.type === 0 ? "所有课程" : this.state.type === 1 ? "正在进行" : "已结束"]}/>

                <Card bordered={false} style={{marginBottom: 10}} id="howUse">

                    <Form layout='horizontal' style={{width: '70%', float: 'left'}} onSubmit={this.handleSubmit}>
                        <Form.Item label='搜索'>
                            {
                                (
                                    <Input/>
                                )
                            }
                        </Form.Item>
                    </Form>
                    <Dropdown overlay={menu1} trigger={['click']} style={{marginTop: '30px'}}>
                        <Button style={{width: "10%", marginLeft: '30px'}}><span  id="courseButton">学科</span> <Icon type="down"/></Button>
                    </Dropdown>
                    <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft: '30px'}}>
                        <Button style={{width: "10%", marginTop: '42.5px', marginLeft: '30px'}}>年级<Icon
                            type="down"/></Button>
                    </Dropdown>
                </Card>
                {
                    this.state.role === 'student' ? null :
                        <Card bordered={false} style={{marginBottom: 10, height: '90px'}} id="howUse">
                            <Row/>
                            <Button style={{float: 'left'}} type="primary" icon="up-circle-o" size='large'
                                    onClick={() => {
                                        this.props.history.push('/home/course/addCourse');
                                    }}>创建一门新的课程</Button>

                            <Button style={{float: 'left', marginLeft: '20px'}} type="danger" icon="down-circle-o"
                                    size='large'>删除一门已有课程</Button>
                            <p style={{
                                float: 'left',
                                color: 'grey',
                                marginLeft: '40px',
                                height: '90px'
                            }}>各位老师，若要修改具体课程内容，请从下方进入课程主页!</p>
                        </Card>
                }
                <Card>
                    <span style={{float:'left'}}>课程列表</span>
                </Card>
                <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={this.state.displayCourses}
                          itemLayout='vertical'
                          pagination={{pageSize: 3}}
                          style={styles.listStyle}
                          renderItem={item => {
                              return (
                                  <List.Item style={{height: "210px"}}
                                             extra={<img width={172} height={170} alt="logo"
                                                         src={require('../../pic/math1.png')}
                                                         style={{border: '4px solid grey'}}/>}>
                                      <Row>
                                          <Col span={3} style={{fontSize:'15px'}}>

                                              <img width={120} height={120} alt="logo"
                                                   src={require('../../pic/teacher2.jpg')}
                                                   style={{}}/>
                                              <p style={{marginTop:'25px'}}>教师 ：{item.nickname}</p>
                                          </Col>
                                          <Col span={21}>
                                              <a style={{fontSize: '20px', fontWeight: 'bold', display: 'block'}}
                                                 href={"/home/course/class=" + item.id}>{item.course_name}</a>
                                              <p style={{marginTop: '10px', height: '90px'}}>{item.introduction}</p>
                                              <p style={{height: '10px'}}>
                                                  <span style={{marginRight:'30px',fontSize:15}}>类型： 数学</span><span style={{marginRight:'30px'}}>开始时间： {item.start_date} </span><span style={{marginRight:'30px'}}>结束时间： {item.end_date}</span></p>
                                          </Col>
                                      </Row>
                                  </List.Item>
                              )
                          }}
                    />
                </Card>

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

export default CourseDemo