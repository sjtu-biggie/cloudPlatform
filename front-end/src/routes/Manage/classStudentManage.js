/* eslint-disable */
import React, {Component, createRef} from 'react';
import {Button, Card, Input, Table, Row, Col, Icon, Dropdown, Menu, Upload, Form, Drawer,message} from 'antd';
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
            addDataRender:'',
            visible: false,
            createClass: '',
            menu: '',
            classChoose: '',
            delEmail:'',
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
            const {addData,addDataRender} = this.state;
            console.log("this is a try");
            console.log(selectedKeys);
            console.log(dataIndex);
            let filterData=addData.filter(item=>{
                if (String(item[dataIndex]||'').toLowerCase().includes(String(selectedKeys).toLowerCase())){
                    return true;
                }
                return false;
            })
            this.setState({
                addDataRender:filterData
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
            console.log("添加学生");
            if (this.state.addNewStudent===false)
            {
                axios({
                    method:'POST',
                    url:'http://106.13.209.140:8000/getAllUsers',
                }).then(msg=>{
                    console.log(msg.data);
                    let filterData=msg.data.filter(item=>
                        item.theClass!==this.state.classChoose&&item.type!=="teacher"&&item.type!=="manager"
                    );
                    console.log(filterData);
                    this.setState({
                        addData:filterData,
                        addDataRender:filterData,
                        addNewStudent: !this.state.addNewStudent,
                    })
                }).catch(err=>{
                    console.log(err);
                })
                return ;
            }
           this.setState({
               addNewStudent: false
           })
        }

        this.addStudentToClass = () => {
            const {record, classChoose,addData,addDataRender,orData,renderData} = this.state;
            console.log("this is a try");
            console.log(record["theClass"]);
            record["theClass"] = classChoose;
            console.log(record);
            this.addStudentToClassAxios(record);
        }

        this.addStudentToClassAxios=(item)=>{
            axios({
                method: 'POST',
                url: 'http://106.13.209.140:8000/addStudentToClass',
                data: {
                    username: item.username,
                    theClass: item.theClass,
                }
            }).then(msg => {
                console.log(msg);
                let tos = [];
                tos.push(item.email);
                axios({
                    method: 'POST',
                    url: 'http://106.13.209.140:8000/sendNotice',
                    data: {
                        "tos": tos,
                        "context": "已经将你添加至新的班级",
                    }
                }).then(msg => {
                    console.log(msg);
                }).catch(err => {
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
                let tos=[];
                tos.push(this.state.delEmail);
                console.log(tos);
                axios({
                    url:'http://106.13.209.140:8000/sendNotice',
                    method:'POST',
                    data:{
                        tos:tos,
                        context: "你的班级已经变动",
                    }
                }).then(res=>{
                    console.log(res);
                }).catch(err=>{
                    console.log(err);
                })

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
                    classManager: window.localStorage.getItem("sid"),
                }
            }).then(msg => {
                console.log(msg);
                message.info(this.state.createClass+"已经创建");
                this.setState({
                    visible: false,
                });
            }).catch(err => {
                console.log(err);
            })
        };

        this.handleClick = (e) => {
            let courseButton = document.getElementById("courseButton");

            if (e.key !== "-1") {
                console.log('click ', e);
                courseButton.innerText = e.item.props.children;
                this.getClassStudents(e.key);
                this.setState({
                    classChoose: e.key,
                    addNewStudent:false,
                })
            }
        };

        this.addMulti=()=>{
            const {addData,addDataRender,modifyIds,orData,renderData,classChoose} = this.state;
            let chosenData=addDataRender.filter(item=>modifyIds.includes(item.username));
            let chosenDataNew=chosenData.map(item=>{
                item["theClass"]=classChoose;
                this.addStudentToClassAxios(item);
                return item;
            })
            let addDataNew=addData.filter(item=>!modifyIds.includes(item.username));
            let addDataRenderNew=addDataRender.filter(item=>!modifyIds.includes(item.username));
            let orDataNew=[...chosenDataNew,...orData];
            let renderDataNew=[...chosenDataNew,...renderData];
            this.setState({
                orData:orDataNew,
                renderData:renderDataNew,
                addData:addDataNew,
                addDataRender:addDataRenderNew,
            })
        }
    }

    componentDidMount() {
        console.log("开始获取老师班级");
        axios({
            url: 'http://106.13.209.140:8000/getAllClassByManager',
            method: 'POST',
            data: {
                sid: window.localStorage.getItem("sid")
            }
        }).then(msg => {
            console.log(msg.data);
            var menu =
                <Menu onClick={this.handleClick}>
                    {msg.data.map(function (item) {
                            return (
                                <Menu.Item key={item.classNo} icon={<UserOutlined/>}>
                                    {item.classNo}
                                </Menu.Item>
                            )
                        }
                    )}
                    <Menu.Item key="-1" onClick={this.showDrawer}>
                         创建班级
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

        // axios({
        //     method: 'POST',
        //     url: 'http://106.13.209.140:8000/getAllStudentsByTheClass',
        //     data: {
        //         "theClass": "F1803702"
        //     }
        // }).then(msg => {
        //     console.log(msg.data);
        //     this.setState({
        //         orData: msg.data,
        //         renderData: msg.data,
        //     })
        // }).catch(err => {
        //     console.log(err);
        // })

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
        const {orData, search, renderData, modifyIds,addDataRender, addData} = this.state;

        return (
            <div className={styles.normal}>
                <Card title={<div style={{textAlign: "center", fontSize:'25px',fontWeight:'bold'}}>管理班级名单</div>}>
                    <Card className={styles.control} bordered={false} style={{marginBottom: 10}}>
                        <Row>
                            <Col span={10}>
                                <Input
                                       value={search}
                                       allowClear
                                       onChange={event => this.setState({search: event.target.value})}/>
                            </Col>
                            <Col span={1} offset={1}>
                                <Button type={"primary"}
                                        onClick={this.handleSearch}>搜索</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </Col>
                            <Col span={2} offset={6}>
                                <Dropdown overlay={this.state.menu} trigger={['click']}>
                                    <Button style={{width: "110px"}}><span id="courseButton">选择班级</span> <Icon
                                        type="down"/></Button>
                                </Dropdown>
                            </Col>
                                <Col span={2} offset={1}>
                                    <Button style={{marginLeft: '20px',width:'110px'}} onClick={this.addStudent} disabled={this.state.classChoose===''}>
                                        添加学生
                                    </Button>
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

                    {this.state.addNewStudent === true ?
                        <Card bordered={false} style={{marginBottom: 10}}>
                            <Card style={{marginBottom:10}}>
                                <Row>
                                    <Col span={4}>
                                        <Button size={"large"} onClick={this.addMulti}>确定添加</Button>
                                    </Col>
                                    <Col offset={3} span={10}>
                                        <div style={{textAlign:"center",fontWeight:"550",fontSize:"25px",fontStyle:"italic"}}>添加学生至{this.state.classChoose}</div>
                                    </Col>
                                </Row>
                            </Card>
                        <Table
                        rowKey={'username'}
                        columns={[
                            ...columns1
                            // ...columns1.map(item => ({
                            // ...item,
                            // render: (text, record) =>
                            //     <EditText>{text}</EditText>,
                            // }))
                            ,
                            {
                            name: '操作',
                            key: 'del',
                            render: record => (
                                <Button onClick={() => {
                                    record["theClass"] = this.state.classChoose;
                                    let addDataFilter=addData.filter(item=>item.username!==record.username);
                                    let addDataRenderFilter=addDataRender.filter(item=>item.username!==record.username);
                                    console.log(record);
                                    this.setState({
                                        addData: addDataFilter,
                                        addDataRender:addDataRenderFilter,
                                        delData: record.username,
                                        orData: [record,...orData],
                                        renderData: [record,...renderData],
                                        record: record,
                                    }, () => {
                                        this.addStudentToClass();
                                    });
                                }}>添加</Button>),
                        }]}
                        dataSource={addDataRender}
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys: modifyIds,
                            onChange: ids => this.setState({modifyIds: ids}),
                        }}
                        /></Card> : ''}

                    {this.state.classChoose===''?
                        <Card style={{textAlign:'center',fontSize:'30px'}}>
                            请先选择班级
                        </Card>
                        :
                    <Card bordered={false} style={{marginBottom: 10, height: 800}}>
                        <Card title={<div style={{textAlign: "center",fontWeight:"550",fontSize:"25px",fontStyle:"italic"}}>{this.state.classChoose}</div>}>
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
                                        record["theClass"]="";
                                        var newAddData=[record,...this.state.addData];
                                        var newAddDataRender=[record,...this.state.addDataRender];
                                        console.log(newOrData);
                                        console.log(newRenderData);
                                        console.log(this.state.record);
                                        this.setState({
                                            renderData: newRenderData,
                                            orData: newOrData,
                                            addData:newAddData,
                                            addDataRender:newAddDataRender,
                                            delData: record.username,
                                            delEmail:record.email,
                                        }, () => {
                                            this.deleteStudent();
                                            this.handleSearch();
                                        });
                                    }}>删除</Button>),
                            }]}
                            dataSource={renderData}/>
                        </Card>
                    </Card>
                    }

                </Card>
            </div>
        );
    }
}