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
const menu1 = (
    <Menu>
        <Menu.SubMenu title="所有">
            <Menu.Item onClick={() => {
            }}>语文</Menu.Item>
            <Menu.Item onClick={() => {
            }}>数学</Menu.Item>
            <Menu.Item onClick={() => {
            }}>英语</Menu.Item>
            <Menu.Item onClick={() => {
            }}>物理</Menu.Item>
            <Menu.Item onClick={() => {
            }}>化学</Menu.Item>
            <Menu.Item onClick={() => {
            }}>生物</Menu.Item>
            <Menu.Item onClick={() => {
            }}>历史</Menu.Item>
            <Menu.Item onClick={() => {
            }}>地理</Menu.Item>
            <Menu.Item onClick={() => {
            }}>政治</Menu.Item>
            <Menu.Item onClick={() => {
            }}>体育</Menu.Item>
            <Menu.Item onClick={() => {
            }}>心理</Menu.Item>
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
    </Menu>
);
const data3 = [];
for (let i = 0; i < 23; i++) {
    data3.push({
        course_name: `七年级数学 ${i}`,
        pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        start_date: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        end_date: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        nickname: "陈小红",
        id:1,
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
        type: 0,
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
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
                        <Button style={{width: "10%", marginLeft: '30px'}}>学科 <Icon type="down"/></Button>
                    </Dropdown>
                    <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft: '30px'}}>
                        <Button style={{width: "10%", marginTop: '42.5px', marginLeft: '30px'}}>年级<Icon
                            type="down"/></Button>
                    </Dropdown>
                </Card>

                <Card bordered={false} title='课程列表' style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={data3}
                          itemLayout='vertical'
                          pagination={{pageSize: 5}}
                          style={styles.listStyle}
                          renderItem={item => {
                              return (
                                  <List.Item
                                      extra={<img width={272} height={190} alt="logo"
                                                  src={require('../../pic/math1.png')}
                                                  style={{border: '4px solid grey'}}/>}>
                                      <Row>
                                          <Col span={5}>
                                              <p>教师 ：{item.nickname}</p>
                                              <img width={80} height={100} alt="logo"
                                                   src={require('../../pic/defaultAvatar.png')}
                                                   style={{}}/>
                                          </Col>
                                          <Col span={19}>
                                              <a style={{fontSize:'20px',fontWeight:'bold',display:'block'}} href={"/home/course/class="+item.id}>{item.course_name}</a>
                                              <p style={{marginTop:'10px'}}>{item.introduction}</p>
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
}

export default CourseDemo