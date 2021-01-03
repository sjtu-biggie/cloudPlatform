import React from 'react'
import {Card, Spin, Button,Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Form, Dropdown, Input, Menu} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'

import HomeworkList from './HomeworkList'
import Loading2 from "../../components/Loading2";
const { Search } = Input;

const deathHomework = [];
for(let i=0;i<1;i++){
    deathHomework.push({
        subject:'加载中',
        grade:'加载中',
        content: '加载中',
        score: '加载中',
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
        userInfo: {
            sid:1,
        },
        role: null,
        loading:true,
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
        let r = storage.getItem("type");
        this.getUserInfo(username);
        this.setState({
            role: r
        });
    };

    getUserInfo = async (username)=>{
        let config = {
            method: 'post',
            data :{
                'username':username
            },
            url: 'http://124.70.201.12:8000/getUserMessage',
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
        console.log(user)
        this.setState({
            userInfo:user,
        })

        if (this.state.role === 'teacher'){
            this.getTeacherHomeworkAll(this.state.type,this.state.userInfo.username);
        }
        else if (this.state.role === 'student'){
            this.getStudentHomeworkAll(this.state.type,this.state.userInfo.username);
        }
    };

    add0=(m)=>{return m<10?'0'+m:m };
    format=(shijianchuo)=>
    {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
    };

    JudgeCon = (item) => {
        let nowDate = new Date();
        let endT = new Date(this.format(item.endTime));

        if (nowDate.getTime() < endT.getTime()){
            return "未截止";
        }
        else return "已截止";
    };

    getTeacherHomeworkAll = async (type,teacherId)=>{
        let config = {
            method: 'post',
            url: 'http://124.70.201.12:8383/getHomeworkAll?teacherId='+teacherId,
            //url: 'http://localhost:8080/getHomeworkAll?teacherId='+teacherId,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hw);
        this.setState({
            loading:false
        });
        let index = 0;
        for (let _hw of hw){
            if(_hw.type==='客观题'){
                let content = _hw.syllabus;
            }
            index++;
        }
        switch(type){
            case 0:{
                break;
            }
            case 1:{
                for (let i = 0; i < hw.length;){
                    if (hw[i].handinAlready !== hw[i].handinAmount){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
            case 2:{
                for (let i = 0; i < hw.length;){
                    if (hw[i].handinAlready === hw[i].handinAmount){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
            case 3:{
                for (let i = 0; i < hw.length;){
                    if (this.JudgeCon(hw[i]) !== "已截止"){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
            case 4:{
                for (let i = 0; i < hw.length;){
                    if (this.JudgeCon(hw[i]) === "已截止"){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
        };
        this.setState({
            homework:hw,
            displayHomework:hw,
            subjectHomework:hw,
            gradeHomework:hw
        });
        console.log(this.state.homework);
    };

    getStudentHomeworkAll= async (type, studentId)=>{
        console.log(studentId);
        let config = {
            method: 'post',
            url: 'http://124.70.201.12:8383/getStudentHomeworkAll?studentId=' + studentId,
            //url: 'http://localhost:8080/getStudentHomeworkAll?studentId=' + studentId,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hw);
        this.setState({
            loading:false
        });
        switch(type){
            case 0:{
                break;
            }
            case 1:{
                for (let i = 0; i < hw.length;){
                    if (hw[i].handinTime === null){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
            case 2:{
                for (let i = 0; i < hw.length;){
                    if (hw[i].handinTime !== null){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
            case 3:{
                for (let i = 0; i < hw.length;){
                    if (this.JudgeCon(hw[i]) !== "已截止"){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
            case 4:{
                for (let i = 0; i < hw.length;){
                    if (this.JudgeCon(hw[i]) === "已截止"){
                        hw.splice(i,1);
                    }
                    else {
                        i++;
                    }
                }
                break;
            }
        }
        this.setState({
            homework:hw,
            displayHomework:hw,
            subjectHomework:hw,
            gradeHomework:hw
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
                if(homework.subject.indexOf(subject) !== -1){
                    modifiedList1.push(homework);
                }
            }
            for(let homework of this.state.gradeHomework){
                if(homework.subject.indexOf(subject) !== -1){
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
                if(homework.subject.indexOf(subject) !== -1){
                    modifiedList1.push(homework);
                }
            }
            for(let homework of this.state.homework){
                if(homework.subject.indexOf(subject) !== -1){
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

    componentWillReceiveProps(nextProps, nextContext) {
        this.componentWillMount(nextProps.location.pathname);
    }

    componentWillMount(param) {
        this.setState({
            displayHomework: this.state.homework,
            subjectHomework: this.state.homework,
            gradeHomework: this.state.homework
        });

        let pathname;
        if (param === undefined || param === null) {
            pathname = this.props.location.pathname;
        } else {
            pathname = param;
        }

        if(pathname ==="/home/homework/overall"){
            this.setState({type:0});
        }
        if(pathname ==="/home/homework/submitted"){
            this.setState({type:1});
        }
        if(pathname ==="/home/homework/uncommitted"){
            this.setState({type:2});
        }
        if(pathname ==="/home/homework/closed"){
            this.setState({type:3});
        }
        if(pathname ==="/home/homework/notclosed"){
            this.setState({type:4});
        }
        this.getData2();
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
        if(this.state.loading){
            return  <div>
                <h3 style={style.loadingTitle} className='animated bounceInLeft'>载入中...</h3>
                <Loading2/>
            </div>
        }else return (
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
                                            size="default"
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
const style = {
    loadingTitle:{
        position:'fixed',
        top:'50%',
        left:'50%',
        marginLeft: -45,
        marginTop: -18,
        color:'#000',
        fontWeight:500,
        fontSize:24
    },
}
export default HomeworkDemo
