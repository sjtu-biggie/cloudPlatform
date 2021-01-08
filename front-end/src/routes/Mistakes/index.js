import React from 'react'
import {Card, Spin, Button, Radio, List, Switch, Avatar, Menu,BackTop, Input,Anchor,Form, Affix, Icon, Dropdown, Row, Col} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import TypingCard from '../../components/TypingCard'
import { Chart, Axis, Geom, Tooltip, Coord, Label, Legend, G2 } from 'bizcharts'
import { View } from '@antv/data-set'

const cols = {
    'value': {min: 0},
    'date': {range: [0, 1]}
}

const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Mistakes extends React.Component {
    state = {
        size: 'default',
        bordered: true,
        data2: [],
        loading: false,
        loadingMore: false,
        displayMistakes:[],
        mistakes:[],
        data:[]
    }

    getMistakes=()=>{
        let username=localStorage.getItem("username")
    }

    changeSubject=(subject)=>{
        let modifiedList=[];
        let courseButton=document.getElementById("courseButton");
        if(subject==="所有"){
            this.setState({
                displayMistakes:this.state.mistakes,
            });
            courseButton.innerText="学科";
            return null;
        }else{
            for(let mistake of this.state.mistakes){
                if(mistake.subject.indexOf(subject)){
                    modifiedList.push(mistake);
                }
            }
        }
        courseButton.innerText=subject;
        this.setState({
            displayMistakes:modifiedList,
        });
    };

    searchFun=()=>{
        let value = document.getElementById("search").value;
        let modifiedList=this.state.mistakes.filter(function(item){
            return (item.title.indexOf(value)  !== -1)|| item.description.indexOf(value) !==-1||item.time.indexOf(value)!==-1;
        });
        this.setState({
            displayMistakes:modifiedList,
        });
    };

    getTeacherHomeworkOne=async (hid,i)=>{
        let config = {
            method: 'get',
            url: 'http://124.70.201.12:8383/getTeacherHomeworkOne?homeworkId='+hid,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hw);
        let mis=this.state.displayMistakes;
        mis[i].title=hw.content;
        mis[i].remarks=hw.answer;
        this.setState({
            displayMistakes:mis,
            mistakes:mis,
        });
    };

    componentWillMount() {
        //TODO:get role from local storage
        this.setState({
            loading: true,
        });
        this.getData2();
        let username=localStorage.getItem("username");
        console.log(username);
        this.getMistakes(username);
        this.setState({
            displayMistakes:this.state.mistakes,
            loading: false
        });
    }

    add0=(m)=>{
        return m<10?'0'+m:m
    }

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
    }

    getMistakes=async (username)=>{
        let config = {
            method: 'get',
            url: 'http://124.70.201.12:8383/getMistakenHomework?studentId='+username,
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
        this.setState({
            mistakes:hw,
            displayMistakes:hw,
        })
        for(let i=0;i<hw.length;i++){
            this.getTeacherHomeworkOne(hw[i].homeworkId,i)
            console.log(this.format(hw[i].endTime))
        }

        console.log(this.state.mistakes)
        let data=[]
        for(let i=0;i<hw.length;i++){
            data.push({date:i+1,value:100-hw[i].score})
        }
        console.log(data)
        this.setState({
            data:data,
        })
    };

    getData2 = () => {
        this.setState({
            loadingMore: true
        })
        axios.get('https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo').then(res => {
            this.setState({
                data2: this.state.data2.concat(res.data.results),
                loadingMore: false
            })
        })
    }

    render() {
        const menu1 = (
            <Menu onClick={(e)=>{this.changeSubject(e.item.props.children)}}>
                <Menu.SubMenu title="所有">
                    <Menu.Item>所有</Menu.Item>
                    <Menu.Item>语文</Menu.Item>
                    <Menu.Item >数学</Menu.Item>
                    <Menu.Item>英语</Menu.Item>
                    <Menu.Item >物理</Menu.Item>
                    <Menu.Item >化学</Menu.Item>
                    <Menu.Item>生物</Menu.Item>
                    <Menu.Item >历史</Menu.Item>
                    <Menu.Item >地理</Menu.Item>
                    <Menu.Item>政治</Menu.Item>
                    <Menu.Item >体育</Menu.Item>
                    <Menu.Item >心理</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="文科类">
                    <Menu.Item onClick={() => {
                    }}>语文</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>英语</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>历史</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>地理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>政治</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="理科类">
                    <Menu.Item onClick={() => {
                    }}>数学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>物理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>化学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>生物</Menu.Item>
                </Menu.SubMenu>
                <Menu.Item>其它</Menu.Item>
            </Menu>
        )
        const { SubMenu } = Menu;
        const menu2 = (
            <Menu onClick={this.handleMenuClick}>
                <SubMenu title="所有"></SubMenu>
                <SubMenu title="一年级">
                <Menu.Item key="10">一年级上</Menu.Item>
                <Menu.Item key="11">一年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="二年级">
                <Menu.Item key="12">二年级上</Menu.Item>
                <Menu.Item key="13">二年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="三年级">
                <Menu.Item key="14">三年级上</Menu.Item>
                <Menu.Item key="15">三年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="四年级">
                <Menu.Item key="16">四年级上</Menu.Item>
                <Menu.Item key="17">四年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="五年级">
                <Menu.Item key="18">五年级上</Menu.Item>
                <Menu.Item key="19">五年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="六年级">
                <Menu.Item key="20">六年级上</Menu.Item>
                <Menu.Item key="21">六年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="七年级">
                <Menu.Item ke y="22">七年级上</Menu.Item>
                <Menu.Item key="23">七年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="八年级">
                <Menu.Item key="24">八年级上</Menu.Item>
                <Menu.Item key="25">八年级下</Menu.Item>
                </SubMenu>
                <SubMenu title="九年级">
                <Menu.Item key="26">九年级上</Menu.Item>
                <Menu.Item key="27">九年级下</Menu.Item>
                </SubMenu>
            </Menu>
        )
        const {size, bordered, loading, data2, loadingMore} = this.state
        const loadMore = (
            <div style={styles.loadMore}>
                {/*不知道为什么这种写法有问题，会报错*/}
                {/*{loadingMore ? <Spin/> : <Button onClick={() => this.getData2()}>加载更多</Button>}*/}
                <Spin style={loadingMore?{}:{display:'none'}}/>
                <Button style={!loadingMore?{}:{display:'none'}} onClick={() => this.getData2()}>加载更多</Button>
            </div>
        )
        return (
            <div>
                <CustomBreadcrumb arr={['错题']}/>

                <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                            <Form layout='horizontal' style={{width: '70%',float:'left'}} onSubmit={this.handleSubmit}>
                                <Form.Item label='搜索' >
                                    {
                                        (
                                            <Input id="search" onKeyUp={(e)=>{this.searchFun()}} />
                                        )
                                    }
                                </Form.Item>
                            </Form>
                            <Dropdown overlay={menu1} trigger={['click']} style={{ marginTop: '30px'}}>
                                <Button id="courseButton" style={{width:"10%",marginLeft:'30px'}}>学科 <Icon type="down"/></Button>
                            </Dropdown>
                            <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft:'30px'}}>
                                <Button style={{width:"10%",marginTop:'42.5px',marginLeft:'30px'}}>年级<Icon type="down"/></Button>
                            </Dropdown>
                </Card>
                <Card title='错误率%' bordered={false} className='card-item'>
                <Chart height={400} data={this.state.data} scale={cols} forceFit>
                    <Axis name="date"/>
                    <Axis name="value"/>
                    <Tooltip crosshairs={{type: 'y'}}/>
                    <Geom type="line" position="date*value" size={2}/>
                    <Geom type='point' position="date*value" size={4} shape={'circle'}
                          style={{stroke: '#ffffff', lineWidth: 1}}/>
                </Chart>
            </Card>
                <Card  bordered={false} title='题目' style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={this.state.displayMistakes}
                          itemLayout='vertical'
                          pagination={{pageSize: 2}}
                          style={styles.listStyle}
                          renderItem={item=>{
                              return (
                                  <List.Item
                                      /*actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}*/
                                      extra={<img /*width={275}*/ /*alt="logo"*/ /*src={item.correct}*//>}>

                                          <row>
                                      <p style={{fontSize:'20px',fontWeight:'bold'}}>{item.title}</p>
                                              <p style={{display:'block'}}>{"结束时间："+this.format(item.endTime)}</p>
                                              <p>{"作答内容："}</p>
                                              <iframe style={{width: '100%'}} title={"s"}
                                                      src={'data:text/html;charset=UTF-8,' + item.content}/>
                                              <p>{"参考答案："}<iframe style={{width: '100%'}} title={"s"}
                                                                                             src={'data:text/html;charset=UTF-8,' + item.remarks}/></p>

                                          </row>
                                      {/*{item.content}*/}
                                  </List.Item>
                              )
                          }
                          }
                    />
                </Card>

                <BackTop visibilityHeight={200} style={{right: 50}}/>
            </div>
        )
    }
}

const styles = {
    haveBorder: {
        minHeight: 270,
        width:'80%',
        boxSizing: 'border-box'
    },
    noBorder: {
        minHeight: 270,
        width:'80%',
        padding: '0 24px',
        boxSizing: 'border-box',
        border: '1px solid #fff'
    },
    loadMore: {
        height: 32,
        marginTop: 16,
        lineHeight: '32px',
        textAlign: 'center',
    },
    listStyle:{
        width:'100%'
    },
    affixBox:{
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}

export default Mistakes