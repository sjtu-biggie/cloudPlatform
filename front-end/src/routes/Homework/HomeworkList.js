import React from 'react'
import {Card, Spin, Button,Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Form, Dropdown, Input, Menu} from 'antd'
import axios from 'axios'

const data3 = [];
for(let i=0;i<23;i++){
    data3.push({
        title: `一年级上语文作业 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
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
                        <List dataSource={data3}
                              itemLayout='vertical'
                              pagination={{pageSize: 3}}
                              style={styles.listStyle}
                              renderItem={item=>{
                                  return (
                                      <List.Item
                                          actions={[<IconText type="file-text" text="100" />, <IconText type="calendar" text="截止：2020-10-1 20:00" />, <IconText type="clock-circle-o" text="已结束" />]}
                                          extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}>
                                          <List.Item.Meta
                                              avatar={<Avatar src={item.avatar} />}
                                              title={<a>{item.title}</a>}
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
