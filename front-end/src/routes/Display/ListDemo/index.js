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
                  ①第一环节，界面显示课程的基本信息表单，包括课程名称、目标年级、课程类型（语文/数学/英语...）、课程教材、详细介绍、课程起止时间、上课班级等。<br/>
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
                <Button type={"dashed"} style={{float:"left"}} onClick={()=>{this.setState({helpType:0})}} >
                  返回帮助主页
                </Button>
                <Button type={"dashed"} style={{float:"left",marginLeft:15}} >
                  反馈文档错误
                </Button>
              </Card>

          )
        }
        break;
      case 2:
        if(this.state.role==='teacher'){
          return (
              <Card style={{fontSize:20}}>
                <CustomBreadcrumb arr={['帮助']}/>
                <h1 style={{fontWeight:'bold'}}>课程管理</h1>
                <p>
                  ①点击一门课程进入该课程的主页。主页所显示的是你在先前创建课程第一二两个环节所填写的信息。<br/>
                  如若需要修改，点击左上方“修改课程信息”/“修改课程大纲”按钮，之后的流程同创建课程
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/d2.jpg")}
                />
                <br/>
                <p>
                  ②点击页面上方“公告”进入公告版块。 <br/>
                  点击“创建一条新的公告”，首先输入公告标题和内容，然后选择是否向全部本班学生发送通知，最后点击“发布公告”进行发布。 <br/>
                  你同样可以点击公告版块的“删除一条现有公告”选择一条公告并删除。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/d3.jpg")}
                />
                <br/>
                <p>
                  ③页面上方“作业”对应作业版块，将在创建作业与批改作业部分介绍
                  ④点击页面上方“管理”进行学生管理，界面会分别显示该班级上课和未上课名单，修改学生名单的流程同创建课程第三环节。
              </p>
                <Button type={"dashed"} style={{float:"left"}} onClick={()=>{this.setState({helpType:0})}} >
                  返回帮助主页
                </Button>
                <Button type={"dashed"} style={{float:"left",marginLeft:15}} >
                  反馈文档错误
                </Button>
              </Card>

          )
        }
        break;
      case 3:
        if(this.state.role==='teacher'){
          return (
              <Card style={{fontSize:20}}>
                <CustomBreadcrumb arr={['帮助']}/>
                <h1 style={{fontWeight:'bold'}}>作业布置</h1>
                <p>
                  进入一个课程的作业页面有两种方式：1.从主页左侧导航栏的“作业”栏目点击进入
                  2.从每个课程的主页上方的“作业”版块点击进入。<br/>
                  进入作业页面后，点击“创建新的一次作业”进行作业布置。<br/>
                  首先填写作业的基本信息，包括作业名称、布置范围、作业类型（客观题/主观题）、起止时间、是否允许提交，之后系统会根据你选择的作业类型为你提供作业内容编辑框。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/e2.jpg")}
                />
                <br/>
                <p>
                  ①客观题：<br/>
                  首先选择客观题类型：选择题/填空题。然后在上方输入框中输入题干信息，注意若是填空题请显式标记出要填的空来，并和填空题的答案一一对应。<br/>
                  最后如果是选择题则在下方的输入框内输入备选的选项，并在正确选项对应的栏目后面点击选择“设为答案”；如果是填空题则在下方的输入框内依次输入每空的答案。<br/>
                  完成一道题目的创建之后，点击题目右上方的“添加题目”按钮开始创建下一题，流程同上。<br/>
                  注意，每道已创建的题目和已加入的选项栏目后都有对应的删除按钮，需要时点击即可删除。

                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/e3.jpg")}
                />
                <br/>
                <p>
                  ②主观题：<br/>
                  创建主观题时，你需要在上面和下面的文本框中分别输入题目文本和参考答案。<br/>
                  当内容较多或有图片视频等附加文件时，你可以点击文本框左下方的“上传附件”按钮，上传本地的文件作为题目或答案的一部分。<br/>
                  云作业平台同样支持图像识别技术，你可以选择手写题目然后点击文本框右下方的“从图片中识别作业内容”按钮，系统将自动为你识别并转化为题目文本。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/e4.jpg")}
                />
                <p>
                  完成全部题目的创建后，点击“提交”完成作业创建流程，届时对应课程的所有学生会收到作业通知，已创建的作业会出现在你的作业首页中。：<br/>
                  如果在布置作业后，因为某种原因（如题干表述错误）需要进行二次修改，请点击作业首页中对应的作业项，然后点击“修改作业”进入最初的作业创建界面，之后的流程同上。
                </p>
                <Button type={"dashed"} style={{float:"left"}} onClick={()=>{this.setState({helpType:0})}} >
                  返回帮助主页
                </Button>
                <Button type={"dashed"} style={{float:"left",marginLeft:15}} >
                  反馈文档错误
                </Button>
              </Card>

          )
        }
        break;
      case 4:
        if(this.state.role==='teacher'){
          return (
              <Card style={{fontSize:20}}>
                <CustomBreadcrumb arr={['帮助']}/>
                <h1 style={{fontWeight:'bold'}}>作业批改</h1>
                <p>
                  ①点击作业首页中对应的作业项，下拉可见页面下方的列表，其中显示了本班级学生的作业提交情况、批改情况与得分情况。 <br/>
                  每一行代表一名学生的一次作业，已经提交的会显示其提交时间。
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/f1.jpg")}
                />
                <br/>
                <p>
                  作业的批改分主观题和客观题两部分。云作业平台系统会根据你输入的答案对客观题自动批改并打分，并把得分情况呈现在列表中。 <br/>
                  主观题点击列表每一行右侧的“批改”按钮进入批改界面
                </p>
                <img
                    height={500}
                    alt="example"
                    src={require("../../../pic/f2.jpg")}
                />
                <br/>
                <p>
                  主观题的批改界面如图所示。你只需在“评分”框中输入对本题的打分，在“评价”框中输入对本题的评语。<br/>
                  云作业平台的作业批改界面允许你直接在学生上传的作业图片上进行批注，如图所示，点击左下方的“画笔”图标即开始批注。<br/>
                  在批注模式中，你可以通过文本框下方的工具条控制画笔选项，通过选项按钮对作画内容进行删改和保存。<br/>
                  批注完成后，点击正下方的“文本”图标回到原来的界面。最后点击右下方的“保存”图标完成对一份作业的批改，进入下一份作业。<br/>
                  在批改过程中，你可以点击左上角的“查看作业”查看作业题目的具体题干，或者点击“查看答案”查看你之前上传的参考答案。

                </p>
                <Button type={"dashed"} style={{float:"left"}} onClick={()=>{this.setState({helpType:0})}} >
                  返回帮助主页
                </Button>
                <Button type={"dashed"} style={{float:"left",marginLeft:15}} >
                  反馈文档错误
                </Button>
              </Card>

          )
        }
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