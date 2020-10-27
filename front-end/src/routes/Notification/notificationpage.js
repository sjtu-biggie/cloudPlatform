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
    Dropdown, Row, Col, Collapse, Avatar, Pagination, Steps
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'


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
    introduction: "10/1的数学作业已发布，截止到第二天晚上",
};
const bulletin = [];
//TODO:add pagination support
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
class NotificationPage extends React.Component {
    state = {
        step:0,
        //type indicate which content to render
        //parameter is detailed content of one type
        type: 1,
        parameter: 0,
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        notification: deadCourse,
        bulletins: bulletin,
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
                            }}>{this.state.notification.title}</p>
                            <a  href={"/home/homework/commit"} style={{marginTop: '10px', height: '90px'}}>{this.state.notification.content}</a>
                            <p>{"发布时间："+this.state.notification.publishDate}</p>
                        </Col>

                    </Row>

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
                return /*this.rankRender()*/;
        }


    };

    format = (shijianchuo) => {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    };

    add0 = (m) => {
        return m < 10 ? '0' + m : m
    }

    getNote=async (notificationId)=>{
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8787/course/getNoteById?notificationId='+notificationId,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        hw.publishDate = this.format(hw.publishDate);
        this.setState({
            notification:hw,
        })
    };

    componentWillMount() {
        //TODO:get role from local storage
        this.setState({
            loading: true,
        });
        console.log(this.props.match.params)
        let notificationId = this.props.match.params[0].substr(1);
        console.log(notificationId);
        this.getNote(notificationId);
        this.setState({
            displayNotification:this.state.notification,
            loading: false
        });
    }


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
                    arr={['通知'+this.state.notification.notificationId]}/>
                {this.typeRender()}

                <BackTop visibilityHeight={200} style={{right: 50}}/>
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

export default NotificationPage