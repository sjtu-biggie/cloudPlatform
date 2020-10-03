import React from 'react'
import {SettingOutlined} from '@ant-design/icons';
import {

    Card,
    Cascader,
    Tooltip,
    Icon,
    Form,
    Checkbox,
    Select,
    Input,
    Button,
    Col,
    Row,
    message,
    BackTop,
    Steps, DatePicker, Upload, Collapse, List, Progress
} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import TextArea from "antd/es/input/TextArea";
import StudenTable from '../Manage/studentTable'
import Search from "antd/es/input/Search";

const FormItem = Form.Item;
const Option = Select.Option;
const genExtra = () => (
    <SettingOutlined
        onClick={event => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }}
    />
);

@Form.create()
class AddCourse extends React.Component {
    state = {
        processChapter: 0,
        addContent: false,
        addChapter: false,
        text: '获取验证码',
        disabled: false,
        step: 1,
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
    timer = 0;
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
        let chapterString ='chapter' + (index + 2);
        let chapterName = {title:smallName,content:[]};
        let modifiedSyllabus = this.state.syllabus;
        for(let i=modifiedSyllabus.chapterNum;i>index+1;--i){
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[mdfChapter]=modifiedSyllabus[prvChapter];
        }
        modifiedSyllabus[chapterString] = chapterName;
        modifiedSyllabus['chapterNum']=modifiedSyllabus['chapterNum']+1;
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    };
    deleteBig = (index)=>{
        let modifiedSyllabus = this.state.syllabus;
        for(let i=index+1;i<modifiedSyllabus.chapterNum;++i){
            let prvChapter = 'chapter' + i;
            let mdfChapter = 'chapter' + (i + 1);
            modifiedSyllabus[prvChapter]=modifiedSyllabus[mdfChapter];
        }
        delete modifiedSyllabus[ 'chapter'+modifiedSyllabus.chapterNum];
        modifiedSyllabus['chapterNum']=modifiedSyllabus['chapterNum']-1;
        console.log(modifiedSyllabus);
        this.setState({syllabus: modifiedSyllabus});
    };
    countdown = (e) => {
        let time = 60;
        this.setState({
            text: --time + 's',
            disabled: true
        });
        this.timer = setInterval(() => {
            if (time > 0) {
                this.setState({
                    text: --time + 's',
                    disabled: true
                })
            } else {
                this.setState({
                    text: '获取验证码',
                    disabled: false
                })
            }
        }, 1000)
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (err) {
                message.warning('请填写正确的课程信息')
            } else {
                message.success('提交成功');
                console.log(values);
                this.setState({step: 1});
            }
        });
    };

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    renderStep = () => {
        let i = 1;
        let chapterList = [];
        while (1) {
            let str = 'this.state.syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            chapterList.push(contents);
            ++i;
        }
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
        const courseSelector = getFieldDecorator('prefix', {
            initialValue: '一年级',
        })(
            <Select style={{width: 100}}>
                <Option value={1}>一年级</Option>
                <Option value={2}>二年级</Option>
                <Option value={3}>三年级</Option>
                <Option value={4}>四年级</Option>
                <Option value={5}>五年级</Option>
                <Option value={6}>六年级</Option>
                <Option value={7}>七年级</Option>
                <Option value={8}>八年级</Option>
                <Option value={9}>九年级</Option>
                <Option value={10}>通用</Option>
            </Select>
        );
        const normFile = e => {
            console.log('Upload event:', e);
            if (Array.isArray(e)) {
                return e;
            }
            return e && e.fileList;
        };
        switch (this.state.step) {
            case 0:
                return (<div>
                    <Card bordered={false} className='card-item'>
                        <Steps>
                            <Steps.Step status="process" title="创建一门课程" icon={<Icon type="plus-circle-o"/>}/>
                            <Steps.Step status="wait" title="添加课程细节"
                                        icon={<Icon type="book"/>}/>
                            <Steps.Step status="wait" title="选取学生加入"
                                        icon={<Icon type="solution"/>}/>
                            <Steps.Step status="wait" title="完成" icon={<Icon type="check"/>}/>
                        </Steps>
                    </Card>
                    <Card bordered={false} title='基本信息'>
                        <Form layout='horizontal' style={{width: '80%', margin: '0 auto'}} onSubmit={this.handleSubmit}>
                            <FormItem label='课程类型' {...formItemLayout}>
                                {
                                    getFieldDecorator('course_name', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请选择课程类型'
                                            }
                                        ]
                                    })(
                                        <Input addonBefore={courseSelector}/>
                                    )
                                }
                            </FormItem>
                            <FormItem label='课程教材' {...formItemLayout}>
                                {
                                    getFieldDecorator('textbook', {
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
                                        rules: [
                                            {
                                                max: 80,
                                                message: '详细介绍不能超过三百个字'
                                            },
                                        ]
                                    })(
                                        <TextArea style={{height: '150px'}}/>
                                    )
                                }
                            </FormItem>
                            <FormItem label="课程图片" valuePropName="fileList"
                                      getValueFromEvent={normFile} {...formItemLayout}>
                                {
                                    getFieldDecorator('pic', {
                                        rules: [
                                            {
                                                required: true,
                                                message: '请上传课程简介图片'
                                            }
                                        ]
                                    })(
                                        <Upload.Dragger name="files" action="/upload.do">
                                            <p className="ant-upload-drag-icon">
                                            </p>
                                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                                        </Upload.Dragger>
                                    )
                                }

                            </FormItem>
                            <FormItem label='开始时间' {...formItemLayout} required>
                                {
                                    getFieldDecorator('start_date', {
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
                                    getFieldDecorator('end_date', {
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
                            <FormItem style={{textAlign: 'center'}} {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">下一步</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </div>);
            case 1:
                return (<div>
                    <Card bordered={false} className='card-item'>
                        <Steps>
                            <Steps.Step status="finish" title="创建一门课程" icon={<Icon type="plus-circle-o"/>}/>
                            <Steps.Step status="process" title="添加课程细节"
                                        icon={<Icon type="book"/>}/>
                            <Steps.Step status="wait" title="选取学生加入"
                                        icon={<Icon type="solution"/>}/>
                            <Steps.Step status="wait" title="完成" icon={<Icon type="check"/>}/>
                        </Steps>
                    </Card>
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
                            <Col offset={10}>
                                <Button onClick={() => {
                                    this.setState({step: 0})
                                }} style={{marginTop: '20px', size: 'large'}}>上一步</Button>
                                <Button onClick={() => {
                                    this.setState({step: 2})
                                }} style={{marginTop: '20px', size: 'large', marginLeft: '20px'}}>下一步</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>);
            case 2:
                return <div>
                    <Card bordered={false} className='card-item'>
                        <Steps>
                            <Steps.Step status="finish" title="创建一门课程" icon={<Icon type="plus-circle-o"/>}/>
                            <Steps.Step status="finish" title="添加课程细节"
                                        icon={<Icon type="book"/>}/>
                            <Steps.Step status="process" title="选取学生加入"
                                        icon={<Icon type="solution"/>}/>
                            <Steps.Step status="wait" title="完成" icon={<Icon type="check"/>}/>
                        </Steps>
                    </Card>
                    <StudenTable/>;
                    <Row>
                        <Col offset={10}>
                            <Button onClick={() => {
                                this.setState({step: 1})
                            }} style={{marginTop: '20px', size: 'large'}}>上一步</Button>
                            <Button onClick={() => {
                                this.setState({step: 3})
                            }} style={{marginTop: '20px', size: 'large', marginLeft: '20px'}}>下一步</Button>
                        </Col>
                    </Row>
                </div>;
            default:
                return <div>
                    <Card bordered={false} className='card-item'>
                        <Steps>
                            <Steps.Step status="finish" title="创建一门课程" icon={<Icon type="plus-circle-o"/>}/>
                            <Steps.Step status="finish" title="添加课程细节"
                                        icon={<Icon type="book"/>}/>
                            <Steps.Step status="finish" title="选取学生加入"
                                        icon={<Icon type="solution"/>}/>
                            <Steps.Step status="process" title="完成" icon={<Icon type="check"/>}/>
                        </Steps>
                    </Card>
                    <Card bordered={false} className='card-item'>
                        <Row>
                            <Col offset={10}>
                                <Progress type="circle" percent={100} style={{}}/>
                            </Col>
                            <Col style={{marginTop: '20px'}} span={12} offset={7}>
                                <h1>你已经成功创建课程！若要为课程发布公告，布置作业等，请进入课程主页。</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col offset={10}>
                                <Button onClick={() => {
                                }} style={{marginTop: '20px', size: 'large'}} type="primary">进入课程主页</Button>

                            </Col>
                        </Row>
                    </Card>
                </div>;
        }
    };

    render() {
        return (
            <div>
                <CustomBreadcrumb arr={['课程', '添加课程']}/>
                {this.renderStep()}

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

export default AddCourse