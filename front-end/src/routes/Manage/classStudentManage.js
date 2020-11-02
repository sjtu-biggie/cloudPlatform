/* eslint-disable */
import React, {Component, createRef} from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload, Form, Drawer} from 'antd';
import styles from './index.css';
import {Router} from "react-router-dom";
import axios from "axios";
import {values} from "mobx";
import {PlusOutlined, UserOutlined} from "@ant-design/icons";


const columns = [
    {title: '用户名', dataIndex: 'username'},
    {title: '学号', dataIndex: 'sid'},
    {title: '电话', dataIndex: 'telephone'},
    {title: '昵称', dataIndex: 'nickname'},
    {title: '用户类型', dataIndex: 'type'},
    {title: '年级', dataIndex: 'theGrade'},
    {title: '班级', dataIndex: 'theClass'},
    {title: '邮箱', dataIndex: 'email'},
];

const columns1 = [
    {title: '用户名', dataIndex: 'username'},
    {title: '学号', dataIndex: 'sid'},
    {title: '昵称', dataIndex: 'nickname'},
    {title: '用户类型', dataIndex: 'type'},
    {title: '年级', dataIndex: 'theGrade'},
    {title: '班级', dataIndex: 'theClass'},
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

columns1.map(item => {
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

export default class ClassManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            delData: '',
            orData: '',
            renderData: '',
            modifyIds: [],
            record: '',
            addNewStudent: false,
            addData: '',
            visible: false,
            createClass: '',
            menu: '',
            classChoose: '',
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
                        onClick={() => {
                            this.addSearch(selectedKeys, dataIndex)
                        }}
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

        this.showDrawer = () => {
            this.setState({
                visible: true,
            });
        };

        this.onClose = () => {
            this.setState({
                visible: false,
            });
        };


        this.addSearch = (selectedKeys, dataIndex) => {
            console.log("this is a try");
            console.log(selectedKeys);
            console.log(dataIndex);
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/getAllUsers'
            }).then(msg => {
                console.log(msg);
                var fileterData = msg.data.filter(item => {
                    if (String(item[dataIndex] || '').toLowerCase().includes(String(selectedKeys).toLowerCase())) {
                        return true;
                    }
                    return false;
                });
                this.setState({addData: fileterData});
            }).catch(err => {
                console.log(err);
                console.log("提取数据失败");
            })

        }

        this.handleSearch = () => {
            console.log(this.props);
            console.log(window.localStorage.getItem("sid"));
            console.log("进入handleSearch")
            const {orData, search} = this.state;
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


        this.addStudent = () => {
            this.setState({
                addNewStudent: !this.state.addNewStudent,
                addData: this.state.addData === '' ? '' : '',
            })
        }

        this.addStudentToClass = () => {
            const {record,classChoose} = this.state;
            console.log("this is a try");
            console.log(record["theClass"]);
            record["theClass"] = classChoose;
            console.log(record);
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/addStudentToClass',
                data: {
                    username: record.username,
                    theClass: record.theClass,
                }
            }).then(msg => {
                console.log(msg);
                var tos=[];
                tos.push(record.email);
                axios({
                    method:'POST',
                    url:'http://106.13.209.140:8000/sendNotice',
                    data:{
                        "tos":tos,
                        "type":"ADD",
                    }
                }).then(msg=>{
                    console.log(msg);
                }).catch(err=>{
                    console.log(err);
                })
            }).catch(err => {
                console.log(err)
            })
        }

        this.deleteStudent = () => {
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/deleteStudentFromClass',
                data: {
                    "username": this.state.delData
                }
            }).then(msg => {
                console.log("删除学生用户" + this.state.delData)
            }).catch(err => {
                console.log(err)
            })
        }

        this.updateUser = (record) => {
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/updateUserByTeacher',
                data: record
            }).then(msg => {
                console.log(msg)
            }).catch(err => {
                console.log(err)
            })
            console.log(record);
        }

        this.getClass = (clas) => {
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/getAllStudentsByClass',
                data: {
                    "range": clas
                }
            }).then(msg => {
                console.log(msg.data);
                this.setState({
                    orData: msg.data,
                    renderData: msg.data,
                })
            }).catch(err => {
                console.log(err);
            })
        }


        this.getClassStudents = (theclass) => {
            console.log(theclass);
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/getAllStudentsByTheClass',
                data: {
                    "theClass": theclass
                }
            }).then(msg => {
                console.log(msg.data);
                this.setState({
                    orData: msg.data,
                    renderData: msg.data,
                })
            }).catch(err => {
                console.log(err);
            })
        }

        this.getClassNo = (event) => {
            console.log(event.target.value);
            this.setState({
                createClass: event.target.value
            })
        }


        this.createClass = () => {
            console.log("建立班级" + this.state.createClass);
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/addClass',
                data: {
                    classNo: this.state.createClass,
                    number: 0,
                    classManager: "518030910213",
                }
            }).then(msg => {
                console.log(msg);
            }).catch(err => {
                console.log(err);
            })
        };

        this.handleClick = (e) => {
            if (e.key !== "-1") {
                console.log('click ', e);
                this.getClassStudents(e.key);
                this.setState({
                    classChoose: e.key
                })
            }
        };
    }

    componentDidMount() {
        console.log("开始获取老师班级");
        axios({
            url: 'http://106.13.209.140:8000/getAllClassByManager',
            method: 'POST',
            data: {
                sid: "518030910213"
            }
        }).then(msg => {
            console.log(msg.data);
            var i = -1;
            var menu =
                <Menu onClick={this.handleClick}>
                    {msg.data.map(function (item) {
                            i++;
                            // return item;
                            return (
                                <Menu.Item key={item.classNo} icon={<UserOutlined/>}>
                                    {item.classNo}
                                </Menu.Item>
                            )
                        }
                    )}
                    <Menu.Item key="-1" onClick={this.showDrawer}>
                        <PlusOutlined/> 创建班级
                    </Menu.Item>
                </Menu>;
            console.log(menu);
            this.setState({
                menu: menu
            })
        }).catch(err => {
            console.log(err)
        })

        // axios({
        //     method: 'POST',
        //     url: 'http://106.13.209.140:8000/getAllUsers'
        // }).then(msg => {
        //     console.log(msg);
        //     this.setState({orData: msg.data});
        //     this.setState({renderData: msg.data});
        // }).catch(err => {
        //     console.log(err);
        //     console.log("提取数据失败");
        // })

        axios({
            method: 'POST',
            url: 'http://106.13.209.140:8000/getAllStudentsByTheClass',
            data: {
                "theClass": "F1803702"
            }
        }).then(msg => {
            console.log(msg.data);
            this.setState({
                orData: msg.data,
                renderData: msg.data,
            })
        }).catch(err => {
            console.log(err);
        })

    }


    // this.handleSearch2 = () => {
    //     const { orData2, search2 } = this.state;
    //     const filterData = orData2.filter(row => {
    //         if (!search2) return true;
    //         const keys = columns.map(item => item.dataIndex);
    //         for (let i = 0; i < keys.length; i++) {
    //             if (String(row[keys[i]] || '').toLowerCase().includes(search2.toLowerCase())) return true;
    //         }
    //         return false;
    //     });
    //     this.setState({ renderData2: filterData });
    // };

    //
    // this.handleSearch3 = () => {
    //     const { orData2, search3 } = this.state;
    //     const filterData = orData2.filter(row => {
    //         if (!search3) return true;
    //         const keys = columns.map(item => item.dataIndex);
    //         for (let i = 0; i < keys.length; i++) {
    //             if (String(row[keys[i]] || '').toLowerCase()===search3.toLowerCase()) return true;
    //         }
    //         return false;
    //     });
    //     this.setState({ renderData2: filterData });
    // };


    render() {
        const {orData, search, renderData, modifyIds, addData} = this.state;
        const SubMenu = Menu.SubMenu;



        return (
            <div className={styles.normal}>
                <Card title={<div style={{textAlign: "center"}}>管理班级名单</div>}>
                    <Card className={styles.control} bordered={false} style={{marginBottom: 10}}>
                        <Row>
                            <Col span={8}>
                                <Input style={{width: 560, marginRight: 16}}
                                       value={search}
                                       allowClear
                                       onChange={event => this.setState({search: event.target.value})}/>
                            </Col>
                            <Col span={1} offset={1}>
                                <Button type={"primary"}
                                        onClick={this.handleSearch}>搜索</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Col>
                            <Col span={8} offset={1}>
                                <div>
                                    <Col span={4}>
                                        <Dropdown.Button overlay={this.state.menu} style={{width: '100px'}} block='true'
                                                         placement="bottomCenter">
                                            {this.state.classChoose}
                                        </Dropdown.Button>
                                    </Col>

                                    <Col span={4} offset={3}>
                                        <Button onClick={this.addStudent} style={{marginLeft: '100px'}}>
                                            添加
                                        </Button>
                                    </Col>

                                </div>
                            </Col>
                        </Row>
                    </Card>


                    <Drawer
                        title="创建新的班级"
                        closable={false}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Form name="basic" initialValues={{remember: true}}>
                            <Form.Item label="班级号" name="username" rules={[{required: true}]}>
                                <Input onBlur={this.getClassNo}/>
                            </Form.Item>
                            <Button htmlType="submit" type='primary' onClick={this.createClass}>创建</Button>
                        </Form>
                    </Drawer>

                    {this.state.addNewStudent === true ? <Table
                        rowKey={'sid'}
                        columns={[...columns1.map(item => ({
                            ...item,
                            render: (text, record) =>
                                <EditText>{text}</EditText>,
                        })), {
                            name: '操作',
                            key: 'del',
                            render: record => (
                                <Button onClick={() => {
                                    var newAddData = addData.filter(item => item.username !== record.username);
                                    record["theClass"] = "F1803702";
                                    console.log(record);
                                    console.log(newAddData);
                                    this.setState({
                                        addData: newAddData,
                                        delData: record.username,
                                        orData: [...orData, record],
                                        renderData: [...renderData, record],
                                        record: record,
                                    }, () => {
                                        this.addStudentToClass();
                                    });
                                }}>添加</Button>),
                        }]}
                        dataSource={addData}/> : ''}


                    <Card bordered={false} style={{marginBottom: 10, height: 800}}>

                        <Table
                            rowKey={'sid'}
                            columns={[...columns.map(item => ({
                                ...item,
                                render: (text, record) =>
                                    <EditText
                                        onChange={value => {
                                            const newData = [...orData];
                                            // newData.find(col => col.id === record.id)[item.dataIndex] = value;
                                            console.log(value);
                                            console.log(record);
                                            record[item.dataIndex] = value;
                                            this.setState({orData: newData, renderData: newData});

                                            console.log(record);
                                            this.setState({record: record});
                                            console.log(this.state.record);
                                            this.updateUser(record);


                                        }}
                                        onBlur={this.updateUser}
                                    >{text}
                                    </EditText>,
                            })), {
                                name: '操作',
                                key: 'del',
                                render: record => (
                                    <Button onClick={() => {
                                        var newOrData = orData.filter(item => item.username !== record.username);
                                        console.log(record);
                                        var newRenderData = renderData.filter(item => item.username !== record.username);

                                        console.log(newOrData);
                                        console.log(newRenderData);
                                        console.log(this.state.record);
                                        this.setState({
                                            renderData: newRenderData,
                                            orData: newOrData,
                                            delData: record.username,
                                        }, () => {
                                            this.deleteStudent();
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














