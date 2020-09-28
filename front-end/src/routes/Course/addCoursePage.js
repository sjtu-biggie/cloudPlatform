import React from 'react'
import { SettingOutlined } from '@ant-design/icons';
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
    Steps, DatePicker, Upload, Collapse, List
} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import TypingCard from '../../components/TypingCard'
import TextArea from "antd/es/input/TextArea";

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
        text: '获取验证码',
        disabled: false,
        step: 1,
        syllabus: {
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
                message.warning('请先填写正确的表单')
            } else {
                message.success('提交成功')
                console.log(values);
                this.setState({step:1});
            }
        });
    };

    componentWillUnmount() {
        clearInterval(this.timer)
    }

    renderStep = () => {
        let i=1;
        let chapterList=[];
        while (1) {
            let str = 'this.state.syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            else {
                console.log(i);
            }
            chapterList.push(contents);
            ++i;
        }
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
                                <Button type="primary" htmlType="submit">提交</Button>
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
                        <Collapse defaultActiveKey={['1']}>{chapterList.map((value, index) => {
                            return (<Collapse.Panel header={value.title} key={index} extra={genExtra()} >
                                <List
                                    bordered
                                    dataSource={value.content}
                                    renderItem={item => (
                                        <List.Item>
                                            {item}
                                        </List.Item>
                                    )}
                                /></Collapse.Panel>)
                        })}</Collapse>
                    </Card>
                </div>);
            case 2:
                return (null);
            default:
                return (null);
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