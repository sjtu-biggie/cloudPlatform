import React from 'react'
import {Card, Spin, Button,Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Form, Dropdown, Input, Menu} from 'antd'
import axios from 'axios'


const test = [
    {
        id:'1',
        handinTime:'2020-10-01 16:12:12'
    },
    {
        id:'2',
        handinTime:'2020-10-03 16:12:12'
    },
    {
        id:'3',
        handinTime:'2020-10-02 16:12:12'
    },
    {
        id:'4',
        handinTime:'2020-10-04 16:12:12'
    },

];

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
        delete: false,
        role: 'student',
        homeworkList: test,
        allAmount: 40,
        t: test
    };

    componentWillMount() {
        this.setState({
            homeworkList:this.props.homeworkList
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            homeworkList:nextProps.homeworkList
        });
    }

    SetCon = (item) => {
        let nowDate = new Date();
        let endT = new Date(item.endTime);
        let startT = new Date(item.startTime);

        if (nowDate.getTime() < startT.getTime()){
            return "未开始";
        }
        else if (nowDate.getTime() < endT.getTime()){
            return "正在进行";
        }
        else return "已结束";
    }

    render() {
        console.log(this);
        return (
            <div>
                    <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
                        <div>
                            <span style={{height:'15px'}}>所有作业</span>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.t.sort(function(a,b){
                                    return Date.parse(a.handinTime) - Date.parse(b.handinTime)
                                });
                            }}>按时间升序</Button>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.t.sort(function(a,b){
                                    return Date.parse(b.handinTime) - Date.parse(a.handinTime)
                                });
                            }}>按时间降序</Button>
                        </div>
                        <List dataSource={this.state.homeworkList}
                              itemLayout='vertical'
                              pagination={{pageSize: 3}}
                              style={styles.listStyle}
                              renderItem={item=>{
                                  return (
                                      <List.Item
                                          actions={this.state.role === 'student' ?
                                              [<IconText type="file-text" text= {item.grade} />,
                                                  <IconText type="calendar" text={"截止："+item.endTime} />,
                                                  <IconText type="schedule" text ={ item.handinTime === null ? "未提交":"已提交"} />,
                                                  <IconText type="clock-circle-o" text={this.SetCon(item)} />]
                                          : [<IconText type="file-text" text={item.grade} />,
                                                  <IconText type="calendar" text={"截止："+item.endTime} />,
                                                  <IconText type="pie-chart" text = {10 +"/" + this.state.allAmount} />,
                                                  <IconText type="clock-circle-o" text={this.SetCon(item)} />]}
                                          extra={(this.state.delete === false ? []:[<Button type="danger" onClick={()=>{
                                              //delete
                                          }}>删除</Button>])}
                                          >
                                          <List.Item.Meta
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
