import React from 'react'
import {Card, Button, List, Icon,} from 'antd'
import axios from 'axios'
import {withRouter} from "react-router-dom";

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

@withRouter
class HomeworkList extends React.Component {
    state = {
        type:0,
        size: 'default',
        bordered: true,
        delete: true,
        role: 'teacher',
        homeworkList: null,
        allAmount: 40,
    };

    componentWillMount() {
        console.log(this.props.homeworkList);
        this.setState({
            homeworkList:this.props.homeworkList,
            delete:this.props.delete
        });
        this.getData2();
    }

    // formatTime = (list)=>{
    //     let l = new Array.from(list);
    //     l.map(item=>{
    //         item.startTime = this.format(item.startTime);
    //         item.endTime = this.format(item.endTime);
    //     })
    // }

    add0=(m)=>{return m<10?'0'+m:m };

    format=(shijianchuo)=>
    {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth()+1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y+'-'+this.add0(m)+'-'+this.add0(d)+' '+this.add0(h)+':'+this.add0(mm)+':'+this.add0(s);
    };

    getUserInfo=async (username)=>{
        let config = {
            method: 'post',
            data :{
                'username':username
            },
            url: 'http://106.13.209.140:8000/getUserMessage',
            headers: {
                withCredentials: true,
            }
        };
        const user = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            userInfo:user,
        })
    };

    deleteTeacherHomeworkOne=async (homeworkId)=>{
        let config = {
            method: 'post',
            url: 'http://106.13.209.140:8383/deleteTeacherHomeworkOne?homeworkId=' + homeworkId,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hw);
        this.setState({
            homework:hw,
        })
    };

    getData2 = () => {
        this.setState({
            loadingMore: true
        });
        let storage = window.localStorage;
        let username = storage.getItem("username");
        let r = storage.getItem("type");
        this.setState({
            role: r
        });
        this.getUserInfo(username);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.homeworkList !== null){
            nextProps.homeworkList.map(item=>{
                item.startTime = this.format(item.startTime);
                item.endTime = this.format(item.endTime);
            });
        }
        console.log(nextProps.homeworkList);
        this.setState({
            homeworkList:nextProps.homeworkList,
            delete:nextProps.delete
        });
    }

    SetCon = (item) => {
        let nowDate = new Date();
        let endT = new Date(this.format(item.endTime));
        let startT = new Date(this.format(item.startTime));

        if (nowDate.getTime() < startT.getTime()){
            return "未开始";
        }
        else if (nowDate.getTime() < endT.getTime()){
            return "正在进行";
        }
        else return "已结束";
    };

    render() {
        console.log(this.state.homeworkList)
        if(this.state.homeworkList === null) return;
        return (
            <div>
                    <Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>
                        <div>
                            <span style={{height:'15px'}}>所有作业</span>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.homeworkList.sort(function(a,b){
                                    return Date.parse(a.startTime) - Date.parse(b.startTime)
                                });
                                this.setState({
                                    homeworkList: this.state.homeworkList
                                });
                            }}>按开始时间升序</Button>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.homeworkList.sort(function(a,b){
                                    return Date.parse(b.startTime) - Date.parse(a.startTime)
                                });
                                this.setState({
                                    homeworkList: this.state.homeworkList
                                });
                            }}>按开始时间降序</Button>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.homeworkList.sort(function(a,b){
                                    return Date.parse(a.endTime) - Date.parse(b.endTime)
                                });
                                this.setState({
                                    homeworkList: this.state.homeworkList
                                });
                            }}>按结束时间升序</Button>
                            <Button style={{marginLeft:'30px'}} onClick={() => {
                                this.state.homeworkList.sort(function(a,b){
                                    return Date.parse(b.endTime) - Date.parse(a.endTime)
                                });
                                this.setState({
                                    homeworkList: this.state.homeworkList
                                });
                            }}>按结束时间降序</Button>
                        </div>
                        <List dataSource={this.state.homeworkList}
                              itemLayout='vertical'
                              pagination={{pageSize: 3}}
                              style={styles.listStyle}
                              renderItem={item=>{
                                  return (
                                      <List.Item
                                          actions={this.state.role === 'student' ?
                                              [<IconText type="file-text" text = {item.score === null ? '暂无': item.score} />,
                                                  <IconText type="calendar" text={"截止："+ this.format(item.endTime)} />,
                                                  <IconText type="schedule" text ={ item.handinTime === null ? "未提交":"已提交"} />,
                                                  <IconText type="clock-circle-o" text={this.SetCon(item)} />,
                                              ]
                                          : [<IconText type="file-text" text="暂无" />,
                                                  <IconText type="calendar" text={"截止："+ this.format(item.endTime)} />,
                                                  <IconText type="pie-chart" text = {(this.state.homeworkList === null ? 0: this.state.homeworkList.length) +"/" + this.state.allAmount} />,
                                                  <IconText type="clock-circle-o" text={this.SetCon(item)} />,
                                                  <IconText type="profile" text={"布置范围："+item.range} />
                                              ]}

                                          extra={((this.state.delete === false && this.state.role === 'teacher')? [<Button type="danger" onClick={()=>{
                                              //delete
                                              this.deleteTeacherHomeworkOne(item.homeworkId)
                                          }}>删除</Button>]:[])}
                                          >
                                          <List.Item.Meta
                                              title={this.state.role === 'student' ? <a style={{
                                                  color: 'darkslategray',
                                                  fontSize: '20px',
                                                  fontWeight: 'bold',
                                                  display: 'block'
                                              }} href={"/home/homework/commit="+item.homeworkId}>{item.title}</a> : <a href={"/home/homework/General/"+item.homeworkId+"/"} style={{
                                                  color: 'darkslategray',
                                                  fontSize: '20px',
                                                  fontWeight: 'bold',
                                                  display: 'block'
                                              }}>{item.title}</a>}
                                          />
                                          {<p style={{
                                              fontSize:'18px',
                                              marginTop: '10px',
                                          }}>{item.type==="主观题"||item.syllabus===undefined?item.content:item.syllabus.chapter1.text}</p>}
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
        marginTop:'15px'
    }
}

export default withRouter(HomeworkList)
