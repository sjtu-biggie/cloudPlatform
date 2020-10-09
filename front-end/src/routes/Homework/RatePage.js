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


const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const deadStudentHomeworkList = [];
for(let i=0;i<1;i++){
  deadStudentHomeworkList.push({
      courseid:'2',
      homeworkid: '1',
      studentid:'3',
      handintime:'2020-10-01 12:12:12',
    nickname:"刘皓"+i,
    score:1,
    comment:"做的还不错",
    pic:"1kjeS92j12vf%4"
  })
}
for(let i=0;i<10;i++){
  deadStudentHomeworkList.push({
    courseid:'2',
    homeworkid: '1',
    studentid:'3',
    handintime:'2020-10-01 12:12:12',
    nickname:"刘皓"+(1+i),
    score:null,
    comment:"null",
  })
}
const deadHomework={
  courseid:'2',
  homeworkid: '1',
  title: `七年级上数学作业`,
  avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  content: '同学们记得认真完成按时提交',
  starttime:'2020-10-01 12:12:12',
  endtime:'2020-10-02 12:12:13',
  handinamount:'40',
  accessmentalgorithms:'主观题',
  answer:"先这样，在那样"
};
class RatePage extends React.Component {
  state = {
    size: 'default',
    bordered: true,
    data2: [],
    loading: false,
    loadingMore: false,
    homework:deadHomework,
    studentHomeworkList:deadStudentHomeworkList,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });
    this.getData2();
    this.setState({
      loading: false
    })
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

  render=()=> {
    const {size, bordered, loading, data2, loadingMore} = this.state
    return (
      <div>
        <CustomBreadcrumb arr={['作业', '批改']}/>
        <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
          <Rating homework = {this.state.homework} studentHomeworkList = {this.state.studentHomeworkList}/>
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
  listStyle:{
    width:'100%'
  },
};

export default RatePage
