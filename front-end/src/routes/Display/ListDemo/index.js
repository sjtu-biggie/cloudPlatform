import React from 'react'
import {Card, Spin, Button, Radio, List, Switch, Avatar, BackTop, Anchor, Affix, Icon, Pagination, Col, Row} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb/index'
import TypingCard from '../../../components/TypingCard'
import CommitPage from "../../Homework/commitPage";
import {Editor} from "react-draft-wysiwyg";

const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];
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

class ListDemo extends React.Component {
  state = {
    size: 'default',
    role:"teacher",
    step:0,
    helpType:0,
    bordered: true,
    data2: [],
    loading: false,
    loadingMore: false,
      content:"如果你在使用本平台的过程中遇到任何问题，请联系本平台客服，客服电话021-54749111"
  };

  componentDidMount() {
    let storage = window.localStorage;
    let role = storage.getItem("type");
    this.setState({
      role: role
    });
  }

  render() {
      const { editorState,contentState } = this.state;
    const {size, bordered, loading, data2, loadingMore} = this.state
    const loadMore = (
      <div style={styles.loadMore}>
        {/*不知道为什么这种写法有问题，会报错*/}
        {/*{loadingMore ? <Spin/> : <Button onClick={() => this.getData2()}>加载更多</Button>}*/}
          <Spin style={loadingMore?{}:{display:'none'}}/>
          <Button style={!loadingMore?{}:{display:'none'}} onClick={() => this.getData2()}>加载更多</Button>
      </div>
    );
    return (
      <Card>
        <CustomBreadcrumb arr={['帮助']}/>
          <div  className='card-item'  style={{minHeight:70}}>
            <p   style={{position:"absolute",fontSize:70,left:"25%",fontFamily:"黑体"}}>
              学易-云作业平台 ® 帮助文档
            </p>
          </div>
        <Row gutter={10}>
          <Col span={12}  >
            <Card     cover={
              <img
                  height={350}
                  alt="example"
                  src={require("../../../pic/courseset.jpg")}
              />
            } bordered={false} className='card-item' style={{height:350}} >
              <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"white"}} onClick={()=>{this.setState({helpType:1})}}> 课程创建 </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card     cover={
              <img
                  height={350}
                  alt="example"
                  src={require("../../../pic/coursemanage.jpg")}
              />
            } bordered={false} className='card-item' style={{height:350}} >
              <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"white"}}onClick={()=>{this.setState({helpType:2})}}> 课程管理 </p>
            </Card>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}  >
            <Card     cover={
              <img
                  height={350}
                  alt="example"
                  src={require("../../../pic/homeworkassign.jpg")}
              />
            } bordered={false} className='card-item' style={{height:350}} >
              <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"white"}} onClick={()=>{this.setState({helpType:3})}}> 作业布置 </p>
            </Card>
          </Col>
          <Col span={12}>
            <Card     cover={
              <img
                  height={350}
                  alt="example"
                  src={require("../../../pic/gradeBackground.jpg")}
              />
            } bordered={false} className='card-item' style={{height:350}} >
              <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"white"}} onClick={()=>{this.setState({helpType:4})}}> 作业批改 </p>
            </Card>
          </Col>
        </Row>
      </Card>
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

export default ListDemo