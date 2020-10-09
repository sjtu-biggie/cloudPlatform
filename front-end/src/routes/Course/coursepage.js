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


@Form.create()
class CoursePageDemo extends React.Component {
    state = {
        step: 0,
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
        displayHomeworkList:deathHomework
    };

    componentDidMount() {

        this.setState({
            loading: true,
        });
        this.getData2();
        this.setState({
            loading: false
        });
        console.log(this.props.location.pathname);
        if (this.props.location.pathname === "/home/course/overall") {
            this.setState({type: 0});
            console.log(0);
        }
        if (this.props.location.pathname === "/home/course/ongoing") {
            this.setState({type: 1});
            console.log(1);
        }
        if (this.props.location.pathname === "/home/course/end") {
            this.setState({type: 2});
            console.log(2);
        }
    }
    getUserInfo=async (username)=>{

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
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(user);
        this.setState({
            userInfo:user,
            role:user.type
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
                                }}>课程名 : {this.state.course.course_name}</p>
                                <p style={{marginTop: '10px', height: '90px'}}>{this.state.course.introduction}</p>
                                <p style={{height: '10px'}}>开始时间：{this.state.course.start_date} 结束时间：{this.state.course.end_date}</p>
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
                                    {this.state.course.detail}
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
                modifiedCourse.course_name = values.course_name;
                modifiedCourse.textbook = values.textbook;
                modifiedCourse.introduction = values.introduction;
                modifiedCourse.detail = values.detail;
                modifiedCourse.start_date = values.startDate.format('YYYY-MM-DD HH:mm:ss');
                modifiedCourse.end_date = values.endDate.format('YYYY-MM-DD HH:mm:ss');
                this.setState({course: modifiedCourse,modifyCourse:false});
                console.log(values);
            }
        });
    };
    deleteSmall = (index, smallName) => {
        let chapterName = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.course.syllabus;
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
        modifiedCourse.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    addSmall = (index, smallName) => {
        let chapterName = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.course.syllabus;
        for (let a in modifiedSyllabus) {
            if (a === chapterName) {
                let chapter = modifiedSyllabus[a].content;
                chapter.push(smallName);
                modifiedSyllabus[a].content = chapter;
            }
        }
        let modifiedCourse = this.state.course;
        modifiedCourse.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    addBig = (index, smallName) => {
        let chapterString ='chapter' + (index + 2);
        let chapterName = {title:smallName,content:[]};
        let modifiedSyllabus = this.state.course.syllabus;
        for(let i=modifiedSyllabus.chapterNum;i>index+1;--i){
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[mdfChapter]=modifiedSyllabus[prvChapter];
        }
        modifiedSyllabus[chapterString] = chapterName;
        modifiedSyllabus['chapterNum']=modifiedSyllabus['chapterNum']+1;
        let modifiedCourse = this.state.course;
        modifiedCourse.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    deleteBig = (index)=>{
        let modifiedSyllabus = this.state.course.syllabus;
        for(let i=index+1;i<modifiedSyllabus.chapterNum;++i){
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[prvChapter]=modifiedSyllabus[mdfChapter];
        }
        delete modifiedSyllabus[ 'chapter'+modifiedSyllabus.chapterNum];
        modifiedSyllabus['chapterNum']=modifiedSyllabus['chapterNum']-1;
        let modifiedCourse = this.state.course;
        modifiedCourse.syllabus = modifiedSyllabus;
        this.setState({course: modifiedCourse});
    };
    modifiedSyllabus=()=>{
        let i = 1;
        let chapterList = [];
        while (1) {
            let str = 'this.state.course.syllabus.chapter' + i;
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
            console.log('Upload event:', e);
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
                          getFieldDecorator('course_name', {
                              initialValue:this.state.course.course_name,
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
                              initialValue:this.state.course.textbook,
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
                              initialValue:this.state.course.introduction,
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
                              initialValue:this.state.course.detail,
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
                      <p style={{marginLeft:'100px'}}>原开始时间：{this.state.course.start_date}</p>
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
                      <p style={{marginLeft:'100px'}}>原结束时间：{this.state.course.end_date}</p>
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
            let str = 'this.state.course.syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            else {
                console.log(i);
            }
            chapterList.push(contents);
            ++i;
        }
        return (
            <Collapse defaultActiveKey={['1']}>{chapterList.map((value, index) => {
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
                        {this.state.deleteBulletin?<Button type="danger" style={{float:'right'}}>删除</Button>:null}
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
        const data = [
            {year: '1991', value: 3},
            {year: '1992', value: 4},
            {year: '1993', value: 3.5},
            {year: '1994', value: 5},
            {year: '1995', value: 4.9},
            {year: '1996', value: 6},
            {year: '1997', value: 7},
            {year: '1998', value: 9},
            {year: '1999', value: 13}
        ]
        const cols = {
            'value': {min: 0},
            'year': {range: [0, 1]}
        }

        const data2 = [
            {year: '1951 年', sales: 38},
            {year: '1952 年', sales: 52},
            {year: '1956 年', sales: 61},
            {year: '1957 年', sales: 145},
            {year: '1958 年', sales: 48},
            {year: '1959 年', sales: 38},
            {year: '1960 年', sales: 38},
            {year: '1962 年', sales: 38},
        ];
        const cols2 = {
            'sales': {tickInterval: 20},
        };
        return (
            <div>
                <Card bordered={false} style={{marginBottom: 10}} id='gradeCard'>
                    <Row>
                        <Col span={10} offset={6}>

                            <Steps current={this.state.step} style={{marginTop: '200px', fontWeight: 'bold'}}
                                   size="large">
                                <Steps.Step title="提交作业" onClick={() => {
                                    this.setState({step: 0})
                                }} description="排名更准确"/>
                                <Steps.Step title="学习数据" onClick={() => {
                                    this.setState({step: 1})
                                }} description="胜败乃兵家常事"/>
                                <Steps.Step title="数据分析" onClick={() => {
                                    this.setState({step: 2})
                                }} description="知己知彼"/>
                            </Steps>

                        </Col>
                    </Row>
                </Card>
                {
                    this.state.step>=1?
                        <Row>
                            <Col span={16}>
                                <Card style={{height:'130px'}}>
                                    <Statistic style={{marginTop:'10px',float:"left"}} title="姓名" value={'陈小红'} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已完成作业数" value={12} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="缺交作业数" value={1} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="平均得分" value={84.25} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="近两周平均得分" value={86.75} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="综合评级" value={'良'} />
                                </Card>
                            </Col>
                            <Col span={4}>
                                <Card style={{height:'130px'}}>
                                位次比例
                                <Progress style={{marginLeft:'10px'}} width={80} type="circle" percent={73} />
                                </Card>
                            </Col>
                            <Col span={4}>
                                <Card style={{height:'130px'}}>
                                <Statistic style={{marginTop:'10px',display:'block'}} title="总排名" value={93} suffix="/ 120" />
                                </Card>
                                </Col>
                            <Col span={24}>
                                <Card style={{marginTop:'10px'}} title={'单次作业排名'}>
                                    <List
                                        pagination={{pageSize: 6}}
                                        dataSource={this.state.homework}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={<a href="https://ant.design">{item.title}</a>}
                                                />
                                                <div>{item.rank}/120</div>
                                            </List.Item>
                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container">
                                                <Spin />
                                            </div>
                                        )}
                                    </List>
                                </Card>
                            </Col>

                        </Row>
                    :null
                }
                {
                    this.state.step >= 2 ?
                        <Row gutter={10} style={{marginTop:'10px'}}>
                            <Col span={12}>
                                <Card title='近一个月排名变化' bordered={false} className='card-item'>
                                    <Chart height={400} data={data} scale={cols} forceFit>
                                        <Axis name="year"/>
                                        <Axis name="value"/>
                                        <Tooltip crosshairs={{type: 'y'}}/>
                                        <Geom type="line" position="year*value" size={2}/>
                                        <Geom type='point' position="year*value" size={4} shape={'circle'}
                                              style={{stroke: '#fff', lineWidth: 1}}/>
                                    </Chart>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title='近一个月作业得分' bordered={false} className='card-item'>
                                    <Chart height={400} data={data2} scale={cols2} forceFit>
                                        <Axis name="year"/>
                                        <Axis name="sales"/>
                                        <Tooltip crosshairs={{type: 'y'}}/>
                                        <Geom type="interval" position="year*sales"/>
                                    </Chart>
                                </Card>
                            </Col>
                        </Row>:
                        null
                }
            </div>
        );
    };

    studentTableRender=()=>{
        return(<StudenTable courseId={this.state.course.id}/>)
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
        const loadMore = (
            <div style={styles.loadMore}>
                {/*不知道为什么这种写法有问题，会报错*/}
                {/*{loadingMore ? <Spin/> : <Button onClick={() => this.getData2()}>加载更多</Button>}*/}
                <Spin style={loadingMore ? {} : {display: 'none'}}/>
                <Button style={!loadingMore ? {} : {display: 'none'}} onClick={() => this.getData2()}>加载更多</Button>
            </div>
        );
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
                        <Menu.Item onClick={() => {
                            this.setState({type: 5})
                        }} key="rank"><Icon type="appstore"/>数据</Menu.Item>
                        {
                            this.state.role==='teacher'?                        <Menu.Item onClick={() => {
                                this.setState({type: 6})
                            }} key="set"><Icon type="setting"/>管理</Menu.Item>:null
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
    detail:'这门课非常的简单，如果你这都不会的话建议你修读低年级课程。' +
        '这门课非常的简单，如果你这都不会的话建议你修读低年级课程。' +
        '这门课非常的简单，如果你这都不会的话建议你修读低年级课程。' +
        '这门课非常的简单，如果你这都不会的话建议你修读低年级课程。' +
        '这门课非常的简单，如果你这都不会的话建议你修读低年级课程。' +
        '这门课非常的简单，如果你这都不会的话建议你修读低年级课程。' +
        '这门课非常的简单，如果你这都不会的话建议你修读低年级课程。',
    course_name: `七年级数学`,
    pic: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    start_date: '1999-10-12',
    end_date: '2020-10-10',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    nickname: "陈小红",
    id: 1,
    textbook: "人教版七年级数学上册",
    introduction: "这是一门有关数学的基础课程，讲述了和代数、函数有关的知识，是中学数学课程的重要组成部分",
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
    }
};
const bulletin = [];
const deadHomework = [
];
for (let i = 0; i < 15; i++) {
    deadHomework.push({
        title: '七年级作业' + i,
        rank: 1+i,
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
        score: '100'
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
        score: '100'
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
        score: '100'
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
        score: '100'
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
        score: '100'
    })
}

export default CoursePageDemo