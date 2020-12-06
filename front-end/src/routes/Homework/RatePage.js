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
import TypingCard from '../../components/TypingCard'
import CommitTable from './CommitTable'
import Rating from "./Rate";
import {withRouter} from 'react-router'
class RatePage extends React.Component {
  state = {
    size: 'default',
    bordered: true,
    data2: [],
    loading: false,
    loadingMore: false,
    homework:{}
  };

  componentWillMount() {
    this.setState({
      loading: true,
    });
    console.log(this.props.match.params);
    this.getHomework();
    this.setState({
      loading: false
    })
  }

  getHomework=async()=>{
    let config2 = {
      method: 'get',
      url: 'http://106.13.209.140:8383/getStudentHomeworkOne?studentId='+this.props.match.params.userId+'&homeworkId='+this.props.match.params.homeworkId,
      headers: {
        withCredentials: true,
      }
    };
    const homework = await axios(config2)
        .then(function (response) {
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    this.setState({
      homework:homework
    });
  };

  render=()=> {
    return (
      <div>
        <CustomBreadcrumb arr={['作业', '批改']} style={{display:'inline'}}/>
        <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
          <Rating homework = {this.state.homework} index={this.props.match.params.index} handinAlready={this.props.match.params.handinAlready}/>
        </Card>
        <Button style={{display:'inline'}} type="dashed" size={'big'} onClick={()=>{this.props.history.push("/home/homework/General/"+this.state.homework.homeworkId)}}>返回</Button>
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
  listStyle:{
    width:'100%'
  },
};

export default withRouter(RatePage)
