import React from 'react'
import {Card, Spin, Button,Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Form, Dropdown, Input, Menu} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'

import HomeworkList from './HomeworkList'
const { Search } = Input;

const deathHomework = [];
for(let i=0;i<3;i++){
    deathHomework.push({
        type:'数学',
        grade:'七年级上',
        title: `七年级上数学作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'语文',
        grade:'七年级上',
        title: `七年级上语文作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'英语',
        grade:'七年级上',
        title: `七年级上英语作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'英语',
        grade:'八年级上',
        title: `八年级上英语作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'英语',
        grade:'八年级上',
        title: `八年级下英语作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}


class HomeworkDemo extends React.Component {
    state = {
        type:0,
        size: 'default',
        bordered: true,
        homework: deathHomework,
        displayHomework: null,
        gradeHomework: null,
        subjectHomework: null,
        userInfo: null,
        role: null
    };

    searchFun=(value)=>{
        let modifiedList = this.state.homework.filter(function(item){
            return (item.title.indexOf(value)  !== -1) || (item.content.indexOf(value) !==-1);
        });
        this.setState({
            displayHomework:modifiedList,
        });
    };

    getData2 = () => {
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
    };

    getUserInfo = async (username)=>{
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

                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            userInfo:user,
            role:user.type
        })
    };

    getHomeworkAll=async ()=>{
        let config = {
            method: 'get',
            url: 'http://localhost:8080/getHomeworkAll',
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
        console.log(hw);
        this.setState({
            homework:hw,
        })
    };
    changeSubject1=(subject)=>{
        let modifiedList1 = [];
        let modifiedList2 = [];
        let typeButton = document.getElementById("typeButton");
        if(subject === "所有"){
            this.setState({
                subjectHomework:this.state.homework,
                displayHomework:this.state.gradeHomework,
            });
            typeButton.innerText="学科";
            return null;
        }else{
            for(let homework of this.state.homework){
                if(homework.type === subject){
                    modifiedList1.push(homework);
                }
            }
            for(let homework of this.state.gradeHomework){
                if(homework.type === subject){
                    modifiedList2.push(homework);
                }
            }
        }
        typeButton.innerText=subject;
        this.setState({
            displayHomework:modifiedList2,
            subjectHomework:modifiedList1
        });
    };

    changeSubject2=(subject)=>{
        let modifiedList1 = [];
        let modifiedList2 = [];
        let gradeButton = document.getElementById("gradeButton");
        if(subject === "所有"){
            this.setState({
                gradeHomework:this.state.homework,
                displayHomework:this.state.subjectHomework,
            });
            gradeButton.innerText="年级";
            return null;
        }else{
            for(let homework of this.state.subjectHomework){
                if(homework.grade === subject){
                    modifiedList1.push(homework);
                }
            }
            for(let homework of this.state.homework){
                if(homework.grade === subject){
                    modifiedList2.push(homework);
                }
            }
        }
        gradeButton.innerText=subject;
        this.setState({
            displayHomework:modifiedList1,
            gradeHomework:modifiedList2,
        });
    };

    componentWillMount() {
        this.setState({
            displayHomework: this.state.homework,
            subjectHomework: this.state.homework,
            gradeHomework: this.state.homework
        });
        this.getData2();


        if(this.props.location.pathname==="/home/homework/overall"){
            this.setState({type:0});
            console.log(0);
        }
        if(this.props.location.pathname==="/home/homework/submitted"){
            this.setState({type:1});
            console.log(1);
        }
        if(this.props.location.pathname==="/home/homework/uncommitted"){
            this.setState({type:2});
            console.log(3);
        }
        if(this.props.location.pathname==="/home/homework/closed"){
            this.setState({type:3});
            console.log(4);
        }
        if(this.props.location.pathname==="'/home/homework/notclosed"){
            this.setState({type:4});
            console.log(5);
        }
    }

    render() {
        const menu1 = (
            <Menu onClick={(e)=>{
                this.changeSubject1(e.item.props.children);}}>
                <Menu.SubMenu title="所有">
                    <Menu.Item onClick={() => {
                    }}>所有</Menu.Item>
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
            <Menu onClick={(e)=>{this.changeSubject2(e.item.props.children)}} >
                <Menu.SubMenu title="所有">
                    <Menu.Item>一年级上</Menu.Item>
                    <Menu.Item>一年级下</Menu.Item>

                    <Menu.Item>二年级上</Menu.Item>
                    <Menu.Item>二年级下</Menu.Item>

                    <Menu.Item>三年级上</Menu.Item>
                    <Menu.Item>三年级下</Menu.Item>

                    <Menu.Item>四年级上</Menu.Item>
                    <Menu.Item>四年级下</Menu.Item>

                    <Menu.Item>五年级上</Menu.Item>
                    <Menu.Item>五年级下</Menu.Item>

                    <Menu.Item>六年级上</Menu.Item>
                    <Menu.Item>六年级下</Menu.Item>

                    <Menu.Item>七年级上</Menu.Item>
                    <Menu.Item>七年级下</Menu.Item>

                    <Menu.Item>八年级上</Menu.Item>
                    <Menu.Item>八年级下</Menu.Item>

                    <Menu.Item>九年级上</Menu.Item>
                    <Menu.Item>九年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="一年级" >
                    <Menu.Item>一年级上</Menu.Item>
                    <Menu.Item>一年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="二年级" >
                    <Menu.Item>二年级上</Menu.Item>
                    <Menu.Item>二年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="三年级" >
                    <Menu.Item>三年级上</Menu.Item>
                    <Menu.Item>三年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="四年级" >
                    <Menu.Item>四年级上</Menu.Item>
                    <Menu.Item>四年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="五年级" >
                    <Menu.Item>五年级上</Menu.Item>
                    <Menu.Item>五年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="六年级" >
                    <Menu.Item>六年级上</Menu.Item>
                    <Menu.Item>六年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="七年级" >
                    <Menu.Item>七年级上</Menu.Item>
                    <Menu.Item>七年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="八年级" >
                    <Menu.Item>八年级上</Menu.Item>
                    <Menu.Item>八年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="九年级" >
                    <Menu.Item>九年级上</Menu.Item>
                    <Menu.Item>九年级下</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );

        return (
            <div>
                <div>
                    <CustomBreadcrumb arr={['课程', this.state.type===0?"所有作业":this.state.type===1?"已提交":this.state.type===2?"未提交":this.state.type===3?"已截止":"未截止"]}/>
                </div>
                <div>
                    <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                        <Form layout='horizontal' style={{width: '70%',float:'left'}} onSubmit={this.handleSubmit}>
                            <Form.Item label='搜索' >
                                {
                                    (
                                        <Search
                                            placeholder="输入作业名称"
                                            enterButton="搜索"
                                            size="medium"
                                            onSearch={value => {this.searchFun(value)}}
                                        />

                                    )
                                }
                            </Form.Item>
                        </Form>
                        <Dropdown overlay={menu1} trigger={['click']} style={{ marginTop: '30px'}}>

                            <Button  style={{width:"10%",marginLeft:'30px'}} ><span id="typeButton">学科</span><Icon type="down"/></Button>
                        </Dropdown>
                        <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft:'30px'}}>
                            <Button style={{width:"10%",marginTop:'42.5px',marginLeft:'30px'}}><span id="gradeButton">年级</span><Icon type="down"/></Button>

                        </Dropdown>
                    </Card>
                </div>
                <div>

                    <HomeworkList homeworkList={this.state.displayHomework}/>

                </div>
            </div>
        )
    }
}

export default HomeworkDemo
