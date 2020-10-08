import React from 'react'
import {Card, Spin, Button,Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Form, Dropdown, Input, Menu} from 'antd'
import axios from 'axios'

const data3 = [];
for(let i=0;i<23;i++){
    data3.push({
        title: `七年级上数学作业 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '同学们记得认真完成按时提交',
        starttime:'2020-10-01 12:12:12',
        endtime:'2020-10-02 12:12:13',
        handinamount:'40',
        accessmentalgorithms:'0',
    })
}
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class HomeworkList extends React.Component {
    state = {
        type:0,
        size: 'default',
        bordered: true,
        loading: false,
        loadingMore: false,
        delete: false,
        role: 'teacher',
        homeworkList:data3
    };

    componentDidMount() {

        this.setState({
            loading: true,
        });
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div>
                    <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
                        <div>
                            <span style={{height:'15px'}}>所有作业</span>
                            <Button style={{marginLeft:'30px'}}>按时间升序</Button>
                            <Button style={{marginLeft:'30px'}}>按时间降序</Button>
                        </div>
                        <List dataSource={this.state.homeworkList}
                              itemLayout='vertical'
                              pagination={{pageSize: 3}}
                              style={styles.listStyle}
                              renderItem={item=>{
                                  return (
                                      <List.Item
                                          actions={this.state.role === 'student' ?
                                              [<IconText type="file-text" text="100" />, <IconText type="calendar" text={"截止："+item.endtime} />, <IconText type="schedule" text = "已提交" />, <IconText type="clock-circle-o" text="已结束" />]
                                          : [<IconText type="file-text" text="100" />, <IconText type="calendar" text={"截止："+item.endtime} />, <IconText type="schedule" text = {item.handinamount+"/总人数"} />, <IconText type="clock-circle-o" text="已结束" />]}
                                          extra={(this.state.delete === false ? []:[<Button type="danger">删除</Button>])}
                                          >
                                          <List.Item.Meta
                                              avatar={<Avatar src={item.avatar} />}
                                              title={this.state.role === 'student' ? <a href={"/home/homework/commit"}>{item.title}</a> : <a href={"/home/homework/General"}>{item.title}</a>}
                                              description={item.description}
                                          />
                                          {item.content}
                                      </List.Item>
                                  )
                              }}
                        />
                    </Card>
            </div>
        )
    }
}

const styles = {
    listStyle:{
        width:'100%',
    }
}

export default HomeworkList
