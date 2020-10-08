/* eslint-disable */
import React, { Component, createRef } from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload} from 'antd';
import styles from './index.css';
import {Router} from "react-router-dom";

let index = 0;
const getMockData = () => {
    const result = {
        id: index,
        name: 'name' + index,
        no: 'no.' + index,
        cls: 'class' + index,
        point: (Math.random()*100).toFixed(2),
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
const data2 = getMockDatas(100);


const columns = [
    { title: '姓名', dataIndex: 'name' },
    { title: '学号', dataIndex: 'no' },
    { title: '班级', dataIndex: 'cls' },
    { title: '分数', dataIndex: 'point'},
];

const columns1=[
    {title:'姓名',dataIndex:'name'},
    {title:'学号',dataIndex:'no'},
    {title:'班级',dataIndex:'cls'},
]



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



//输出组件
export default class Manager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            search2: '',
            search3:'',
            orData: data1,
            renderData: data1,
            orData2: data2,
            renderData2: data2,
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
    }



        render() {
        const { orData, search, orData2, search2,search3, renderData, renderData2, modifyIds } = this.state;
        return (
            <div className={styles.normal}>
                {/*<div className={styles.control}>*/}
                <Row>
                <Col span={12}>
                    <Card title={<div style={{textAlign:"center"}}>上课学生</div>} >
                        <Card className={styles.control} bordered={false} style={{ marginBottom: 10 }}>
                            <Row>
                                <Col span={6}>
                            <Input style={{ width: 300, marginRight: 16 }}
                                   value={search}
                                   allowClear
                                   onChange={event => this.setState({ search: event.target.value })}/>
                                </Col>
                                <Col span={2} offset={4}>
                            <Button type={"primary"}   onClick={this.handleSearch}>搜索</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
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
                                        this.setState({ orData: newData });
                                    }}>{text}</EditText>,
                                })), {
                                    name: '操作',
                                    key: 'del',
                                    render: record => (
                                        <Button onClick={() => {
                                            this.setState({
                                                orData: orData.filter(item => item.id !== record.id),
                                                orData2: [record, ...orData2],
                                            }, () => {
                                                this.handleSearch();
                                                this.handleSearch2();
                                            });
                                        }}>删除</Button>),
                                }]}
                                dataSource={renderData}/>
                        </Card>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card title={<div style={{textAlign:"center"}}>未上课学生</div>}>
                        <Card bordered={false} style={{ marginBottom: 10 }}>
                            <div className={styles.control}>
                                <Button
                                    type={'primary'}
                                    onClick={() => {
                                        const selectData = orData2.filter(item => modifyIds.includes(item.id));
                                        const notSelectData = orData2.filter(item => !modifyIds.includes(item.id));
                                        this.setState({
                                            orData: [...selectData, ...orData],
                                            orData2: notSelectData,
                                        }, () => {
                                            this.handleSearch();
                                            this.handleSearch2();
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
                        <Card bordered={false} style={{ marginBottom: 10, height: 780 }}>
                            <Table
                                rowKey={'id'}
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

