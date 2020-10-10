import React from 'react'
import {
    Card,
    Spin,
    Button,
    Radio,
    List,
    Switch,
    Avatar,
    BackTop,
    Anchor,
    Affix,
    Icon,
    Form,
    Dropdown,
    Input,
    Menu,
    Col, Row, Statistic, InputNumber
} from 'antd'
import axios from 'axios'
import TextArea from "antd/es/input/TextArea";

const data3 = [];
for (let i = 0; i < 23; i++) {
    data3.push({
        title: `七年级上数学作业 ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content: '同学们记得认真完成按时提交',
    })
}
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};


class Rating extends React.Component {
    state = {
        type: 0,
        size: 'default',
        bordered: true,
        loading: false,
        loadingMore: false,
        delete: false,
        role: 'teacher',
        studentIndex: 0,
        studentHomeworkList: null,
        homework: null,
    };

    componentWillMount() {

        this.setState({
            loading: true,
            studentHomeworkList: this.props.studentHomeworkList,
            homework: this.props.homework
        });
        this.setState({
            loading: false
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Card style={{
                            fontWeight: 'bold',
                            fontSize: '25px',
                            width: '100%',
                            height: '90px',
                            backgroundColor: 'darkslategray',
                            color: 'white'
                        }}>

                            <Card.Grid style={{
                                width: '10%',
                                textAlign: 'center',
                                height: '90px'
                            }}>
                                查看作业
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '10%',
                                textAlign: 'center',
                                height: '90px'
                            }}>
                                查看答案
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '30%',
                                textAlign: 'center',
                                height: '90px'
                            }}>{this.props.homework.title}</Card.Grid>
                            <Card.Grid style={{
                                width: '11%',
                                textAlign: 'center',
                                height: '90px'
                            }} hoverable={false}>
                                <Statistic style={{color: 'white', fontWeight: 'bold'}} title="已批改/未批改" value={35}
                                           suffix="/ 50"/>
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '10%',
                                textAlign: 'center',
                                height: '90px'
                            }} hoverable={false}>
                                <Statistic style={{color: 'white', fontWeight: 'bold', paddingBottom: '20px'}}
                                           title="当前平均分" value={93} suffix="/ 100"/>
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '29%',
                                textAlign: 'center',
                                height: '90px'
                            }} hoverable={false}>
                                {this.state.studentIndex <= 0 ? null :
                                    <Icon type={'left'} onClick={
                                        () => {
                                            this.setState({
                                                studentIndex: this.state.studentIndex - 1
                                            })
                                        }
                                    } style={{float: 'left', marginTop: '5px'}}/>}
                                {this.state.studentHomeworkList[this.state.studentIndex].nickname}
                                {this.state.studentIndex >= (this.state.studentHomeworkList.length - 1) ? null :
                                    <Icon type={'right'} onClick={
                                        () => {
                                            this.setState({
                                                studentIndex: this.state.studentIndex + 1
                                            })
                                        }
                                    } style={{float: 'right', marginTop: '5px'}}/>}

                            </Card.Grid>

                        </Card>
                    </Col>
                    <Col span={17}>
                        <Card style={{height: '800px',overflow:'scroll'}}>
                            <img style={{overflow:'scroll'}} width={800} alt="logo" src={require("../../pic/deadHomework1.jpg" )}/>

                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card style={{height: '800px'}}>
                            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>作业类型 : </span>
                                {this.state.homework.accessmentalgorithms}</p>
                            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>截止时间 : </span>
                                {this.state.homework.endtime}</p>
                            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>提交时间 : </span>
                                {this.state.studentHomeworkList[this.state.studentIndex].handintime}</p>
                            {
                                this.state.studentHomeworkList[this.state.studentIndex].score === null ?
                                    <div>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评分 : </span>
                                            <InputNumber style={{marginLeft: '20px'}} id={'inputNumber'}min={0} max={100}/> /100</p>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评价 : </span>
                                            <TextArea style={{height:'200px',marginTop:'15px'}} id={'textarea'}/></p>
                                    </div>
                                    :
                                    <div>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评分 : </span>
                                            <span style={{fontSize: '20px', fontWeight: 'bold', color: 'blue'}}>已评分！</span>
                                            <p> {this.state.studentHomeworkList[this.state.studentIndex].score}/100</p>
                                            <Button  style={{fontWeight:'bold',marginLeft:'10px'}}> 重新评分 </Button>
                                          </p>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评价 : </span>
                                            <span style={{fontSize: '20px', fontWeight: 'bold', color: 'blue'}}>已评价！</span>
                                            <p>{this.state.studentHomeworkList[this.state.studentIndex].comment}</p>
                                            <Button  style={{fontWeight:'bold',marginLeft:'10px'}}> 重新评价 </Button>
                                        </p>
                                    </div>

                            }


                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

const styles = {
    listStyle: {
        width: '100%',
    }
};

export default Rating
