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
import RankData from "./RankData";

const deadHomework = [
];
for (let i = 0; i < 15; i++) {
  deadHomework.push({
    title: '七年级上数学作业' + i,
    rank: 1+i,
    score:72+i,
  })
}
const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);
class DataPage extends React.Component {
  state = {
    size: 'default',
    bordered: true,
    data2: [],
    loading: false,
    loadingMore: false,
    homework : deadHomework
  };

  componentWillMount() {
    this.setState({
      loading: true,
    });
    console.log(this.props.match);
    this.setState({
      loading: false
    })
  }


//TODO:add student info into rankData
  render=()=> {
    const {size, bordered, loading, data2, loadingMore} = this.state
    return (
      <div>
        <RankData courseId={this.props.match.params.courseId} userId={this.props.match.params.userId}/>

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

export default DataPage
