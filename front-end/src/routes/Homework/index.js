import React from 'react'
import {Card, Spin, Button,Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Form, Dropdown, Input, Menu} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import HomeworkList from './HomeworkList'

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

class HomeworkDemo extends React.Component {
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
        console.log(this.props.location.pathname);
        if(this.props.location.pathname==="/home/homework/overall"){
            this.setState({type:0});
            console.log(0);
        }
        if(this.props.location.pathname==="/home/homework/submitted"){
            this.setState({type:1});
            console.log(1);
        }
        if(this.props.location.pathname==="/home/homework/uncommitted"){
            this.setState({type:2});
            console.log(3);
        }
        if(this.props.location.pathname==="/home/homework/closed"){
            this.setState({type:3});
            console.log(4);
        }
        if(this.props.location.pathname==="'/home/homework/notclosed"){
            this.setState({type:4});
            console.log(5);
        }
    }

    render() {
        const menu1 = (
            <Menu>
                <Menu.SubMenu title="所有">
                    <Menu.Item onClick={() => {
                    }}>语文</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>数学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>英语</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>物理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>化学</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>生物</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>历史</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>地理</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>政治</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>体育</Menu.Item>
                    <Menu.Item onClick={() => {
                    }}>心理</Menu.Item>
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
        );

        const menu2 = (
            <Menu>
                <Menu.SubMenu title="一年级">
                    <Menu.Item>一年级上</Menu.Item>
                    <Menu.Item>一年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="二年级">
                    <Menu.Item>二年级上</Menu.Item>
                    <Menu.Item>二年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="三年级">
                    <Menu.Item>三年级上</Menu.Item>
                    <Menu.Item>三年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="四年级">
                    <Menu.Item>四年级上</Menu.Item>
                    <Menu.Item>四年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="五年级">
                    <Menu.Item>五年级上</Menu.Item>
                    <Menu.Item>五年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="六年级">
                    <Menu.Item>六年级上</Menu.Item>
                    <Menu.Item>六年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="七年级">
                    <Menu.Item>七年级上</Menu.Item>
                    <Menu.Item>七年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="八年级">
                    <Menu.Item>八年级上</Menu.Item>
                    <Menu.Item>八年级下</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu title="九年级">
                    <Menu.Item>九年级上</Menu.Item>
                    <Menu.Item>九年级下</Menu.Item>
                </Menu.SubMenu>
            </Menu>
        );

        return (
            <div>
                <div>
                    <CustomBreadcrumb arr={['课程', this.state.type===0?"所有作业":this.state.type===1?"已提交":this.state.type===2?"未提交":this.state.type===3?"已截止":"未截止"]}/>
                </div>
                <div>
                    <Card bordered={false} style={{marginBottom: 10}} id="howUse">
                        <Form layout='horizontal' style={{width: '70%',float:'left'}} onSubmit={this.handleSubmit}>
                            <Form.Item label='搜索' >
                                {
                                    (
                                        <Input/>
                                    )
                                }
                            </Form.Item>
                        </Form>
                        <Dropdown overlay={menu1} trigger={['click']} style={{ marginTop: '30px'}}>
                            <Button  style={{width:"10%",marginLeft:'30px'}}>学科 <Icon type="down"/></Button>
                        </Dropdown>
                        <Dropdown overlay={menu2} trigger={['click']} style={{marginLeft:'30px'}}>
                            <Button style={{width:"10%",marginTop:'42.5px',marginLeft:'30px'}}>年级<Icon type="down"/></Button>
                        </Dropdown>
                    </Card>
                </div>
                <div>
                    {/*<Card bordered={false} style={{marginBottom: 15}} id='verticalStyle'>*/}
                    {/*    <div>*/}
                    {/*        <span style={{height:'15px'}}>所有作业</span>*/}
                    {/*        <Button style={{marginLeft:'30px'}}>按时间升序</Button>*/}
                    {/*        <Button style={{marginLeft:'30px'}}>按时间降序</Button>*/}
                    {/*    </div>*/}
                    {/*    <List dataSource={data3}*/}
                    {/*          itemLayout='vertical'*/}
                    {/*          pagination={{pageSize: 3}}*/}
                    {/*          style={styles.listStyle}*/}
                    {/*          renderItem={item=>{*/}
                    {/*              return (*/}
                    {/*                  <List.Item*/}
                    {/*                      actions={[<IconText type="file-text" text="100" />, <IconText type="calendar" text="截止：2020-10-1 20:00" />, <IconText type="clock-circle-o" text="已结束" />]}*/}
                    {/*                      extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}>*/}
                    {/*                      <List.Item.Meta*/}
                    {/*                          avatar={<Avatar src={item.avatar} />}*/}
                    {/*                          title={<a>{item.title}</a>}*/}
                    {/*                          description={item.description}*/}
                    {/*                      />*/}
                    {/*                      {item.content}*/}
                    {/*                  </List.Item>*/}
                    {/*              )*/}
                    {/*          }}*/}
                    {/*    />*/}
                    {/*</Card>*/}
                    <HomeworkList/>
                </div>
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
        width:'100%',
    },
    affixBox:{
        position: 'absolute',
        top: 100,
        right: 50,
        with: 170
    }
}

export default HomeworkDemo