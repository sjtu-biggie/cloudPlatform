import React from 'react'
import moment from 'moment';
import './courseCss.css'
import Shuffle from 'shufflejs'
import 'animate.css'
import {
    Card,
    Spin,
    Button,
    Radio,
    List,
    BackTop,
    Anchor,
    Affix,
    Icon,
    Form,
    Input,
    Menu,
    Dropdown, Row, Col, Collapse, Avatar, Pagination, Steps, Statistic, Progress, Upload, DatePicker, FormItem, message
} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import FormDemo1 from '../../routes/Homework/Assign';
import HomeworkList from '../Homework/HomeworkList';
import AddBulletin from './AddBulletin'
import {Axis, Chart, Geom, Tooltip} from "bizcharts";
import StudenTable from "../Manage/studentTable";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/input/Search";
import RankData from "./RankData";


@Form.create()
class CoursePageDemo extends React.Component {
    state = {
        //type indicate which content to render
        //parameter is detailed content of one type
        type: 1,
        parameter: 0,
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        course: deadCourse,
        bulletins: bulletin,
        role: 'student',
        addHomework: false,
        deleteHomework: false,
        addBulletin: false,
        deleteBulletin: false,
        homework:deadHomework,
        modifyCourse:false,
        modifySyllabus:false,
        addChapter:false,
        addContent:false,
        lookStudentData:false,
        displayHomeworkList:deathHomework
    };

    componentWillMount() {

        this.setState({
            loading: true,
        });
        let storage = window.localStorage;
        let role = storage.getItem("type");
        let username = storage.getItem("username");
        let courseId = this.props.match.params[0].substr(1);
        this.getCourse(courseId,role,username).then(()=>{

        });
        this.setState({
            loading: false
        });

    }
    getCourse=async (courseId,role,username)=>{

        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8787/course/getCourseById?courseId='+courseId,
            headers: {
                withCredentials: true,
            }
        };
        const course = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(course)
        if(course.course.userId===username){
            this.setState({role:"teacher"})
        }else if(1){
            //TODO:student in the class
        }else{
            this.setState({role:"watcher"})
        }


        this.setState({
            course:course
        })
    };
    getData2 = () => {
        this.setState({
            loadingMore: true
        });
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
    };
    homeworkRender = () => {
        //TODO:传参给FormDemo1
        return (
            <div>
                <Card bordered={false} style={{marginBottom: 10, height: '90px'}} id="howUse">
                    <Row/>
                    <Button style={{float: 'left'}} type="primary" icon="up-circle-o" size='large' onClick={() => {
                        this.setState({addHomework: true})
                    }}>创建新的一次作业</Button>

                    <Button style={{float: 'left', marginLeft: '20px'}} type="danger" icon="down-circle-o"
                            size='large'>删除现有一次作业</Button>
                    <Button style={{float: 'left', marginLeft: '20px'}} type="dashed" size='large' onClick={() => {
                        this.setState({
                            addHomework: false,
                            deleteHomework: false,
                            addBulletin: false,
                            deleteBulletin: false,
                            modifyCourse: false,
                            modifySyllabus: false
                        })
                    }}>返回</Button>
                </Card>
                {
                    this.state.addHomework ? <FormDemo1 datas={this.state.type}/> :
                        <HomeworkList homeworkList={this.state.displayHomeworkList} delete={this.state.deleteHomework}/>
                }

            </div>
        )

    };
    mainRender = () => {

        return (
            <div>
                {this.state.role === 'teacher' ? <Card bordered={false} style={{marginBottom: 10, height: '90px'}}>
                    <Row/>
                    <Button style={{float: 'left'}} type="primary" icon="up-circle-o" size='large' onClick={() => {
                        this.setState({modifyCourse: true,modifySyllabus:false})
                    }}>修改课程信息</Button>
                    <Button style={{float: 'left', marginLeft: '20px'}} type="danger" icon="down-circle-o"
                            size='large' onClick={() => {
                        this.setState({modifySyllabus: true,modifyCourse:false})
                    }}>修改课程大纲</Button>
                    <Button style={{float: 'left', marginLeft: '20px'}} type="dashed" size='large' onClick={() => {
                        this.setState({modifySyllabus: false, modifyCourse: false,})
                    }}>返回</Button>
                </Card> : null}
                {this.state.modifyCourse?this.modifiedCourse():this.state.modifySyllabus?this.modifiedSyllabus():<div>
                    <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                        <Row style={{height: "200px"}}>
                            <Col span={18}>
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    display: 'block'
                                }}>课程名 : {this.state.course.course.courseName}</p>
                                <p style={{marginTop: '10px', height: '90px'}}>{this.state.course.courseInfo.introduction}</p>
                                <p style={{height: '10px'}}>开始时间：{this.state.course.course.startDate} 结束时间：{this.state.course.course.endDate}</p>
                            </Col>
                            <Col span={6}>
                            </Col>
                        </Row>

                    </Card>

                    <Row style={{}}>
                        <Col span={5}>
                            <Card bordered={false} style={{marginBottom: 10, height: "300px"}} id="howUse">
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    display: 'block'
                                }}>授课教师 : {this.state.course.nickname}</p>
                                <img alt="logo"
                                     src={require('../../pic/teacher2.jpg')}
                                     style={{height: '190px', weight: '160px'}}/>
                            </Card>
                        </Col>
                        <Col span={19}>
                            <Card bordered={false} style={{marginBottom: 10, height: "300px", marginLeft: 10}} id="howUse">
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    display: 'block',
                                    paddingRight: '50px'
                                }}>老师有话说 ：</p>
                                <p>
                                    {this.state.course.courseInfo.detail}
                                </p>
                            </Card>
                        </Col>
                    </Row>
                    <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                        <p style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            display: 'block'
                        }}>课程大纲 :</p>
                        {this._renderSyllabus()}
                    </Card>

                </div>}


            </div>

        )
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请填写正确的课程信息')
            } else {
                message.success('提交成功');
                let modifiedCourse = this.state.course;
                modifiedCourse.course.courseName = values.courseName;
                modifiedCourse.courseInfo.textbook = values.textbook;
                modifiedCourse.courseInfo.introduction = values.introduction;
                modifiedCourse.courseInfo.detail = values.detail;
                modifiedCourse.course.startDate = values.startDate.format('YYYY-MM-DD HH:mm:ss');
                modifiedCourse.course.endDate = values.endDate.format('YYYY-MM-DD HH:mm:ss');
                this.setState({course: modifiedCourse,modifyCourse:false});
                /*console.log(values);*/
            }
        });
    };
    deleteSmall = (index, smallName) => {
        let chapterName = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.course.courseInfo.syllabus;
        for (let a in modifiedSyllabus) {
            if (a === chapterName) {
                let chapter = modifiedSyllabus[a].content;
                for (let i = 0; i < chapter.length; ++i) {
                    if (chapter[i] === smallName) {
                        if (i === 0) {
                            chapter = chapter.slice(1);
                            modifiedSyllabus[a].content = chapter
                        } else chapter.splice(i, 1);
                        break;
                    }
                }
            }
        }
        let modifiedCourse = this.state.course;
        modifiedCourse.courseInfo.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    addSmall = (index, smallName) => {
        let chapterName = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.course.courseInfo.syllabus;
        for (let a in modifiedSyllabus) {
            if (a === chapterName) {
                let chapter = modifiedSyllabus[a].content;
                chapter.push(smallName);
                modifiedSyllabus[a].content = chapter;
            }
        }
        let modifiedCourse = this.state.course;
        modifiedCourse.courseInfo.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    addBig = (index, smallName) => {
        let chapterString ='chapter' + (index + 2);
        let chapterName = {title:smallName,content:[]};
        let modifiedSyllabus = this.state.course.courseInfo.syllabus;
        for(let i=modifiedSyllabus.chapterNum;i>index+1;--i){
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[mdfChapter]=modifiedSyllabus[prvChapter];
        }
        modifiedSyllabus[chapterString] = chapterName;
        modifiedSyllabus['chapterNum']=modifiedSyllabus['chapterNum']+1;
        let modifiedCourse = this.state.course;
        modifiedCourse.courseInfo.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    deleteBig = (index)=>{
        let modifiedSyllabus = this.state.course.courseInfo.syllabus;
        for(let i=index+1;i<modifiedSyllabus.chapterNum;++i){
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[prvChapter]=modifiedSyllabus[mdfChapter];
        }
        delete modifiedSyllabus[ 'chapter'+modifiedSyllabus.chapterNum];
        modifiedSyllabus['chapterNum']=modifiedSyllabus['chapterNum']-1;
        let modifiedCourse = this.state.course;
        modifiedCourse.courseInfo.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    modifiedSyllabus=()=>{
        let i = 1;
        let chapterList = [];
        while (1) {
            let str = 'this.state.course.courseInfo.syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            chapterList.push(contents);
            ++i;
        }
        return(<div>
            <Card bordered={false} className='card-item' title="设计课程大纲">
                <Collapse defaultActiveKey={['0']} onChange={() => {
                    this.setState({addChapter: false, addContent: false})
                }}>{chapterList.map((value, index) => {
                    return (<Collapse.Panel header={value.title} key={index}>
                        {this.state.addChapter ?
                            <Search
                                style={{marginBottom: '15px'}}
                                placeholder="请输入要添加的章节名，按回车确认！"
                                enterButton="添加"
                                onSearch={(value) => {
                                    if (value === "") {
                                        message.warning("章节名称不能为空！", 3);
                                        return;
                                    }
                                    this.addBig(index, value)
                                }}
                            /> : null}
                        <Button type="primary" onClick={() => {
                            this.setState({addChapter: !this.state.addChapter})
                        }} style={{}}>在此添加章节</Button>
                        <Button type="danger" onClick={() => {this.deleteBig(index)
                        }} style={{marginLeft: '10px', marginBottom: '20px'}}>删除这个章节</Button>
                        <List
                            rowKey={(text, record) => text.key}
                            bordered
                            dataSource={value.content}
                            renderItem={item => (
                                <List.Item actions={[<Button type="danger" onClick={() => {
                                    this.deleteSmall(index, item)
                                }} style={{marginLeft: '10px'}}>删除这个小节</Button>]}>
                                    <List.Item.Meta
                                        title={item}
                                    />
                                </List.Item>
                            )}
                        />
                        <Search
                            style={{marginTop: '15px'}}
                            placeholder="请输入要添加的小节名，按回车确认！"
                            enterButton="添加一个小节"
                            onSearch={(value) => {
                                if (value === "") {
                                    message.warning("小节名称不能为空！", 3);
                                    return;
                                }
                                this.addSmall(index, value)
                            }}
                        />
                    </Collapse.Panel>)
                })}</Collapse>
                <Collapse
                    defaultActiveKey={['1']}
                >
                </Collapse>
                <Row>
                    <Col offset={11}>
                        <Button onClick={() => {
                            this.setState({
                                modifySyllabus:false
                            })
                        }} style={{marginTop: '20px', size: 'large'}}>确认修改</Button>
                    </Col>
                </Row>
            </Card>
        </div>);
    };
    modifiedCourse=()=>{
        const FormItem = Form.Item;
        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 12,
                    offset: 4,
                },
            },
        };
        const normFile = e => {
            /*console.log('Upload event:', e);*/
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
        const dateFormat = 'YYYY-MM-DD';
      return(<div>
          <Card bordered={false} title='基本信息'>
              <Form  initialValues={{
                  ['name']: 3,
              }} layout='horizontal' style={{width: '80%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                  <FormItem name='name' label='课程名称' {...formItemLayout} >
                      {
                          getFieldDecorator('courseName', {
                              initialValue:this.state.course.course.courseName,
                              rules: [
                                  {
                                      max: 10,
                                      message: '课程简介不能超过十个字'
                                  },
                                  {
                                      required: true,
                                      message: '请补充课程名称'
                                  }
                              ]
                          })(
                              <Input/>
                          )
                      }
                  </FormItem>
                  <FormItem label='课程教材' {...formItemLayout}>
                      {
                          getFieldDecorator('textbook', {
                              initialValue:this.state.course.courseInfo.textbook,
                              rules: [
                                  {
                                      required: true,
                                      message: '请补充课程教材'
                                  }
                              ]
                          })(
                              <TextArea style={{height: '80px'}}/>
                          )
                      }
                  </FormItem>
                  <FormItem label='课程简介' {...formItemLayout}>
                      {
                          getFieldDecorator('introduction', {
                              initialValue:this.state.course.courseInfo.introduction,
                              rules: [
                                  {
                                      min: 10,
                                      message: '课程简介不能低于十个字'
                                  },
                                  {
                                      max: 80,
                                      message: '课程简介不能超过八十个字'
                                  },
                                  {
                                      required: true,
                                      message: '请补充课程简介'
                                  }
                              ]
                          })(
                              <Input/>
                          )
                      }
                  </FormItem>
                  <FormItem label='详细介绍' {...formItemLayout}>
                      {
                          getFieldDecorator('detail', {
                              initialValue:this.state.course.courseInfo.detail,
                              rules: [
                                  {
                                      max: 300,
                                      message: '详细介绍不能超过三百个字'
                                  },
                              ]
                          })(
                              <TextArea style={{height: '150px'}}/>
                          )
                      }
                  </FormItem>
                  <FormItem label='开始时间' {...formItemLayout} required>
                      {
                          getFieldDecorator('startDate', {
                              rules: [
                                  {
                                      required: true,
                                      message: '请选择开始时间'
                                  }
                              ]
                          })(
                              <DatePicker/>
                          )
                      }
                  </FormItem>
                  <Row><Col offset ={4} span={10}>
                      <p style={{marginLeft:'100px'}}>原开始时间：{this.state.course.course.startDate}</p>
                  </Col></Row>
                  <FormItem label='结束时间' {...formItemLayout} required>
                      {
                          getFieldDecorator('endDate', {
                              rules: [
                                  {
                                      required: true,
                                      message: '请选择结束时间'
                                  }
                              ]
                          })(
                              <DatePicker onChange={() => {

                              }}> </DatePicker>
                          )
                      }
                  </FormItem>
                  <Row><Col offset ={4} span={10}>
                      <p style={{marginLeft:'100px'}}>原结束时间：{this.state.course.course.endDate}</p>
                  </Col></Row>
                  <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                      <Button htmlType="submit">确认修改</Button>
                  </FormItem>
              </Form>
          </Card>
      </div>);
    };
    _renderSyllabus = () => {
        let i = 1;
        let chapterList = [];
        while (1) {
            let str = 'this.state.course.courseInfo.syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            chapterList.push(contents);
            ++i;
        }
        return (
            <Collapse defaultActiveKey={['0']}>{chapterList.map((value, index) => {
                return (<Collapse.Panel header={value.title} key={index}>
                    <List
                        bordered
                        dataSource={value.content}
                        renderItem={item => (
                            <List.Item>
                                {item}
                            </List.Item>
                        )}
                    /></Collapse.Panel>)
            })}</Collapse>);
    };
    bulletinRender = () => {
        return (
            <div>
                {this.state.role === 'teacher' ? <Card bordered={false} style={{marginBottom: 10, height: '90px'}}>
                    <Row/>
                    <Button style={{float: 'left'}} type="primary" icon="up-circle-o" size='large' onClick={() => {
                        this.setState({addBulletin: true})
                    }}>创建新的一条公告</Button>
                    <Button style={{float: 'left', marginLeft: '20px'}} type="danger" icon="down-circle-o"
                            size='large' onClick={() => {
                        this.setState({deleteBulletin: true})
                    }}>删除现有一条公告</Button>
                    <Button style={{float: 'left', marginLeft: '20px'}} type="dashed" size='large' onClick={() => {
                        this.setState({addBulletin: false, deleteBulletin: false,})
                    }}>返回</Button>
                </Card> : null}
                {this.state.addBulletin?<AddBulletin course_id={this.state.course.id}/>:
                    <div>
                <Collapse style={{marginBottom: "10px"}}
                          defaultActiveKey={['1']}>{this.state.bulletins.map((value, index) => {
                    return (<Collapse.Panel header={value.title} key={index}>
                        <p>{value.bulletin}</p>
                        <span style={{fontWeight:'bold'}}>发布时间：</span>{value.publish_date}
                        {this.state.deleteBulletin?<Button type="danger" size={'small'} style={{float:'right'}}>删除</Button>:null}
                    </Collapse.Panel>)
                })}</Collapse>
                <Pagination defaultCurrent={1} total={50}/>
                    </div>
                }
            </div>);
    };
    examRender = () => {
        return null;
    };
    rankRender = () => {
       return(
           <RankData homework={this.state.homework}/>);
    };

    studentTableRender=()=>{
        return(
            <div>
                <Card title={"学生管理"} style={{marginBottom:'10px'}}>
                    点击学生名字，可以看到学生在该门课程中的具体数据！
                </Card>

                <StudenTable courseId={this.state.course.id} getChildValue={this.childValue}/>

            </div>
        ) };
    childValue=(username)=>{
 /*     console.log(username);*/
    };
    typeRender = () => {
        switch (this.state.type) {
            case 1:
                return this.mainRender();
            case 2:
                return this.bulletinRender();
            case 3:
                return this.homeworkRender();
            case 4:
                return this.examRender();
            case 5:
                return this.rankRender();
            case 6:
                return this.studentTableRender();
        }


    };

    render() {
        const {loadingMore} = this.state
        return (
            <div>
                <CustomBreadcrumb
                    arr={['课程', this.state.course.course_name]}/>
                <Card bordered={false} style={{marginBottom: '10px'}}>
                    <Menu mode="horizontal" onSelect={() => {
                        this.setState({addHomework: false, deleteHomework: false})
                    }}>
                        <Menu.Item onClick={() => {
                            this.setState({type: 1})
                        }}>主页</Menu.Item>
                        <Menu.Item key="bulletin" onClick={() => {
                            this.setState({type: 2})
                        }}><Icon type="appstore"/>公告</Menu.Item>
                        <Menu.SubMenu key='app' onClick={() => {
                            this.setState({type: 3})
                        }} title={<span><Icon type='setting'/><span>作业</span></span>}>
                            <Menu.Item>总览</Menu.Item>
                            <Menu.Item>已提交</Menu.Item>
                            <Menu.Item>未提交</Menu.Item>
                            <Menu.Item>已截止</Menu.Item>
                            <Menu.Item>未截止</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key='exam' onClick={() => {
                            this.setState({type: 4})
                        }} title={<span><Icon type='bar-chart'/><span>考试</span></span>}>
                            <Menu.Item>总览</Menu.Item>
                            <Menu.Item>进行中</Menu.Item>
                            <Menu.Item>已截止</Menu.Item>
                            <Menu.Item>已批改</Menu.Item>
                        </Menu.SubMenu>
                        {
                            this.state.role === 'student' ?
                                <Menu.Item onClick={() => {
                                    this.setState({type: 5})
                                }} key="rank"><Icon type="appstore"/>数据</Menu.Item> :
                                <Menu.Item onClick={() => {
                                    this.setState({type: 6})
                                }} key="set"><Icon type="setting"/>管理</Menu.Item>
                        }
                    </Menu>
                </Card>
                {this.typeRender()}

                <BackTop visibilityHeight={200} style={{right: 50}}/>
                {/*<Affix style={styles.affixBox}>*/}
                {/*  <Anchor offsetTop={200} affix={false}>*/}
                {/*    <Anchor.Link href='#howUse' title='课程搜索'/>*/}
                {/*    <Anchor.Link href='#basicUsage' title='课程列表'/>*/}
                {/*    <Anchor.Link href='#remoteLoading' title='公开课'/>*/}
                {/*  </Anchor>*/}
                {/*</Affix>*/}
            </div>
        )
    }
}

const styles = {
    haveBorder: {
        minHeight: 270,
        width: '80%',
        boxSizing: 'border-box'
    },
    noBorder: {
        minHeight: 270,
        width: '80%',
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
    listStyle: {
        width: '100%'
    },
    affixBox: {
        position: 'absolute',
        top: 200,
        right: 50,
        with: 170
    }
};
const IconText = ({type, text}) => (
    <span>
    <Icon type={type} style={{marginRight: 8}}/>
        {text}
  </span>
);
const deadCourse = {
    course:{
        id: 1,
        courseName: `七年级数学`,
        startDate: '1999-10-12',
        endDate: '2020-10-10',
    },
    courseInfo:{
        textbook: "人教版七年级数学上册",
        detail:'加载中~',
        syllabus: {
            chapterNum:4,
            chapter1: {
                title: "一百以内算术",
                content: [
                    "加法",
                    "减法", "乘法", "除法"
                ]
            },
            chapter2: {
                title: "微积分",
                content: [
                    "微分",
                    "积分", "偏微分"
                ]
            },
            chapter3: {
                title: "数学史",
                content: [
                    "时间简史",
                    "二战史",
                    "线性代数史"
                ]
            },
            chapter4: {
                title: "提高篇",
                content: [
                    "矩阵",
                    "行列式",
                    "特征向量",
                    "正交矩阵",
                    "正定矩阵"
                ]
            },
        },
        introduction: "这是一门有关数学的基础课程，讲述了和代数、函数有关的知识，是中学数学课程的重要组成部分",
    },
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    nickname: "陈小红",


};
const bulletin = [];
const deadHomework = [
];
for (let i = 0; i < 15; i++) {
    deadHomework.push({
        title: '七年级上数学作业' + i,
        rank: 1+i,
        score:72+i,
    })
}
//TODO:add pagination support
for (let i = 0; i < 10; i++) {
    bulletin.push({
        title: '重要通知' + i + '号',
        bulletin: `值得注意的是，这五大创新技术，包括了全新的“4680”型电池，号称能量密度提高五倍，动力输出提高 6 倍，续航里程可提高 16%。
　　马斯克称，新电池已经开始在一家工厂生产，将需要一年时间达到 10 千兆瓦时的产能。
　　另外，早在今年 4 月，马斯克就表示，今年的电池日活动是“特斯拉历史上最让人兴奋的日子之一”，预计将于 2020 年投产一种新型电池，这种电池能够驱动特斯拉汽车行驶百万英里，是普通电池包寿命的2-3 倍。
　　据悉，这种电池是一种锂离子电池，是宁德时代与特斯拉合作生产的，可以使电动汽车持续行驶 100 万英里。马斯克曾在推特上表示，他将会在“电池技术日”活动上详细介绍一项百万英里电池项目。
　　但是，直到此次电池日活动结束，投资者高度期待的“百万英里电池”依然不见踪影。特斯拉股价也由上涨5% 转为下跌近7%。`,
        publish_date: '1999-10-12',
    })
}
const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
    }];
const deathHomework = [];
for(let i=0;i<3;i++){
    deathHomework.push({
        type:'数学',
        grade:'七年级上',
        title: `七年级上数学作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'语文',
        grade:'七年级上',
        title: `七年级上语文作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'英语',
        grade:'七年级上',
        title: `七年级上英语作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级三班','八年级二班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'英语',
        grade:'八年级上',
        title: `八年级上英语作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级一班','八年级四班']

    })
}

for(let i=0;i<3;i++){
    deathHomework.push({
        type:'英语',
        grade:'八年级上',
        title: `八年级下英语作业 ${i}`,
        content: '同学们记得认真完成按时提交',
        startTime:'2020-10-11 12:12:12',
        handinTime: null,
        endTime:'2020-10-12 12:12:13',
        accessmentalgorithms:'0',
        score: '100',
        range:['八年级一班','八年级二班']
    })
}

export default CoursePageDemo