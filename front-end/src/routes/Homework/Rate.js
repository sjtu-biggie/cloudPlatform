import React from 'react'
import {Card, Spin, Button,Radio, List, Switch, Avatar,BackTop,Anchor,Affix,Icon, Form, Dropdown, Input, Menu} from 'antd'
import axios from 'axios'

const data3 = [];
for(let i=0;i<23;i++){
    data3.push({
        title: `七年级上数学作业 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '同学们记得认真完成按时提交',
    })
}
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);

class Rating extends React.Component {
    state = {
        type:0,
        size: 'default',
        bordered: true,
        loading: false,
        loadingMore: false,
        delete: false,
        role: 'teacher'
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

export default Rating
