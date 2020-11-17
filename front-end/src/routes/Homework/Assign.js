import React from 'react'
import {
    Card,
    Cascader,
    Form,
    Select,
    Input,
    Button,
    message,
    BackTop,
    DatePicker,
    Upload,
    Icon,
    Popconfirm,
    Collapse, List, Row, Col, Dropdown, Menu
} from 'antd'
import DraftDemo from './Draft'
import UploadDemo from './upload'
import axios from "axios";
import TextArea from "antd/es/input/TextArea";
import Search from "antd/es/input/Search";

const FormItem = Form.Item;
const Option = Select.Option;

const options1 = [
    {
        label: '加载中',
        value: '加载中',
    }
];

const options2 = [
    {
        value: '主观题',
        label: '主观题',
    },
    {
        value: '客观题',
        label: '客观题',
    }
];

@Form.create()
class Assign extends React.Component {
    state = {
        syllabus: {
            chapterNum: 1,
            chapter1: {
                title: "题目",
                type:'选择题',
                text:'请输入题干，若是填空题请显式标记出要填的空来，并和填空题的答案一一对应',
                content: [

                ]
            }
        },
        //0 主观题，1 客观题
        homeworkType: 1,
        text: '加载中',
        dfileList: [],
        disabled: false,
        homeworkId:null,
        homework: {
            courseId: 0,
            homeworkId: 0,
            teacherId: 0,
            endTime: 0,
            startTime: 0,
            handinAmount: 0,
            title: 0,
            range: 0,
            type: 0,
            content: 0,
            answer: 0
        },
        userInfo: null,
        role: null,
        content: null,
        answer: null,
        courseId: null,
        option: null,
        loading: false,
        conUpload: null,
        ansUpload: null,
        conFile:null,
        ansFile:null,
        handinAmount:0,
        course:null,
        student:null,
    };

    add0 = (m) => {
        return m < 10 ? '0' + m : m
    };
    format = (shijianchuo) => {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    };

    getData2 = () => {
        let storage = window.localStorage;
        let username = storage.getItem("username");
        this.getUserInfo(username);
        this.getCourse(this.props.course.course.id);
    };

    getStudentInfo = async (values)=>{
        let ob = {
            classIds: values.ran
        }
        console.log(ob);
        let config = {
            method: 'post',
            data : ob,
            url: 'http://106.13.209.140:8000/getAllUsersByClassIds',
            headers: {
                withCredentials: true,
            }
        };
        const studentInfo = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        let list1 = Array.from(studentInfo);
        let list2 = [];
        for (let i = 0; i < list1.length;++i){
            if (list1[i].type === 'student'){
                list2.push(list1[i]);
            }
        }
        console.log(list2);
        this.setState({
            handinAmount: list2.length,
            student:list2
        })
        values.startTime = this.format(values.startDate);
        values.endTime = this.format(values.endDate);
        values.handinAmount = this.state.handinAmount;
        values.teacherId = this.state.userInfo.username;
        let tp = this.state.course.type;
        let gra = this.state.course.grade;
        values.subject = gra+tp;
        if (values.startDate > values.endDate) {
            message.error('开始时间不能晚于结束时间');
        } else {
            values.courseId = this.props.course.course.id;
            if(values.type === '主观题'){
                values.content = this.state.content;
                values.conUpload = this.state.conUpload;
            }else{
                values.syllabus = this.state.syllabus;
            }
            values.answer = this.state.answer;
            values.ansUpload = this.state.ansUpload;
            this.setState({
                homework: values,
            });
            console.log(values);
            this.addHomework(values);
            message.success('提交成功');
        }
    };

    getUserInfo = async (username) => {
        let config = {
            method: 'post',
            data: {
                'username': username
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
            userInfo: user,
            loading: true,
        })
    };

    getCourse = async (courseId) => {
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8787/course/getCourseById?courseId=' + courseId,
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
        let classes = course.course.classes.split(",");
        let options1 = [];
        for (let i = 0; i < classes.length; ++i){
            options1.push(
                <Option key={classes[i]}>{classes[i]}</Option>
            )
        }
        console.log(course);
        this.setState({
            option:options1,
            course:course.course
        })
    };

    addStudentHomework = async (homework) => {
        console.log(this.state.student);
        console.log(this.state.student[0].email);
        let tos=[];
        for (let i = 0; i < this.state.student.length; ++i){
            tos.push(this.state.student[i].email)
            console.log(tos);
            homework.studentId = this.state.student[i].username;
            homework.nickName = this.state.student[i].nickname;
            console.log(homework);
            let config = {
                method: 'post',
                url: 'http://106.13.209.140:8383/addStudentHomework',
                data: homework,
                headers: {
                    withCredentials: true,
                }
            };
            const hw = await axios(config)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
            console.log(hw);
        }
        axios({
            url:'http://106.13.209.140:8000/sendNotice',
            method:'POST',
            data:{
                "tos":tos,
                "context":"作业已发布，请及时查收",
            }
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);
        })

    };

    addHomework = async (homework) => {
        console.log(homework);
        let config = {
            method: 'post',
            url: 'http://106.13.209.140:8383/addTeacherHomework',
            data: homework,
            headers: {
                withCredentials: true,
            }
        };
        const hwId = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hwId);
        let stHw = {
            homeworkId: hwId,
            courseId:this.props.course.course.id,
            startTime:homework.startTime,
            endTime:homework.endTime,
            subject:homework.subject,
            title:homework.title,
        };
        console.log(this.state.student);
        this.addStudentHomework(stHw);

        this.setState({
            homeworkId: hwId,
            syllabus: {
                chapterNum: 1,
                chapter1: {
                    title: "题目",
                    type:'选择题',
                    text:'请输入题干，若是填空题请显式标记出要填的空来，并和填空题的答案一一对应',
                    content: [

                    ]
                }
            },
        })
    };

    getContent = (result, t) => {
        this.setState({
            content: t
        })
    };

    getAnswer = (result, t) => {
        this.setState({
            answer: t
        })
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请先填写正确的表单')
            } else {
                values.type = values.tp[0];
                values.range = values.ran.join(',');
                this.getStudentInfo(values);
            }
        });
    };

    getConUpload = (result, fileList) => {
        this.setState({
            conFile:fileList,
        })
        let conPath = [];
        for(let i=0;i<fileList.length;i++){
            conPath.push(fileList[i].response)
        }
        let conUpload=conPath.join(',')
        this.setState({
            conUpload: conUpload
        })
    }

    getAnsUpload = (result, fileList) => {
        this.setState({
            ansFile:fileList,
        })
        let ansPath = [];
        for(let i=0;i<fileList.length;i++){
            ansPath.push(fileList[i].response)
        }
        let ansUpload = ansPath.join(',')
        this.setState({
            ansUpload: ansUpload
        })
    }

    componentWillMount() {
        this.setState({
            courseId: this.props.course.id
        });
        this.getData2();
    }

    render = () => {
        const {getFieldDecorator, getFieldValue} = this.props.form
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 12},
            },
        };
        const DraftLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 24},
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
        }

        let i = 1;
        let chapterList = [];
        while (1) {
            let str = 'this.state.syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            chapterList.push(contents);
            ++i;
        }
        return (
            <div>
                <Card bordered={false} title='布置作业'>
                    <Form layout='horizontal' style={{width: '70%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                        <FormItem label='作业名称' {...formItemLayout} required>
                            {
                                getFieldDecorator('title', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请填写作业名称'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )
                            }
                        </FormItem>
                        <FormItem label='布置范围' {...formItemLayout} required>
                            {
                                getFieldDecorator('ran', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择布置班级'
                                        }
                                    ]
                                })(
                                    // <Cascader options={this.state.loading === false ? options1 : this.state.option}
                                    //           expandTrigger="hover" placeholder=''/>
                                    <Select
                                        mode="multiple"
                                        allowClear
                                    >
                                        {this.state.option}
                                    </Select>

                                )
                            }
                        </FormItem>
                        <FormItem label='作业类型' {...formItemLayout} required>
                            {
                                getFieldDecorator('tp', {
                                    rules: [
                                        {
                                            required: true,
                                            message: '请选择作业类型'
                                        }
                                    ]
                                })(
                                    <Cascader onChange={(e) => {
                                        console.log(e);
                                        if (e[0] === '主观题') {
                                            this.setState({
                                                homeworkType: 0
                                            })
                                        } else {
                                            console.log(1);
                                            this.setState({
                                                homeworkType: 1
                                            })
                                        }
                                    }
                                    } options={options2} expandTrigger="hover" placeholder=''/>
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
                                    <DatePicker onChange={() => {

                                    }}> </DatePicker>
                                )
                            }
                        </FormItem>
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
                        {this.state.homeworkType === 0 ?
                            <div><FormItem style={{width: '100%', margin: '0 auto'}} label='作业详情' {...DraftLayout}>
                                {
                                    (
                                        <DraftDemo parent={this} flag='content'/>
                                    )
                                }
                            </FormItem>
                                <Upload
                                    flieList={this.state.dfileList}
                                    accept=".png,.jpg,.jpeg"
                                    action={'http://106.13.209.140:8383/uploadNotSave'}
                                    onChange={({file, fileList}) => {
                                        if (file.status !== 'uploading') {
                                            console.log(file, file.originFileObj, fileList);
                                            let fr = new FileReader();
                                            fr.onload = async (e) => {
                                                // target.result 该属性表示目标对象的DataURL
                                                console.log(e.target.result);
                                                let config = {
                                                    method: 'post',
                                                    data: {
                                                        "img": e.target.result,
                                                        //"url": "F:/Documentation/Courseware/Software Introduction 2021/cloudPlatform/front-end/src/pic/deadHomework1.jpg",
                                                        //是否需要识别结果中每一行的置信度，默认不需要。 true：需要 false：不需要
                                                        "prob": false,
                                                        //是否需要单字识别功能，默认不需要。 true：需要 false：不需要
                                                        "charInfo": false,
                                                        //是否需要自动旋转功能，默认不需要。 true：需要 false：不需要
                                                        "rotate": false,
                                                        //是否需要表格识别功能，默认不需要。 true：需要 false：不需要
                                                        "table": false,
                                                        //字块返回顺序，false表示从左往右，从上到下的顺序，true表示从上到下，从左往右的顺序，默认false
                                                        "sortPage": false
                                                    },
                                                    url: 'https://ocrapi-advanced.taobao.com/ocrservice/advanced',
                                                    headers: {
                                                        Authorization: 'APPCODE 41d14f8d1c4e405bb2c800e1cfb72272'
                                                    }
                                                };
                                                const result = await axios(config)
                                                    .then(function (response) {
                                                        console.log(response.data);
                                                        return response.data;
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error);
                                                    });
                                                file.status = 'removed';

                                                this.setState({
                                                    text: result.content
                                                })
                                            };
                                            fr.readAsDataURL(file.originFileObj);

                                        }

                                    }}
                                >
                                    <Popconfirm placement="top" title={this.state.text} okText="确认">
                                        <Button style={{transform: 'translateX(900px)'}}
                                        ><Icon type="upload"/>从图片中识别作业内容</Button>
                                    </Popconfirm>

                                </Upload>
                                <FormItem label='上传作业附件' {...formItemLayout} >
                                    {
                                        (
                                            <UploadDemo parent={this} flag='content'/>
                                        )
                                    }
                                </FormItem>
                                <FormItem style={{width: '100%', margin: '0 auto'}} label='参考答案' {...DraftLayout}>
                                    {
                                        (
                                            <DraftDemo parent={this} flag='answer'/>
                                        )
                                    }
                                </FormItem>
                                <FormItem label='上传答案附件' {...formItemLayout} >
                                    {
                                        (
                                            <UploadDemo parent={this} flag='answer'/>
                                        )
                                    }
                                </FormItem></div> : <div>
                                <Collapse defaultActiveKey={['0']} onChange={() => {
                                    this.setState({addChapter: false, addContent: false})
                                }}>{chapterList.map((value, index) => {
                                    return (<Collapse.Panel header={"第"+(index+1)+"题"} key={index}>
                                        {this.state.addChapter ?
                                            <Search
                                                style={{marginBottom: '15px'}}
                                                placeholder="请输入要添加的题目标题，按回车确认！"
                                                enterButton="添加"
                                                onSearch={(value) => {
                                                    if (value === "") {
                                                        message.warning("输入不能为空！", 3);
                                                        return;
                                                    }
                                                    this.addBig(index, value)
                                                }}
                                            /> : null}
                                        <Row>
                                            <Col span={18}>
                                                <TextArea id='assignTextarea' defaultValue={value.text} style={{height:'80px'}} onSubmit={(e)=>{
                                                    this.submitContent(e)
                                                }}/>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Dropdown overlay={ (<Menu>
                                                    <Menu.Item onClick={()=>{
                                                        let chapterString = 'chapter' + (index + 1);
                                                        let modifiedSyllabus = this.state.syllabus;
                                                        let chapterName = modifiedSyllabus[chapterString];
                                                        chapterName.type = "选择题";
                                                        modifiedSyllabus[chapterString] = chapterName;
                                                        console.log(modifiedSyllabus);
                                                        this.setState({syllabus: modifiedSyllabus});
                                                    }}>
                                                        选择题
                                                    </Menu.Item>
                                                    <Menu.Item onClick={()=>{
                                                        let chapterString = 'chapter' + (index + 1);
                                                        let modifiedSyllabus = this.state.syllabus;
                                                        let chapterName = modifiedSyllabus[chapterString];
                                                        chapterName.type = "填空题";
                                                        modifiedSyllabus[chapterString] = chapterName;
                                                        console.log(modifiedSyllabus);
                                                        this.setState({syllabus: modifiedSyllabus});
                                                    }}>
                                                        填空题
                                                    </Menu.Item>
                                                </Menu>)}>
                                                <Button>{value.type}</Button>
                                                </Dropdown>
                                                <Button  onClick={() => {
                                                    this.submitContent(index)
                                                }} style={{marginTop: '10px'}}>保存题干</Button>
                                            </Col>
                                            <Col span={2} offset={1}>
                                                <Button type="primary" onClick={() => {
                                                    this.addBig(index, "题目")
                                                }} style={{}}>添加题目</Button>
                                                <Button  onClick={() => {
                                                    this.deleteBig(index)
                                                }} style={{marginTop: '10px'}}>删除题目</Button>
                                            </Col>
                                        </Row>

                                        <List
                                            rowKey={(text, record) => text.key}
                                            bordered
                                            dataSource={value.content}
                                            renderItem={item => (
                                                <List.Item actions={value.type==='选择题'?[<Button onClick={() => {
                                                    this.setAnswer(index, item)
                                                }} style={{marginLeft: '10px',color : value.answer===item?'green':'black'}}>设为答案</Button>,<Button onClick={() => {
                                                    this.deleteSmall(index, item)
                                                }} style={{marginLeft: '10px'}}>删除选项</Button>]:[<Button onClick={() => {
                                                    this.deleteSmall(index, item)
                                                }} style={{marginLeft: '10px'}}>删除选项</Button>]}>
                                                    <List.Item.Meta
                                                        title={item}
                                                    />
                                                </List.Item>
                                            )}
                                        />
                                        <Search
                                            style={{marginTop: '15px'}}
                                            placeholder="请输入要添加的选项/填空答案，按回车确认！"
                                            enterButton="添加"
                                            onSearch={(value) => {
                                                if (value === "") {
                                                    message.warning("输入不能为空！", 3);
                                                    return;
                                                }
                                                this.addSmall(index, value)
                                            }}
                                        />
                                    </Collapse.Panel>)
                                })}</Collapse>

                            </div>}
                        <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">提交</Button>
                        </FormItem>
                    </Form>
                </Card>
                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
    setAnswer = (index, smallName) => {
        let chapterName = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.syllabus;
        for (let a in modifiedSyllabus) {
            if (a === chapterName) {
                modifiedSyllabus[a].answer = smallName;
            }
        }
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    };
    deleteSmall = (index, smallName) => {
        let chapterName = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.syllabus;
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
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    };
    addSmall = (index, smallName) => {
        let chapterName = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.syllabus;
        for (let a in modifiedSyllabus) {
            if (a === chapterName) {
                let chapter = modifiedSyllabus[a].content;
                chapter.push(smallName);
                modifiedSyllabus[a].content = chapter;
            }
        }
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    };
    addBig = (index, smallName) => {
        let chapterString = 'chapter' + (index + 2);
        let chapterName = {title: smallName, content: [],type:'选择题',text:''};
        let modifiedSyllabus = this.state.syllabus;
        for (let i = modifiedSyllabus.chapterNum; i > index + 1; --i) {
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[mdfChapter] = modifiedSyllabus[prvChapter];
        }
        modifiedSyllabus[chapterString] = chapterName;
        modifiedSyllabus['chapterNum'] = modifiedSyllabus['chapterNum'] + 1;
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    };
    deleteBig = (index) => {
        let modifiedSyllabus = this.state.syllabus;
        if(modifiedSyllabus.chapterNum===1) return;
        for (let i = index + 1; i < modifiedSyllabus.chapterNum; ++i) {
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[prvChapter] = modifiedSyllabus[mdfChapter];
        }
        delete modifiedSyllabus['chapter' + modifiedSyllabus.chapterNum];
        modifiedSyllabus['chapterNum'] = modifiedSyllabus['chapterNum'] - 1;
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    };

    submitContent(index) {
        let value = document.getElementById('assignTextarea').value;
        let chapterString = 'chapter' + (index + 1);
        let modifiedSyllabus = this.state.syllabus;
        let chapterName = modifiedSyllabus[chapterString];
        chapterName.text = value;
        modifiedSyllabus[chapterString] = chapterName;
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    }
}

export default Assign
