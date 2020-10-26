/* eslint-disable */
import React, { Component, createRef } from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload} from 'antd';
import styles from './index.css';
import {Router} from "react-router-dom";
import axios from "axios";

let index = 0;
const getMockData = () => {
    const result = {
        nickname:'student',
        sid: index,
        theClass: 'class' + index,
        grade: (Math.random()*100).toFixed(2),
    };
    index += 1;
    return result;
};

const columns = [
    { title: '姓名', dataIndex: 'nickname' },
    { title: '学号', dataIndex: 'sid' },
    { title: '班级', dataIndex: 'theClass' },
    { title: '分数', dataIndex: 'grade'},
];

const columns1=[
    {title:'姓名',dataIndex:'nickname'},
    {title:'学号',dataIndex:'sid'},
    {title:'班级',dataIndex:'theClass'},
];

//排序使用
columns.map(item => {
    item.sorter = (a, b) => {
        if (!isNaN(a[item.dataIndex]) && !isNaN(b[item.dataIndex])) {
            return a[item.dataIndex] - b[item.dataIndex];
        }
        const aa = a[item.dataIndex] || '';
        const bb = b[item.dataIndex] || '';
        return String(aa).localeCompare(String(bb));
    };
});

columns1.map(item=>{
    item.sorter=(a,b)=>{
        if(!isNaN(a[item.dataIndex])&&!isNan(b[item.dataIndex])){
            return a[item.dataIndex]-b[item.dataIndex];
        }
        const aa=a[item.dataIndex]||'';
        const bb=b[item.dataIndex]||'';
        return String(aa).localeCompare(String(bb));
    }
})

//编辑单元格使用
class EditText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            editValue: props.children,
        };
    }

    render() {
        const { edit, editValue } = this.state;
        return (edit ? <Input autoFocus style={{ width: 100 }}
                              value={editValue}
                              onChange={event => this.setState({ editValue: event.target.value })}
                              onBlur={() => {
                                  this.setState({ edit: false });
                                  this.props.onChange(editValue);
                              }}/> :
            <div style={{ width: 100 }} onDoubleClick={() => this.setState({ edit: true })}>
                {this.props.children || <span>&nbsp;</span>}
            </div>);
    }
};

export default class Manager extends Component {
    //props里有 courseId(课程id),class(课程班级),newCourse(为true时是刚创建的课程，不能访问学生数据)
    //左边已上课学生应从后端拿到存在state里，右边未上课学生应先拿到班级所有学生，再减去已上课学生
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            search2: '',
            search3:'',
            orData: '',
            renderData: '',
            orData2: '',
            renderData2: '',
            modifyIds: [],
            classIds:[],
            courseId:'',
            sids:[],
        };
        this.searchInput = createRef();


        columns.forEach(item => {
            const { dataIndex, title } = item;
            item.filterDropdown = ({ setSelectedKeys, selectedKeys, confirm }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        allowClear
                        ref={this.searchInput}
                        placeholder={`搜索 ${title}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={confirm}
                        size="small"
                        style={{ width: 90 }}
                    >
                        搜索
                    </Button>
                </div>
            );
            item.onFilter = (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '';
            item.onFilterDropdownVisibleChange = visible => {
                if (visible) {
                    setTimeout(() => this.searchInput.current.select(), 100);
                }
            };
        });

        this.handleSearch = () => {
            const { orData, search } = this.state;
            console.log(this.state.sids);
            console.log(this.props.class);
            var classIds=this.props.class.split(',');
            console.log(classIds[1]);
            console.log(classIds[0]);
            console.log(classIds);
            const filterData = orData.filter(row => {
                if (!search) return true;
                const keys = columns.map(item => item.dataIndex);
                for (let i = 0; i < keys.length; i++) {
                    if (String(row[keys[i]] || '').toLowerCase().includes(search.toLowerCase())) return true;
                }
                return false;
            });
            this.setState({ renderData: filterData });
        };

        this.handleSearch2 = () => {
            const { orData2, search2 } = this.state;
            const filterData = orData2.filter(row => {
                if (!search2) return true;
                const keys = columns.map(item => item.dataIndex);
                for (let i = 0; i < keys.length-1; i++) {
                    if (String(row[keys[i]] || '').toLowerCase().includes(search2.toLowerCase())) return true;
                }
                return false;
            });
            this.setState({ renderData2: filterData });
        };

        this.handleSearch3 = () => {
            const { orData2, search3 } = this.state;
            const filterData = orData2.filter(row => {
                if (!search3) return true;
                const keys = columns.map(item => item.dataIndex);
                for (let i = 0; i < keys.length; i++) {
                    if (String(row[keys[i]] || '').toLowerCase()===search3.toLowerCase()) return true;
                }
                return false;
            });
            this.setState({ renderData2: filterData });
        };

        this.registerClass=(students)=>{
            axios({
                method:'POST',
                url:'http://106.13.209.140:8787/course/register',
                data:{
                    "courseId":this.state.courseId,
                    "student":students,
                    "joinDate":"2020-10-01 12:12:12"
                }
            }).then(msg=>{
                console.log(msg)
            }).catch(err=>{
                console.log(err)
            })
            console.log("注册学生");
        };

        this.deleteRegister=()=>{
            console.log("调用从班级删除学生")
            axios({
                method:'POST',
                url:'http://106.13.209.140:8787/course/deleteRegister',
                data:{
                    "courseId":this.state.courseId,
                    "sids":["12","321"]
                }
            }).then(msg=>{
                console.log(msg)
            }).catch(err=>{
                console.log(err)
            })

        }

    }

    componentDidMount() {
        console.log(this.props.class);
        console.log(this.props.class.split(','));
        const tmp=this.props.class.split(',');
        console.log(tmp);
        console.log(this.props.courseId);
        console.log(typeof (this.props.classIds));
        this.setState({
            courseId:this.props.courseId,
            classIds:this.props.class.split(',')
        })
        axios({
            method:'GET',
            url:'http://106.13.209.140:8787/course/getCourseStudent',
            params:{
                courseId:this.props.courseId
            }
        }).then(msg=>{
            console.log(msg.data)
            console.log(msg.data.length)
            msg.data.map(item=>{
                this.state.sids.push(item.sid);
                return item;
            })
            console.log(this.state.sids);
            this.setState({
                orData:msg.data,
                renderData:msg.data,
            })
        }).catch(err=>{
            console.log(err)
        })


        axios({
            method:'POST',
            url:'http://106.13.209.140:8000/getAllUsersByClassIds',
            data:{
                classIds:this.props.class.split(',')
            }
        }).then(msg=>{
            console.log(typeof(this.props.classIds));
            const aa=this.props.class.split(',');
            console.log(typeof(aa));
            console.log(msg.data);
            console.log("fsda");
            var newData=msg.data;
            console.log(this.state.sids);
            var tryData=newData.filter(item=>
            {
                console.log(item.sid);
                console.log(this.state.sids.indexOf(item.sid));
                if (this.state.sids.indexOf(item.sid)==-1){
                    return item;
                }
            }
            );
            console.log(tryData);
            this.setState({
                orData2:tryData,
                renderData2:tryData,
            })
        }).catch(err=>{
            console.log(err)
        })

    }


    render=()=> {
        const { orData, search, orData2, search2,search3, renderData, renderData2, modifyIds } = this.state;
        return (
            <div className={styles.normal}>
                <Row>
                <Col span={12}>
                    <Card title={<div style={{textAlign:"center"}}>上课学生</div>} >
                        <Card className={styles.control} bordered={false} style={{ marginBottom: 10,height:'100px' }}>
                            <Row>
                                <Col span={16}>
                            <Input style={{ width: 500, marginRight: 16 }}
                                   value={search}
                                   allowClear
                                   onChange={event => this.setState({ search: event.target.value })}/>
                                </Col>
                                <Col span={2} offset={1}>
                            <Button   onClick={this.handleSearch}>搜索</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Col>
                            </Row>
                        </Card>
                        <Card bordered={false} style={{ marginBottom: 10, height: 770 }}>
                            <Table
                                rowKey={'sid'}
                                columns={[...columns.map((item,idx) => ({
                                    ...item,
                                    render: (text, record) => {
                                        return(idx!==0||this.props.newCourse?<EditText onChange={value => {
                                        const newData = [...orData];
                                        newData.find(col => col.sid === record.sid)[item.dataIndex] = value;
                                        this.setState({ orData: newData });
                                    }}>{text}</EditText>:<a href={"/home/manage/data/"+record.userId+"/"+this.props.courseId+"/"}>{text}</a>)},
                                })), {
                                    name: '操作',
                                    key: 'del',
                                    render: record => (
                                        <a size={"small"} onClick={() => {
                                            // console.log(item.sid);
                                            console.log(record);
                                            this.setState({
                                                orData: orData.filter(item => item.sid !== record.sid),
                                                orData2: [record, ...orData2],
                                            }, () => {
                                                this.handleSearch();
                                                this.handleSearch2();
                                                this.deleteRegister();
                                            });
                                        }}>删除</a>),
                                }]}
                                dataSource={renderData}/>
                        </Card>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={<div style={{textAlign:"center"}}>未上课学生</div>}>
                        <Card bordered={false} style={{ marginBottom: 10 ,height:'100px'}} >
                            <div className={styles.control}>
                                <Button
                                    type={'primary'}
                                    onClick={item => {
                                        var newData=[...orData2];
                                        console.log(orData2);
                                        console.log(this.state.modifyIds)
                                        const selectData=newData.filter(item => {
                                            console.log(item);
                                           if ( modifyIds.includes(item.sid))
                                           {return item;}
                                        return null;});
                                        const notSelectData = newData.filter(item => !modifyIds.includes(item.sid));
                                        console.log(selectData);
                                        console.log(notSelectData);
                                        this.setState({
                                            orData: [...selectData, ...orData],
                                            orData2: notSelectData,
                                        }, () => {
                                            this.handleSearch();
                                            this.handleSearch2();
                                            this.registerClass(selectData);

                                        });
                                    }}
                                >添加到上课表</Button>
                                <Input style={{ width: 400, marginLeft: 16, marginRight: 16 }}
                                       value={search2}
                                       allowClear
                                       onChange={event => this.setState({ search2: event.target.value })}/>
                                <Button onClick={this.handleSearch2} style={{marginBottom:10}}>模糊搜索</Button>
                            </div>
                                <div className={styles.control}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Input style={{ width: 400, marginLeft: 16, marginRight: 16 }}
                                       value={search3}
                                       allowClear
                                       onChange={event => this.setState({search3:event.target.value})}/>
                                       <Button onClick={this.handleSearch3}>精确搜索</Button>
                            </div>
                        </Card>
                        <Card bordered={false} style={{ marginBottom: 10, height: 770 }}>
                            <Table
                                rowKey={'sid'}
                                columns={columns1}
                                dataSource={renderData2}
                                rowSelection={{
                                    type: 'checkbox',
                                    selectedRowKeys: modifyIds,
                                    onChange: ids => this.setState({ modifyIds: ids }),
                                }}/>
                        </Card>
                    </Card>
                </Col>
                </Row>
            </div>
        );
    }
}

