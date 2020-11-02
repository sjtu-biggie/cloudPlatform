import React from 'react'
import {
    Card,
    Spin,
    Button,
    Radio,
    List,
    Switch,
    Avatar,
    Menu,
    BackTop,
    Input,
    Anchor,
    Form,
    Affix,
    Icon,
    Dropdown,
    message
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import TypingCard from '../../components/TypingCard'

const data3 = [];
for (let i = 0; i < 23; i++) {
    data3.push({
        type:"数学",
        id:1,
        title: `【通知】七年级数学作业`,
        avatar: '../../pic/math1.png',
        description: '10/1的作业已发布，截止到第二天晚上',
        time: `2020/9/27`,
        /*        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',*/
    })
}

for (let i = 0; i < 6; i++) {
    data3.push({
        type: '语文',
        title: `【通知】七年级语文作业`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        id: 1,
        description: "10/1的作业已发布，截止到第二天晚上"
    })
}

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Notification extends React.Component {
    state = {
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        notification:data3,
        displayNotification:null,
        count:0,
    }

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

    searchFun=()=>{
        let value = document.getElementById("search").value;
        let modifiedList=this.state.notification.filter(function(item){
            return (item.title.indexOf(value)  !== -1)|| item.description.indexOf(value) !==-1;
        });
        this.setState({
            displayNotification:modifiedList,
        });
    };

    changeSubject=(subject)=>{
        let modifiedList=[];
        let courseButton=document.getElementById("courseButton");
        if(subject==="所有"){
            this.setState({
                displayNotification:this.state.notification,
            });
            courseButton.innerText="学科";
            return null;
        }else{
            for(let notification of this.state.notification){
                if(notification.type===subject){
                    modifiedList.push(notification);
                }
            }
        }
        courseButton.innerText=subject;
        this.setState({
            displayNotification:modifiedList,
        });
    };

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

    postReading=async(item)=>{
        const obj={
            id:item.notificationId,
            reading: true,
            receiverId:item.receiverId,
            senderId:item.senderId,
            title:item.title,
            publishDate:item.publishDate,
            content:item.content,
        }
        console.log(obj);
        let config = {
            method: 'post',
            data:obj,
            url: 'http://106.13.209.140:8787/course/addNote',
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
    }

    getNote=()=>{
        let username=localStorage.getItem("username");
        console.log(username)
        this.getNoteInfo(username).then((res) => {
            if (res === null) {
                message.success("failure loading courses!");
                return;
            }
            for (let i = 0; i < res.length; ++i) {
                res[i].publishDate = this.format(res[i].publishDate);
                if(res[i].reading===false){
                    this.setState({
                        count:this.state.count+1
                    })
                }
            }
            console.log(this.state.count)
            this.setState({
                notification: res,
                displayNotification: res
            });
        });
    }

    componentWillMount() {
        //TODO:get role from local storage
        this.setState({
            loading: true,
        });
        this.getData2();
        this.getNote();
        this.setState({
            displayNotification:this.state.notification,
            loading: false
        });
    }

    getData2 = () => {
        this.setState({
            loadingMore: true
        })
        axios.get('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo').then(res => {
            this.setState({
                data2: this.state.data2.concat(res.data.results),
                loadingMore: false
            })
        })
    }

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
        )
        const { SubMenu } = Menu;
        const menu2 = (
            <Menu onClick={this.handleMenuClick}>
                <SubMenu title="一年级">
                    <Menu.Item key="10">一年级上</Menu.Item>
                    <Menu.Item key="11">一年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="二年级">
                    <Menu.Item key="12">二年级上</Menu.Item>
                    <Menu.Item key="13">二年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="三年级">
                    <Menu.Item key="14">三年级上</Menu.Item>
                    <Menu.Item key="15">三年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="四年级">
                    <Menu.Item key="16">四年级上</Menu.Item>
                    <Menu.Item key="17">四年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="五年级">
                    <Menu.Item key="18">五年级上</Menu.Item>
                    <Menu.Item key="19">五年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="六年级">
                    <Menu.Item key="20">六年级上</Menu.Item>
                    <Menu.Item key="21">六年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="七年级">
                    <Menu.Item ke y="22">七年级上</Menu.Item>
                    <Menu.Item key="23">七年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="八年级">
                    <Menu.Item key="24">八年级上</Menu.Item>
                    <Menu.Item key="25">八年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="九年级">
                    <Menu.Item key="26">九年级上</Menu.Item>
                    <Menu.Item key="27">九年级下</Menu.Item>
                </SubMenu>
            </Menu>
        )
        const {size, bordered, loading, data2, loadingMore} = this.state
        const loadMore = (
            <div style={styles.loadMore}>
                {/*不知道为什么这种写法有问题，会报错*/}
                {/*{loadingMore ? <Spin/> : <Button onClick={() => this.getData2()}>加载更多</Button>}*/}
                <Spin style={loadingMore?{}:{display:'none'}}/>
                <Button style={!loadingMore?{}:{display:'none'}} onClick={() => this.getData2()}>加载更多</Button>
            </div>
        )
        return (
            <div>
                <CustomBreadcrumb arr={['通知']}/>
                <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                    <Form layout='horizontal' style={{width: '70%',float:'left'}} onSubmit={this.handleSubmit}>
                        <Form.Item label='搜索' >
                            {
                                (
                                    <Input id="search" onKeyUp={(e)=>{this.searchFun()}}  />
                                )
                            }
                        </Form.Item>
                    </Form>
                    <Dropdown overlay={menu1} trigger={['click']} style={{ marginTop: '30px'}}>
                        <Button id="courseButton" style={{width:"10%",marginLeft:'30px'}}>学科 <Icon type="down"/></Button>
                    </Dropdown>
                    <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft:'30px'}}>
                        <Button style={{width:"10%",marginTop:'42.5px',marginLeft:'30px'}}>年级<Icon type="down"/></Button>
                    </Dropdown>
                </Card>

                <Card bordered={false} title='通知' style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={this.state.displayNotification}
                          /*itemLayout='vertical'*/
                          pagination={{pageSize: 10}}
                          style={styles.listStyle}
                          renderItem={item=>{
                              return (
                                  <List.Item  actions={item.reading===false?["未读   | 发布时间："+item.publishDate]:["已读   | 发布时间："+item.publishDate]}
                                      /*actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}*/
                                       >
                                      <List.Item.Meta
                                          avatar={<Avatar src={require("../../pic/math1.png")} />}
                                          title={<a onClick={()=>{this.postReading(item)}} href={"/home/notification/page="+item.notificationId}>{item.title}</a>}
                                          description={item.content}>
                                      <row>

                                          <p style={{fontSize:'5px',fontWeight:'bold',display:'block'}}>{item.publishDate}</p>
                                          <p style={{marginTop:'10px'}}>{item.content}</p>
                                      </row>
                                      </List.Item.Meta>
                                  </List.Item>
                              )
                          }}
                    />
                </Card>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const styles = {
    haveBorder: {
        minHeight: 270,
        width:'80%',
        boxSizing: 'border-box'
    },
    noBorder: {
        minHeight: 270,
        width:'80%',
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
    listStyle:{
        width:'100%'
    },
    affixBox:{
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}

export default Notification