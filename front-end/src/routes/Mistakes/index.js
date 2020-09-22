import React from 'react'
import {Card, Spin, Button, Radio, List, Switch, Avatar, Menu,BackTop, Input,Anchor,Form, Affix, Icon, Dropdown} from 'antd'
import axios from 'axios'
import CustomBreadcrumb from '../../components/CustomBreadcrumb'
import TypingCard from '../../components/TypingCard'

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];
const data3 = []
    data3.push({
        title: `数学`,
        avatar: '../../assets/img/mistakes.png',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    })
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
    }

    componentDidMount() {
        this.setState({
            loading: true,
        })
        this.getData2();
        this.setState({
            loading: false
        })
    }

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
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="1">语文</Menu.Item>
                <Menu.Item key="2">数学</Menu.Item>
                <Menu.Item key="3">英语</Menu.Item>
                <Menu.Item key="4">历史</Menu.Item>
                <Menu.Item key="5">物理</Menu.Item>
                <Menu.Item key="6">政治</Menu.Item>
                <Menu.Item key="7">化学</Menu.Item>
                <Menu.Item key="8">生物</Menu.Item>
                <Menu.Item key="9">地理</Menu.Item>
            </Menu>
        )
        const { SubMenu } = Menu;
        const menu2 = (
            <Menu onClick={this.handleMenuClick}>
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
                <Card bordered={false} title='题目' style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={data3}
                          itemLayout='vertical'
                          pagination={{pageSize: 5}}
                          style={styles.listStyle}
                          renderItem={item=>{
                              return (
                                  <List.Item
                                      actions={[<IconText type="star-o" text="156" />, <IconText type="like-o" text="156" />, <IconText type="message" text="2" />]}
                                      extra={<img width={272} alt="logo" src="../../assets/img/mistakes.png" />}>
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