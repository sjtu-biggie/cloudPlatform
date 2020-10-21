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
  Pagination,
  Col,
  Statistic, Progress, Row
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import CommitTable from './CommitTable'
import ChangeHomework from './ChangeHomework'

const deadHomework = {
  homeworkId:1,
  type:'数学',
  grade:'七年级上',
  title: `七年级上数学作业 `,
  content: '同学们记得认真完成按时提交',
  startTime:'2020-10-11 12:12:12',
  handinTime: null,
  endTime:'2020-10-12 12:12:13',
  score: '100',
  range:['八年级三班','八年级二班']

};
class ListDemo extends React.Component {
  state = {
    homeworkId:0,
    homework:deadHomework,
    studentHomework:deadHomework,
    userInfo:null,
    role:null,
    cNum:0,
    average:0
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
    })
  };

  getHomeworkOne = async (homeworkId)=>{
    let config = {
      method: 'post',
      url: 'http://106.13.209.140:8383/getTeacherHomeworkOne?homeworkId=' + homeworkId,
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

  getData2 = () => {
    let storage = window.localStorage;
    let username = storage.getItem("username");
    let r = storage.getItem("type");
    let params = this.props.location.search.slice(1).split('&').map(kv => kv.split('='));
    let hwId = params[0][1];
    this.getHomeworkOfStudents(hwId);
    this.getHomeworkOne(hwId);
    this.setState({
      role: r,
      homeworkId: hwId,
      cNum:0,
      average:0
    });
    this.getUserInfo(username);
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


  getHomeworkOfStudents=async (homeworkId)=>{
    let config = {
      method: 'post',
      url: 'http://106.13.209.140:8383/getHomeworkOfStudents?homeworkId='+homeworkId,
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
    let list = Array.from(hw);
    let total = 0;
    list.map(item=>{
      if (item.score !== null){
        total += item.score;
        this.setState({
          cNum: this.state.cNum+1,
        })
      }
    });
    this.setState({
      studentHomework:hw,
      average:total/hw.length
    })
  };

  componentWillMount() {
    this.getData2();
  }

  render(){
    return (
      <div>
        <CustomBreadcrumb arr={['作业', '提交情况']}/>
        <Card bordered={false} title='作业内容' style={{marginBottom: 15}} id='verticalStyle'>
          <ChangeHomework homeworkId ={this.state.homework.homeworkId}/>
        </Card>
        <Card bordered={false} title='提交情况' style={{marginBottom: 15}} id='verticalStyle'>
          <Col span={24}>
            <Card style={{height:'130px'}}>
              <Statistic style={{marginTop:'10px',float:"left"}} title="总人数" value={this.state.homework.handinAmount} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已提交作业数" value={this.state.studentHomework.length} suffix={"/ "+this.state.homework.handinAmount}/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="缺交作业数" value={this.state.homework.handinAmount-this.state.studentHomework.length} suffix={"/ "+this.state.homework.handinAmount}/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已批改作业数" value={this.state.cNum} suffix={"/ "+this.state.homework.handinAmount}/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="平均得分" value={this.state.average} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="适用人群" value={this.state.homework.range} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="开始时间" value={this.format(this.state.homework.startTime)} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="结束时间" value={this.format(this.state.homework.endTime)} />
            </Card>
          </Col>
          <Col span = {24}>
            <CommitTable homework={this.state.homework} studentHomework={this.state.studentHomework} homeworkId={this.state.homeworkId}/>
          </Col>
        </Card>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
}

export default ListDemo
