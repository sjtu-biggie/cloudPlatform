/* eslint-disable */
import React, { Component, createRef ,useState} from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload} from 'antd';
import styles from './index.css';
import axios from 'axios'
import * as XLSX from 'xlsx';

import {Router} from "react-router-dom";

let index = 0;
const getMockData = () => {
    const result = {
        username: 'username' + index,
        sid:'sid'+index,
        nickname: 'nickname' + index,
        theGrade:'theGrade'+index,
        theClass:'theClass'+index,
    };
    index += 1;
    return result;
};
const getMockDatas = (num) => {
    const data = [];
    for (let i = 0; i < num; i++) {
        data.push(getMockData());
    }
    return data;
};
const data1 = getMockDatas(10);

const columns = [
    { title: '用户名', dataIndex: 'username' },
    { title: '学号', dataIndex: 'sid' },
    { title: '昵称', dataIndex: 'nickname' },
    { title: '班级', dataIndex: 'theClass' },
    { title: '是否提交', dataIndex: 'commit' },
    { title: '是否批改', dataIndex: 'correct' },
    { title: '成绩', dataIndex: 'theGrade' },
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


export default class STable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            search2: '',
            search3:'',
            delData:'',
            orData: data1,
            renderData: data1,
            modifyIds: [],
            homework: null,
            studentHomewrok:null,
            homeworkId:0,
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

        this.deleteData=()=>{
        }
    }

    componentWillMount() {
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
                            render: (text, record) => <EditText onChange={value => {
                                const newData = [...orData];
                                newData.find(col => col.id === record.id)[item.dataIndex] = value;
                                this.setState({ orData: newData });
                            }}>{text}</EditText>,
                        })), {
                            name: '操作',
                            key: 'del',
                            render: record => (
                                <Button onClick={() => {
                                    this.setState({
                                        orData: orData.filter(item => item.id !== record.id),
                                        delData:record.username,
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
                            render: record => (
                                <a href={"/home/homework/rate?homeworkId="+this.state.homeworkId}>批改</a>),
                        }]}
                        dataSource={renderData}/>
                </Card>
            </div>
        );
    }

}

