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
    message,
  Statistic, Progress, Row
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import CommitTable from './CommitTable'
import ChangeHomework from './ChangeHomework'
import {withRouter} from "react-router-dom";

const deadHomework = {
  homeworkId:1,
  type:'加载中',
  grade:'加载中',
  title: `加载中 `,
  content: '加载中',
  startTime:'2020-10-11 12:12:12',
  handinTime: null,
  endTime:'2020-10-12 12:12:13',
  theClass:'加载中',
  range:'加载中'
};

@withRouter
class ListDemo extends React.Component {
  state = {
    homeworkId: 0,
    homework: deadHomework,
    studentHomework: deadHomework,
    userInfo: null,
    role: null,
    cNum: 0,
    average: 0,
    handinAmount: 0,
    handinAlready: 0,
    isLoading: false,
  }

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
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    console.log(hw);
    this.setState({
      homework:hw,
      isLoading:true,
    })
  };

  getData2 = () => {
    let storage = window.localStorage;
    let username = storage.getItem("username");
    let r = storage.getItem("type");
    let hwId = this.props.match.params.homeworkId;
    this.getHomeworkOfStudents(hwId);
    this.getHomeworkOne(hwId);
    this.setState({
      role: r,
      homeworkId: hwId,
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
      url: 'http://106.13.209.140:8383/getHomeworkOfStudentsNoMongo?homeworkId='+homeworkId,
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
    list.map(item=>{
      if (item.handinTime !== null){
        this.setState({
          handinAlready: this.state.handinAlready+1,
        })
      }
    });
    this.setState({
      studentHomework:hw,
      average:total/hw.length,
      handinAmount:hw.length,

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
          <ChangeHomework homeworkId ={this.props.match.params.homeworkId}/>
        </Card>
        <Card bordered={false} title={<span>提交情况<span style={{fontSize:"12px"}}>———标红的作业为迟交作业</span></span>} style={{marginBottom: 15}} id='verticalStyle'>
          <Col span={24}>
            <Card style={{height:'130px'}}>
              <Statistic style={{marginTop:'10px',float:"left"}} title="总人数" value={this.state.handinAmount} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已提交作业数" value={this.state.handinAlready} suffix={"/ "+this.state.handinAmount}/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="缺交作业数" value={this.state.handinAmount-this.state.handinAlready} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已批改作业数" value={this.state.cNum} suffix={"/ "+this.state.handinAmount}/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="平均得分" value={this.state.average} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="适用人群" value={this.state.homework.range} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="开始时间" value={this.format(this.state.homework.startTime)} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="结束时间" value={this.format(this.state.homework.endTime)} />
              <Button style={{marginTop:'30px',marginLeft:'480px'}} type={"primary"} onClick = {()=>{this.autograde()}}>自动批改</Button>
            </Card>
          </Col>
          {this.state.isLoading === true ? <Col span = {24}>
            <CommitTable homework={this.state.homework} studentHomework={this.state.studentHomework} homeworkId={this.state.homeworkId} handinAlready={this.state.handinAlready}/>
          </Col> : null}

        </Card>
        <BackTop visibilityHeight={200} style={{right: 50}}/>
      </div>
    )
  }
  autograde=async ()=>{
    if(this.state.homework.type==="主观题"){
      message.error("主观题无法自动批改！");
    }
    let config = {
      method: 'post',
      url: 'http://106.13.209.140:8383/autoGrading?homeworkId='+this.state.homeworkId,
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
  }
}

export default withRouter(ListDemo)
