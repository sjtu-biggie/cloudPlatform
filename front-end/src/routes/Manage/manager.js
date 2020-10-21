/* eslint-disable */
import React, { Component, createRef ,useState} from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload} from 'antd';
import styles from './index.css';
import axios from 'axios'
import * as XLSX from 'xlsx';

import {Router} from "react-router-dom";
import Search from "antd/es/input/Search";

const columns = [
    { title: '用户名', dataIndex: 'username' },
    { title: '学号', dataIndex: 'sid' },
    { title: '电话', dataIndex: 'telephone' },
    { title: '昵称', dataIndex: 'nickname' },
    { title: '用户类型', dataIndex: 'type' },
    { title: '年级', dataIndex: 'theGrade' },
    { title: '班级', dataIndex: 'theClass' },
    { title: '邮箱', dataIndex: 'email' },

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

const WageManage = () => {
    const [wageTableData, setWageTableData] = useState < any > ([]);
    const uploadProps = {
        accept: ".xls,.xlsx,application/vnd.ms-excel",
        beforeUpload: (file) => {
            const f = file;
            const reader = new FileReader();
            reader.onload = (e) => {
                const datas = e.target.result;
                const workbook = XLSX.read(datas, {
                    type: 'binary'
                });
                const first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsonArr = XLSX.utils.sheet_to_json(first_worksheet, {header: 1});
                handleImpotedJson(jsonArr, file);
            };
            reader.readAsBinaryString(f);
            return false;
        },
        onRemove: () => {
            setWageTableData([]);
        }
    }
}

    const handleImpotedJson = (jsonArr, file) => {
        jsonArr.splice(0, 1); // 去掉表头
        const jsonArrData = jsonArr.map((item, index) => {
            let jsonObj = {};
            jsonObj.index = index + 1;
            jsonObj.key = 'user-wage-' + index;
            item.forEach((im, i) => {
                jsonObj[tableColumns[i].dataIndex] = im;
            })
            return jsonObj;
        });
        setWageTableData(jsonArrData)
    }


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
        return (edit ? <Input autoFocus style={{ width: 120 }}
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


export default class StudentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            search2: '',
            search3:'',
            delData:'',
            orData: '',
            renderData: '',
            modifyIds: [],
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

        this.deleteData=()=>{
            const {delData} =this.state;
            console.log(delData);
            axios({
                url:'http://106.13.209.140:8000/delUser',
                method:'POST',
                data:{
                    name:delData
                }
            }).then(res=>{
                console.log(res)
            }).catch(err=>{
                console.log(err)
            })
            console.log("测试发送");
        }
    }

    componentWillMount(){
        axios({
            method:'POST',
            url:'http://106.13.209.140:8000/getAllUsers'
        }).then(msg=>{
            console.log(msg);
            this.setState({orData:msg.data});
            this.setState({renderData:msg.data});
        }).catch(err=>{
            console.log(err);
            console.log("提取数据失败");
        })
    }


    render() {
        const { orData, search, renderData } = this.state;
        return (
            <div className={styles.normal}>
                    <Card title={<div style={{textAlign:"center"}}>管理后台名单</div>} >
                        <Card className={styles.control} bordered={false} style={{ marginBottom: 10 }}>
                            <Row>
                                <Col span={8}>
                                    <Input style={{ width: 560, marginRight: 16 }}
                                           value={search}
                                           allowClear
                                           onChange={event => this.setState({ search: event.target.value })}
                                           onPressEnter={this.handleSearch}
                                    />
                                </Col>
                                <Col span={1} offset={1}>
                                    <Button type={"primary"}   onClick={this.handleSearch}>搜索</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                </Col>
                                <Col span={1} offset={11}>
                                    <div>
                                        {/*<Upload {...uploadProps} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" directory>*/}
                                          <Upload>
                                            <Button>
                                                <Icon type="upload"/> 从excel中添加
                                            </Button>
                                        </Upload>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                        <Card bordered={false} style={{ marginBottom: 10, height: 800 }}>
                            <Table
                                rowKey={'id'}
                                columns={[...columns.map(item => ({
                                    ...item,
                                    render: (text, record) => <EditText onChange={value => {
                                        const newData = [...orData];
                                        newData.find(col => col.id === record.id)[item.dataIndex] = value;
                                        console.log(text);
                                        console.log(record);
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
                                            }, () => {
                                                this.deleteData();
                                                this.handleSearch();
                                            });
                                        }}>删除</Button>),
                                }]}
                                dataSource={renderData}/>
                        </Card>
                    </Card>
            </div>
        );
    }

}

