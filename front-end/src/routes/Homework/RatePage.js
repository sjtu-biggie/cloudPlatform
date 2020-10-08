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

class RatePage extends React.Component {
  state = {
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
          <Rating/>
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

export default RatePage
