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
    switch(this.state.helpType){
      case 0:
        if(this.state.role==='teacher'){
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
                          src={require("../../../pic/courseset.png")}
                      />
                    } bordered={false} className='card-item' style={{height:350}} >
                      <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"black"}} onClick={()=>{this.setState({helpType:1})}}> 课程创建 </p>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card     cover={
                      <img
                          height={350}
                          alt="example"
                          src={require("../../../pic/coursemanage.png")}
                      />
                    } bordered={false} className='card-item' style={{height:350}} >
                      <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"black"}}onClick={()=>{this.setState({helpType:2})}}> 课程管理 </p>
                    </Card>
                  </Col>
                </Row>
                <Row gutter={10}>
                  <Col span={12}  >
                    <Card     cover={
                      <img
                          height={350}
                          alt="example"
                          src={require("../../../pic/homeworkassign.png")}
                      />
                    } bordered={false} className='card-item' style={{height:350}} >
                      <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"black"}} onClick={()=>{this.setState({helpType:3})}}> 作业布置 </p>
                    </Card>
                  </Col>
                  <Col span={12}>
                    <Card     cover={
                      <img
                          height={350}
                          alt="example"
                          src={require("../../../pic/gradeBackground.png")}
                      />
                    } bordered={false} className='card-item' style={{height:350}} >
                      <p style={{position:'absolute',left:"35%",top:"50%",fontSize:'70px',fontWeight:'bold',color:"black"}} onClick={()=>{this.setState({helpType:4})}}> 作业批改 </p>
                    </Card>
                  </Col>
                </Row>
              </Card>
          )
        }
        break;
      case 1:
        if(this.state.role==='teacher'){
          return (
              <Card style={{fontSize:20}}>
                <CustomBreadcrumb arr={['帮助']}/>
                <h1 style={{fontWeight:'bold'}}>创建课程</h1>
                <p>
                  教师在开启课堂之前需要先创建一门课程。<br/>
                  点击“所有课程”进入课程页面，点击“创建一门新的课程”。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/c1.jpg")}
                />
                <br/>
                <p>
                  ①第一环节，界面显示课程的基本信息表单，包括课程名称、目标年级、课程类型（语文/数学/英语...）、课程教材、详细介绍、课程起止时间（一般为一个学期时间）、上课班级。<br/>
                  带星号的都是必填项，你需要输入或选择对应栏的内容，随后点击“提交”进入下一环节。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/c2.png")}
                />
                <br/>
                <p>
                  ②第二环节确定课程的基本大纲。<br/>
                  一般来说课程大纲分为大的章节和下面的小节，点击“在此添加章节”创建章节，在每个章节栏目下面的“添加一个小节”创建小节。<br/>
                  需要修改大纲时，点击红色按钮“删除这个章节”/“删除这个小节”进行对应位置的章节/小节的删除（注意，删除章节时会连带下方的小节一同删除，请谨慎操作！）。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/c3.jpg")}
                />
                <p>
                  ③第三环节，添加这门课程的学生。<br/>
                  该节目左侧是课程学生名单，右侧是你在第一环节输入的上课班级的学生名单。<br/>
                  在右侧名单中勾选对应学生栏目，点击左上方“添加到上课表”按钮即可把该学生添加到左边课程名单中，对于已添加的学生同样可以点击栏目右侧的“删除”按钮将操作撤回。<br/>
                  需要在比较长的名单中找到某个学生的栏目时，在名单上方的搜索框中输入学生名字/学号并点击“搜索”进行查找。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/c4.jpg")}
                />
                <p>
                  三个环节全部完成，点击下方“确认”按钮完成课程创建
                </p>
              </Card>

          )
        }
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
    }

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