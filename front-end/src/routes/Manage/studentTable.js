/* eslint-disable */
import React, {Component, createRef} from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload} from 'antd';
import styles from './index.css';
import {Router} from "react-router-dom";
import axios from "axios";
import {createAtom} from "mobx";

let index = 0;
const getMockData = () => {
    const result = {
        nickname: 'student',
        sid: index,
        theClass: 'class' + index,
        grade: (Math.random() * 100).toFixed(2),
    };
    index += 1;
    return result;
};

const columns = [
    {title: '姓名', dataIndex: 'nickname'},
    {title: '学号', dataIndex: 'sid'},
    {title: '班级', dataIndex: 'theClass'},
    {title: '分数', dataIndex: 'grade'},
];

const columns1 = [
    {title: '姓名', dataIndex: 'nickname'},
    {title: '学号', dataIndex: 'sid'},
    {title: '班级', dataIndex: 'theClass'},
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

columns1.map(item => {
    item.sorter = (a, b) => {
        if (!isNaN(a[item.dataIndex]) && !isNaN(b[item.dataIndex])) {
            return a[item.dataIndex] - b[item.dataIndex];
        }
        const aa = a[item.dataIndex] || '';
        const bb = b[item.dataIndex] || '';
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
        const {edit, editValue} = this.state;
        return (edit ? <Input autoFocus style={{width: 100}}
                              value={editValue}
                              onChange={event => this.setState({editValue: event.target.value})}
                              onBlur={() => {
                                  this.setState({edit: false});
                                  this.props.onChange(editValue);
                              }}/> :
            <div style={{width: 100}} onDoubleClick={() => this.setState({edit: true})}>
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
            search3: '',
            orData: '',
            renderData: '',
            orData2: '',
            renderData2: '',
            modifyIds: [],
            classIds: [],
            courseId: '',
            sids: [],
            delUserId:'',
        };
        this.searchInput = createRef();


        columns.forEach(item => {
            const {dataIndex, title} = item;
            item.filterDropdown = ({setSelectedKeys, selectedKeys, confirm}) => (
                <div style={{padding: 8}}>
                    <Input
                        allowClear
                        ref={this.searchInput}
                        placeholder={`搜索 ${title}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Button
                        type="primary"
                        onClick={confirm}
                        size="small"
                        style={{width: 90}}
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

        columns1.forEach(item => {
            const {dataIndex, title} = item;
            item.filterDropdown = ({setSelectedKeys, selectedKeys, confirm}) => (
                <div style={{padding: 8}}>
                    <Input
                        allowClear
                        ref={this.searchInput}
                        placeholder={`搜索 ${title}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Button
                        type="primary"
                        onClick={confirm}
                        size="small"
                        style={{width: 90}}
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
            const {orData, search} = this.state;
            console.log(this.state.sids);
            console.log(this.props.class);
            var classIds = this.props.class.split(',');
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
            this.setState({renderData: filterData});
        };

        this.handleSearch2 = () => {
            const {orData2, search2} = this.state;
            const filterData = orData2.filter(row => {
                if (!search2) return true;
                const keys = columns.map(item => item.dataIndex);
                for (let i = 0; i < keys.length - 1; i++) {
                    if (String(row[keys[i]] || '').toLowerCase().includes(search2.toLowerCase())) return true;
                }
                return false;
            });
            this.setState({renderData2: filterData});
        };

        this.handleSearch3 = () => {
            const {orData2, search3} = this.state;
            const filterData = orData2.filter(row => {
                if (!search3) return true;
                const keys = columns.map(item => item.dataIndex);
                for (let i = 0; i < keys.length; i++) {
                    if (String(row[keys[i]] || '').toLowerCase() === search3.toLowerCase()) return true;
                }
                return false;
            });
            this.setState({renderData2: filterData});
        };

        this.registerClass = (students) => {
            console.log(students,this.state.courseId);
            axios({
                method: 'POST',
                url: 'http://124.70.201.12:8787/course/register',
                data: {
                    "courseId": this.state.courseId,
                    "student": students,
                    "joinDate": "2020-10-01 12:12:12"
                }
            }).then(msg => {
                console.log(msg)
                students.map(item=>{
                    if (item.username===undefined){
                        axios({
                            method:'POST',
                            url:'http://124.70.201.12:8000/getUserMessage',
                            data:{
                                "username":item.userId
                            }
                        }).then(res=>{
                            console.log(res);
                            let tos=[];
                            tos.push(res.data.email);
                            console.log(tos);
                            axios({
                                method:'POST',
                                url:'http://124.70.201.12:8000/sendNotice',
                                data:{
                                    "tos":tos,
                                    "context":"已经把你添加到课程"+this.state.courseId
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else {
                        let tos=[];
                        tos.push(item.email);
                        console.log(tos);
                        axios({
                            method:'POST',
                            url:'http://124.70.201.12:8000/sendNotice',
                            data:{
                                "tos":tos,
                                "context":"已经把你添加到课程"+this.state.courseId
                            }
                        }).then(res=>{
                            console.log(res);
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                })

            }).catch(err => {
                console.log(err)
            })
            console.log("注册学生");
        };

        this.deleteRegister = (record) => {
            console.log("调用从班级删除学生");
            console.log(record);
            let name;
            if(record.username===undefined){
                name=record.userId;
            }else {
                name=record.username;
            }
            console.log(name);
            console.log(this.state.courseId);
            axios({
                method: 'POST',
                url: 'http://124.70.201.12:8787/course/deleteCourseStudent',
                data: {
                    "courseId": this.state.courseId,
                    "userId": name
                }
            }).then(msg => {
                console.log(msg)
                axios({
                    method:'POST',
                    url:'http://124.70.201.12:8000/getUserMessage',
                    data:{
                        "username":name
                    }
                }).then(res=>{
                    console.log(res);
                    let tos=[];
                    tos.push(res.data.email);
                    axios({
                        method:'POST',
                        url:'http://124.70.201.12:8000/sendNotice',
                        data:{
                            tos:tos,
                            "context":"已经把你从课程"+this.state.courseId+"删除",
                        }
                    }).then(res=>{
                        console.log(res);
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            }).catch(err => {
                console.log(err)
            })
        }

        this.updateCourseStudent=(record)=>{
            console.log(record);
            axios({
                method:'POST',
                url:'http://124.70.201.12:8787/course/updateCourseStudent',
                data:{
                    "courseId":this.state.courseId,
                    "userId":record.userId,
                    "grade":record.grade
                }
            }).then(msg=>{
                console.log(msg);
            }).catch(err=>{
                console.log(err)
            })
            console.log("完成分数更新");
        }
    }

    componentWillReceiveProps=(nextProps, nextContext) =>{
        this.setState({
            courseId:nextProps.courseId,
        });
        console.log(nextProps)

    };

    componentWillMount=()=> {
        const myCourseId = this.props.courseId;
        this.setState({
            courseId:myCourseId
        })
        const mySids = new Array();
        const myclassIds = this.props.class.split(',');
        console.log(myclassIds);
        console.log(myCourseId);

        axios.all([
            axios({
                method: "POST",
                url: "http://124.70.201.12:8000/getAllUsersByClassIds",
                data: {
                    classIds: myclassIds
                }
            }),
            axios({
                method: "GET",
                url: 'http://124.70.201.12:8787/course/getCourseStudent',
                params: {
                    courseId: myCourseId
                }
            })
        ]).then(res => {
            console.log(res[0]);
            console.log(res[1]);
            var data2 = res[0].data;
            var data1 = res[1].data;
            data1.map(item => {
                console.log(item);
                mySids.push(item.sid);
                return item;
            });
            console.log(mySids);
            var filterData = data2.filter(item => {
                    // console.log(item.sid);
                    // console.log(mySids.indexOf(item.sid.toLocaleString()));
                    // console.log(mySids.includes(item.sid));
                    if (!mySids.includes(item.sid)&&item.type!=="teacher"&&item.type!=="manager") {
                        return item;
                    }
                    return null;
                }
            );
            console.log(filterData);
            this.setState({
                orData: data1,
                renderData: data1,
                orData2: filterData,
                renderData2: filterData,
                sid: mySids,
                classIds: myclassIds,
            })
        }).catch(err => {
            console.log(err);
        })

    }


    render = () => {
        const {orData, search, orData2, search2, search3, renderData, renderData2, modifyIds} = this.state;
        return (
            <div className={styles.normal}>
                <Row>
                    <Col span={12}>
                        <Card title={<div style={{textAlign: "center"}}>上课学生</div>}>
                            <Card className={styles.control} bordered={false}
                                  style={{marginBottom: 10, height: '100px'}}>
                                <Row>
                                    <Col span={16}>
                                        <Input style={{width: 500, marginRight: 16}}
                                               value={search}
                                               allowClear
                                               onChange={event => this.setState({search: event.target.value})}/>
                                    </Col>
                                    <Col span={2} offset={1}>
                                        <Button
                                            onClick={this.handleSearch}>搜索</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </Col>
                                </Row>
                            </Card>
                            <Card bordered={false} style={{marginBottom: 10, height: 770}}>
                                <Table
                                    rowKey={'sid'}
                                    columns={[...columns.map((item, idx) => ({
                                        ...item,
                                        render: (text, record) => {
                                            return (idx !== 0 || this.props.newCourse ? <EditText onChange={value => {
                                                    const newData = [...orData];
                                                    newData.find(col => col.sid === record.sid)[item.dataIndex] = value;
                                                    this.updateCourseStudent(record);
                                                    this.setState({orData: newData});
                                                }}>{text}</EditText> :
                                                <a href={"/home/manage/data/" + record.userId + "/" + this.props.courseId + "/"}>{text}</a>)
                                        },
                                    })), {
                                        name: '操作',
                                        key: 'del',
                                        render: record => (
                                            <a size={"small"} onClick={() => {
                                                // console.log(item.sid);
                                                console.log(record);
                                                var fileterData=this.state.orData.filter(item => item.sid !== record.sid);
                                                this.setState({
                                                    orData: fileterData,
                                                    renderData:fileterData,
                                                    orData2: [record, ...orData2],
                                                    renderData2:[record, ...orData2],
                                                    delUserId:record.userId
                                                }, () => {
                                                    this.handleSearch();
                                                    this.handleSearch2();
                                                    this.deleteRegister(record);
                                                });
                                            }}>删除</a>),
                                    }]}
                                    dataSource={renderData}/>
                            </Card>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={<div style={{textAlign: "center"}}>未上课学生</div>}>
                            <Card bordered={false} style={{marginBottom: 10, height: '100px'}}>
                                <div className={styles.control}>
                                    <Button
                                        type={'primary'}
                                        onClick={item => {
                                            var newData = [...orData2];
                                            console.log(orData2);
                                            console.log(this.state.modifyIds)
                                            const selectData = newData.filter(item => {
                                                console.log(item);
                                                if (modifyIds.includes(item.sid)) {
                                                    return item;
                                                }
                                                return null;
                                            });
                                            const notSelectData = newData.filter(item => !modifyIds.includes(item.sid));
                                            console.log(selectData);
                                            console.log(notSelectData);
                                            this.setState({
                                                orData: [...selectData, ...orData],
                                                renderData:[...selectData, ...orData],
                                                orData2: notSelectData,
                                                renderData2:notSelectData,
                                            }, () => {
                                                this.handleSearch();
                                                this.handleSearch2();
                                                this.registerClass(selectData);
                                            });
                                        }}
                                    >添加到上课表</Button>
                                    <Input style={{width: 400, marginLeft: 16, marginRight: 16}}
                                           value={search2}
                                           allowClear
                                           onChange={event => this.setState({search2: event.target.value})}/>
                                    <Button onClick={this.handleSearch2} style={{marginBottom: 10}}>模糊搜索</Button>
                                </div>
                                <div className={styles.control}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <Input style={{width: 400, marginLeft: 16, marginRight: 16}}
                                           value={search3}
                                           allowClear
                                           onChange={event => this.setState({search3: event.target.value})}/>
                                    <Button onClick={this.handleSearch3}>精确搜索</Button>
                                </div>
                            </Card>
                            <Card bordered={false} style={{marginBottom: 10, height: 770}}>
                                <Table
                                    rowKey={'sid'}
                                    columns={columns1}
                                    dataSource={renderData2}
                                    rowSelection={{
                                        type: 'checkbox',
                                        selectedRowKeys: modifyIds,
                                        onChange: ids => this.setState({modifyIds: ids}),
                                    }}
                                />
                            </Card>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

