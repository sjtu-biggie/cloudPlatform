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

const data3 = []
for(let i=0;i<23;i++){
  data3.push({
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  })
}
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
const deadHomework = {
  title: '作业123',
  homeworkid:'11'
};
class ListDemo extends React.Component {
  state = {
    size: 'default',
    bordered: true,
    data2: [],
    loading: false,
    loadingMore: false,
    homework:deadHomework
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

  render() {
    const {size, bordered, loading, data2, loadingMore} = this.state
    return (
      <div>
        <CustomBreadcrumb arr={['作业', '提交情况']}/>
        <TypingCard id='howUse' source='作业内容' height = '15'/>
        <Card bordered={false} title='提交情况' style={{marginBottom: 15}} id='verticalStyle'>
          <Col span={24}>
            <Card style={{height:'130px'}}>
              <Statistic style={{marginTop:'10px',float:"left"}} title="总人数" value={'15'} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已提交作业数" value={12} suffix="/ 15"/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="缺交作业数" value={3} suffix="/ 15"/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已批改作业数" value={3} suffix="/ 12"/>
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="平均得分" value={84.25} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="适用人群" value={'一年级三班'} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="开始时间" value={'2020.10.1 00:00'} />
              <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="结束时间" value={'2020.10.3 23:59'} />
            </Card>
          </Col>
          <Col span = {24}>
            <CommitTable homeworkId ={this.state.homework.homeworkid}/>
          </Col>
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
}

export default ListDemo
