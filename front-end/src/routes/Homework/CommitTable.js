/* eslint-disable */
import React, { Component, createRef ,useState} from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload, Tag} from 'antd';
import styles from './index.css';
import axios from 'axios'
import * as XLSX from 'xlsx';

import {Router} from "react-router-dom";
import {withRouter} from "react-router-dom";

const columns = [
    { title: '用户名', dataIndex: 'username',key:'username' },
    { title: '学号', dataIndex: 'sid' , key: 'sid'},
    { title: '昵称', dataIndex: 'nickname' , key: 'nickname'},
    { title: '班级', dataIndex: 'theClass' , key: 'theClass'},
    { title: '提交状态', dataIndex: 'commit', key: 'commit',
        render: commit => <a style={{fontStyle:'#FF0000'}}>{commit}</a>
        ,
        // render: tags => {
        //         commit.map(com => {
        //         let color;
        //         if (com === "未提交") {
        //         color = 'volcano';
        //     }
        //         else if (com === "迟交"){
        //         color = 'volcano';
        //     }
        //         else {
        //         color = 'volcano';
        //     }
        //         return (
        //         <Tag color={color}>
        //         {com}
        //         </Tag>
        //         );
        //     })}
    },
    { title: '提交时间', dataIndex: 'handinTime',key: 'handinTime'},
    { title: '是否批改', dataIndex: 'correct' , key: 'correct' },
    { title: '成绩', dataIndex: 'theGrade', key: 'theGrade' },
];


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

@withRouter
export default class  STable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handinAlready:10000,
            data:null,
            search: '',
            search2: '',
            search3:'',
            delData:'',
            orData: null,
            renderData: null,
            modifyIds: [],
            homework: null,
            studentHomework:null,
            homeworkId:0,
            studentInfo:null
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

        this.format = (shijianchuo) => {
            let time = new Date(shijianchuo);
            let y = time.getFullYear();
            let m = time.getMonth() + 1;
            let d = time.getDate();
            let h = time.getHours();
            let mm = time.getMinutes();
            let s = time.getSeconds();
            return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
        };

        this.add0 = (m) => {
            return m < 10 ? '0' + m : m
        }

        this.handleSearch = () => {
            const { orData, search } = this.state;
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
                for (let i = 0; i < keys.length; i++) {
                    if (String(row[keys[i]] || '').toLowerCase().includes(search2.toLowerCase())) return true;
                }
                return false;
            });
            this.setState({ renderData2: filterData });
        };

        this.deleteData=()=>{
        };

        this.getStudentInfo = async (obj,indexStudentHomeworks)=>{
            let already = 0;
            let sum = 0;
            if(indexStudentHomeworks.length===0){
                // message.error("fuck!");
                return null;
            }
            console.log(obj);
            let config = {
                method: 'post',
                data : obj,
                url: 'http://124.70.201.12:8000/getAllUsersByClassIds',
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

            for(let i = 0; i < list1.length; ++i){
                if (list1[i].type === 'teacher')
                    list1.splice(i,1);
            }
            let list2 = Array.from(indexStudentHomeworks);
            console.log(list1);
            console.log(list2);

            for (let j of list2){
                if (j.score !==null) already+=1;
            }
            console.log(already,list2.length);
            let data = [];
            for (let i = 0; i < list1.length; ++i){
                let j;
                for(j =0;j<list2.length;++j){
                    if(list2[j].studentId===list1[i].username){
                        break;
                    }
                }
                if(j===list2.length) continue;
                if (list2[j].score !== null){
                    if (list2[j].handinTime <= this.props.homework.endTime){
                        data.push({
                            _index:list2[j]._index,
                            username: list1[i].username,
                            sid: list1[i].sid,
                            nickname: list1[i].nickname,
                            theClass: list1[i].theClass,
                            theGrade: list2[j].score,
                            handinTime: this.format(list2[j].handinTime),
                            commit: '已提交',
                            correct:'已批改',
                            tags: ['迟交'],
                            endTime: this.props.homework.endTime
                        })
                    }
                    else {
                        data.push({
                            _index:list2[j]._index,
                            username: list1[i].username,
                            sid: list1[i].sid,
                            nickname: list1[i].nickname,
                            theClass: list1[i].theClass,
                            theGrade: list2[j].score,
                            handinTime: this.format(list2[j].handinTime),
                            commit: '迟交',
                            tags: ['迟交'],
                            correct:'已批改',
                            endTime: this.props.homework.endTime
                        })
                    }
                }
                else{
                    if (list2[j].handinTime !== null){
                        if (list2[j].handinTime <= this.props.homework.endTime){
                            data.push({
                                _index:list2[j]._index,
                                username: list1[i].username,
                                sid: list1[i].sid,
                                nickname: list1[i].nickname,
                                theClass: list1[i].theClass,
                                theGrade: list2[j].score,
                                handinTime: this.format(list2[j].handinTime),
                                commit: '已提交',
                                tags: ['已提交'],
                                correct:'未批改',
                                endTime: this.props.homework.endTime
                            })
                        }
                        else {
                            data.push({
                                _index:list2[j]._index,
                                username: list1[i].username,
                                sid: list1[i].sid,
                                nickname: list1[i].nickname,
                                theClass: list1[i].theClass,
                                theGrade: null,
                                handinTime: this.format(list2[j].handinTime),
                                commit: '迟交',
                                tags: ['迟交'],
                                correct:'未批改',
                            })
                        }
                    }
                    else{
                        data.push({
                            _index:list2[j]._index,
                            username: list1[i].username,
                            sid: list1[i].sid,
                            nickname: list1[i].nickname,
                            theClass: list1[i].theClass,
                            theGrade: null,
                            commit: '未提交',
                            correct:'未批改',
                        })
                    }
                }
            }

            this.setState({
                studentInfo:studentInfo,
                data:data,
                orData: data,
                renderData: data
            });

            console.log(this.state.data);
        };

    }

    componentWillMount() {
        console.log(this.props);
        let indexStudentHomeworks=[];
        for(let i =0;i<this.props.studentHomework.length;++i){
            let indexStudentHomework = this.props.studentHomework[i];
            indexStudentHomework._index  = i;
            indexStudentHomeworks.push(indexStudentHomework);
        }
        this.setState({
            studentHomework: indexStudentHomeworks,
            homework: this.props.homework,
            homeworkId: this.props.homeworkId,
            handinAlready:this.props.handinAlready,
        });
        let array = this.props.homework.range.split(",");
        this.props.homework.classIds = array;
        this.getStudentInfo(this.props.homework,indexStudentHomeworks);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        console.log(nextProps);
        let indexStudentHomeworks=[];
        for(let i =0;i<nextProps.studentHomework.length;++i){
            let indexStudentHomework = nextProps.studentHomework[i];
            indexStudentHomework._index  = i;
            indexStudentHomeworks.push(indexStudentHomework);
        }
        this.setState({
            studentHomework: indexStudentHomeworks,
            homework: nextProps.homework,
            homeworkId: nextProps.homeworkId,
            handinAlready:nextProps.handinAlready,
        });
        // if(Object.prototype.toString.call(nextProps.homework.range).indexOf('Array') === -1){
        //     let array = nextProps.homework.range.split(",");
        //     nextProps.homework.range = array;
        // }
        let array = nextProps.homework.range.split(",");
        nextProps.homework.classIds = array;

        this.getStudentInfo(nextProps.homework,indexStudentHomeworks);
    }


    render() {
        const { orData, search, orData2, search2,search3, renderData, renderData2, modifyIds } = this.state;
        return (
            <div className={styles.normal}>
                <Card bordered={false} style={{ marginBottom: 10, height: 800 }}>
                    <Table
                        rowKey={'id'}
                        columns={[...columns.map(item => ({
                            ...item,
                            render: (text) => <a style={text === '迟交' ? {color:'red'}:{color:'black'}}>{text}</a>,
                        })), {
                            name: '操作',
                            key: 'del',
                            render: record => (
                                <Button type="danger" onClick={() => {
                                    this.setState({
                                        orData: orData.filter(item => item.id !== record.id),
                                        delData: record.username,
                                        orData2: [record, ...orData2],
                                    }, () => {
                                        this.deleteData();
                                        this.handleSearch();
                                        this.handleSearch2();
                                    });
                                }}>删除</Button>),
                        },{
                            name: '操作',
                            key: 'cor',
                            render: (text,record,index) => (
                                record.commit === "已提交"?
                                <Button style={{}} onClick={()=>{
                                    let assignList = [];
                                    let i =0;
                                    for (let homework of this.state.studentHomework){
                                        if(homework.handinTime!==null){
                                            assignList.push(i);
                                        }
                                        ++i;
                                    }
                                    localStorage.setItem("assignList",assignList.toString());
                                    this.props.history.push("/home/homework/rate/"+this.state.handinAlready+"/"+this.state.homeworkId+"/"+record.username+"/"+record._index+"/")}}>批改</Button>:null),
                        }]}
                        dataSource={renderData}/>
                </Card>
            </div>
        );
    }

}

