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
    Col, Row, Statistic, InputNumber, Steps, Progress, Slider
} from 'antd'
import axios from 'axios'
import TextArea from "antd/es/input/TextArea";
import {Axis, Chart, Geom, Tooltip, Coor} from "bizcharts";

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

class RankData extends React.Component {
    state = {
        nickname:"加载中",
        times: 1,
        type: 0,
        step: 0,
        size: 'default',
        bordered: true,
        loading: false,
        loadingMore: false,
        delete: false,
        role: 'teacher',
        stat: {},
        rank: {},
        handinChange: [],
        ddlChange: [],
        homeworkRankChange: [],
        homeworkScoreChange: []

    };

    componentWillMount() {
        let storage = window.localStorage;
        let nickname = storage.getItem("nickname");
        this.setState({
            loading: true,
            nickname:nickname
        });
        this.getStudentStat(this.state.times);
        this.getRankStat();
        this.setState({
            loading: false
        });
    }

    getStudentStat = async (value) => {
        let times = value;
        let config = {
            method: 'get',
            url: 'http://124.70.201.12:8383/getStudentStatistics?studentId=' + this.props.userId + '&courseId=' + this.props.courseId + '&times=' + times,
            headers: {
                withCredentials: true,
            }
        };
        const data = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        let data1 = [], data2 = [], data3 = [], data4 = [];
        let handinChange = data.handinChange;
        let ddlChange = data.ddlChange;
        let homeworkRankChange = data.homeworkRankChange;
        let homeworkScoreChange = data.homeworkScoreChange;
        for (let i = 0; i < times; ++i) {
            data1.push({
                num: i + 1 + '次',
                value: homeworkRankChange[times - i - 1]
            });
            data2.push({
                num: i + 1 + '次',
                value: homeworkScoreChange[times - i - 1]
            });
            data3.push({
                num: i + 1 + '次',
                value: handinChange[times - i - 1]
            });
            data4.push({
                num: i + 1 + '次',
                value: ddlChange[times - i - 1]
            })
        }
        console.log(data1, data2);
        if(data.finishHomework===0 &&data.failedHomework===0 ){
            data.meanScore = "";
            data.recentMeanScore = "";
        }else{
            if(data.meanScore!==""&&data.meanScore!==undefined&&data.meanScore!==null)
            {
                data.meanScore = data.meanScore.toFixed(2);
                data.recentMeanScore = data.recentMeanScore.toFixed(2);
            }
        }
        this.setState({
            stat: data,
            homeworkRankChange: data1,
            homeworkScoreChange: data2,
            handinChange: data3,
            ddlChange: data4
        });
    };
    onChange = value => {
        console.log(value);
        let savetime = this.state.times;
        if (value > this.state.times) {
            this.setState({
                times: value
            });
            console.log(value);
            this.getStudentStat(value);
        } else {
            this.setState({
                times: value
            });
            let stat = this.state.stat;
            let rec = 0;
            let handinChange = this.state.handinChange;
            let ddlChange = this.state.ddlChange;
            let homeworkRankChange = this.state.homeworkRankChange;
            let homeworkScoreChange = this.state.homeworkScoreChange;
            handinChange.splice(0, savetime - value);
            ddlChange.splice(0, savetime - value);
            homeworkScoreChange.splice(0, savetime - value);
            for (let homeworkScore of homeworkScoreChange) {
                console.log(stat.recentMeanScore);
                rec += homeworkScore.value;
            }
            console.log(rec / homeworkScoreChange.length);
            stat.recentMeanScore = (rec / homeworkScoreChange.length).toFixed(2);
            console.log(stat.recentMeanScore);
            homeworkRankChange.splice(0, savetime - value);
            this.setState({
                homeworkRankChange: homeworkRankChange,
                homeworkScoreChange: homeworkScoreChange,
                handinChange: handinChange,
                ddlChange: ddlChange,
                stat: stat
            });

        }
    };
    getRankStat = async () => {
        let config = {
            method: 'get',
                url: 'http://124.70.201.12:8787/course/getRank?courseId=' + this.props.courseId + '&userId=' + this.props.userId,
                headers: {
                withCredentials: true,
            }
        };
        const data = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({rank: data});
    };

    render() {
        const colors = ["#FF8060", "#6BA8FF"];
        const cols = {
            'value': {min: 0, alias: '排名', tickInterval: 5},
            'num': {alias: '作业'},
        };
        const col3 = {
            'value': {min: 0, alias: '提交时间'},
            'num': {alias: '作业'},
        };
        const cols2 = {
            'value': {min: 0, alias: '成绩', tickInterval: 20, max: 100},
            'num': {alias: '作业'},
        };
        return (
            <div>
                <Row>
                    <Col span={16}>
                        <Card style={{height: '130px'}}>
                            <Statistic style={{marginTop: '10px', float: "left"}} title="姓名" value={this.state.nickname}/>
                            <Statistic style={{marginTop: '10px', float: "left", marginLeft: '30px'}} title="已完成作业数"
                                       value={this.state.stat.finishHomework}/>
                            <Statistic style={{marginTop: '10px', float: "left", marginLeft: '30px'}} title="进行作业数"
                                       value={this.state.stat.ongoingHomework}/>
                            <Statistic style={{marginTop: '10px', float: "left", marginLeft: '30px'}} title="缺交作业数"
                                       value={this.state.stat.failedHomework}/>
                            <Statistic style={{marginTop: '10px', float: "left", marginLeft: '30px'}} title="平均得分"
                                       value={this.state.stat.meanScore}/>
                            <Statistic style={{marginTop: '10px', float: "left", marginLeft: '30px'}} title="近來平均得分"
                                       value={this.state.stat.recentMeanScore}/>
                            <Statistic style={{marginTop: '10px', float: "left", marginLeft: '30px'}} title="综合评级"
                                       value={'良'}/>
                            <h1 style={{float: 'left', marginLeft: '40px', marginTop: '30px'}}>更改量度</h1>
                            <Slider
                                min={1}
                                step={1}
                                defaultValue={5}
                                max={this.state.stat.finishHomework + this.state.stat.failedHomework}
                                style={{float: 'left', width: '200px', marginLeft: '40px', marginTop: '30px'}}
                                onAfterChange={this.onChange}
                            />
                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card style={{height: '130px'}}>
                            <Row>
                                <Col style={{marginTop:'30px'}} span={8}>

                                位次比例
                                </Col>
                            {this.props.seeCourseAverage&&this.state.stat.meanScore!=="" ? <div>
                                <Progress style={{marginLeft: '10px'}} width={80} type="circle"
                                          percent={Math.floor(this.state.rank.rank * 100 / this.state.rank.altogether)}/>
                            </div> : <img style={{marginLeft: '30px'}} width={80} alt="logo"
                                          src={require("../../pic/market-svg/031-lock.svg")}/>
                            }
                            </Row>

                        </Card>
                    </Col>
                    <Col span={4}>
                        <Card style={{height: '130px'}}>
                            {this.props.seeCourseAverage ?
                                <div>
                                    <Statistic style={{marginTop: '10px', float: 'left'}} title="总排名"
                                               value={this.state.rank.rank} suffix={"/ " + this.state.rank.altogether}/>
                                    {this.state.rank.rank ===1?
                                    < img style={{float: 'left', marginLeft: '30px'}} width={80} alt="logo"
                                          src={require("../../pic/school-svg/037-medal.svg")}/>:<img style={{marginLeft: '30px'}} width={80} alt="logo"
                                                                                                     src={require("../../pic/market-svg/001-dislike.svg")}/>}
                                </div> : <div>总排名 <img style={{marginLeft: '30px'}} width={80} alt="logo"
                                                                                  src={require("../../pic/market-svg/031-lock.svg")}/></div>
                            }
                        </Card>
                    </Col>
                </Row>
                <Row gutter={10} style={{marginTop: '10px'}}>
                    <Col span={12}>
                        <Card title='作业排名变化' bordered={false} className='card-item' style={{width: '950px'}}>
                            {this.props.seeHomeworkAverage ?
                                <Chart height={400} data={this.state.homeworkRankChange} scale={cols} forceFit>
                                    <Axis name="num" title={"作业"}/>
                                    <Axis name="value" title={"排名"} label={{
                                        formatter(text, item, index) {
                                            if (text === '0') return (null);
                                            else return '第' + text + '名'
                                        }
                                    }}/>
                                    <Tooltip crosshairs={{type: 'y'}}/>
                                    <Geom type="line" position="num*value" size={2}/>
                                    <Geom type='point' position="num*value" size={4} shape={'circle'}
                                          style={{stroke: '#fff', lineWidth: 1}}/>
                                </Chart> :<div style={{height:'405px'}}><img style={{marginLeft: '340px',marginTop:'150px'}} width={80} alt="logo"
                                               src={require("../../pic/market-svg/031-lock.svg")}/></div>}

                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='作业得分变化' bordered={false} className='card-item' style={{width: '950px'}}>
                            <Chart height={400} data={this.state.homeworkScoreChange} scale={cols2} forceFit>
                                <Axis name="num" title={"作业"} label={{style: {textAlign: 'end'}}}/>
                                <Axis name="value" title={"成绩"} label={{
                                    formatter(text, item, index) {
                                        return text + '分'
                                    }
                                }}/>
                                <Tooltip crosshairs={{type: 'y'}}/>
                                <Geom type="interval" position="num*value"/>
                            </Chart>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='提交时间变化' bordered={false} className='card-item' style={{width: '950px'}}>
                            <Chart height={400} data={this.state.handinChange} scale={col3} forceFit>
                                <Axis name="num" title={"提交时间"}/>
                                <Axis name="value" title={"排名"} label={{
                                    formatter(text, item, index) {
                                        if (text === '0') return (null);
                                        else return Math.floor(parseInt(text) / 60) + "小时"
                                    }
                                }}/>
                                <Tooltip crosshairs={{type: 'y'}}/>
                                <Geom type="line" position="num*value" size={2}/>
                                <Geom type='point' position="num*value" size={4} shape={'circle'}
                                      style={{stroke: '#fff', lineWidth: 1}}/>
                            </Chart>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title='剩余时间变化' bordered={false} className='card-item' style={{width: '950px'}}>
                            <Chart height={400} data={this.state.ddlChange} scale={col3} forceFit>
                                <Axis name="num" title={"提交时间"}/>
                                <Axis name="value" title={"排名"} label={{
                                    formatter(text, item, index) {
                                        if (text === '0') return (null);
                                        else return Math.floor(parseInt(text) / 60) + "小时"
                                    }
                                }}/>
                                <Tooltip crosshairs={{type: 'y'}}/>
                                <Geom type="line" position="num*value" size={2}/>
                                <Geom type='point' position="num*value" size={4} shape={'circle'}
                                      style={{stroke: '#fff', lineWidth: 1}}/>
                            </Chart>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

const styles = {
    listStyle: {
        width: '100%',
    }
};

export default RankData
