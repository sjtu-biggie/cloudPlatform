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
    Col, Row, Statistic, InputNumber, Steps, Progress
} from 'antd'
import axios from 'axios'
import TextArea from "antd/es/input/TextArea";
import {Axis, Chart, Geom, Tooltip} from "bizcharts";

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
        type: 0,
        step:0,
        size: 'default',
        bordered: true,
        loading: false,
        loadingMore: false,
        delete: false,
        role: 'teacher',
        homework:null,
    };

    componentWillMount() {

        this.setState({
            loading: true,
            homework:this.props.homework,
        });
        this.setState({
            loading: false
        });
    }

    render() {
        const data = [
            {year: '1991', value: 3},
            {year: '1992', value: 4},
            {year: '1993', value: 3.5},
            {year: '1994', value: 5},
            {year: '1995', value: 4.9},
            {year: '1996', value: 6},
            {year: '1997', value: 7},
            {year: '1998', value: 9},
            {year: '1999', value: 13}
        ];
        const cols = {
            'value': {min: 0},
            'year': {range: [0, 1]}
        };

        const data2 = [
            {year: '1951 年', sales: 38},
            {year: '1952 年', sales: 52},
            {year: '1956 年', sales: 61},
            {year: '1957 年', sales: 145},
            {year: '1958 年', sales: 48},
            {year: '1959 年', sales: 38},
            {year: '1960 年', sales: 38},
            {year: '1962 年', sales: 38},
        ];
        const cols2 = {
            'sales': {tickInterval: 20},
        };
        return (
            <div>
                {/*<Card bordered={false} style={{marginBottom: 10}} id='gradeCard'>*/}
                {/*    <Row>*/}
                {/*        <Col span={10} offset={6}>*/}

                {/*            <Steps current={this.state.step} style={{marginTop: '200px', fontWeight: 'bold'}}*/}
                {/*                   size="large">*/}
                {/*                <Steps.Step title="提交作业" onClick={() => {*/}
                {/*                    this.setState({step: 0})*/}
                {/*                }} description="排名更准确"/>*/}
                {/*                <Steps.Step title="学习数据" onClick={() => {*/}
                {/*                    this.setState({step: 1})*/}
                {/*                }} description="胜败乃兵家常事"/>*/}
                {/*                <Steps.Step title="数据分析" onClick={() => {*/}
                {/*                    this.setState({step: 2})*/}
                {/*                }} description="知己知彼"/>*/}
                {/*            </Steps>*/}

                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</Card>*/}
                        <Row>
                            <Col span={16}>
                                <Card style={{height:'130px'}}>
                                    <Statistic style={{marginTop:'10px',float:"left"}} title="姓名" value={'陈小红'} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="已完成作业数" value={12} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="缺交作业数" value={1} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="平均得分" value={84.25} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="近两周平均得分" value={86.75} />
                                    <Statistic style={{marginTop:'10px',float:"left",marginLeft:'30px'}} title="综合评级" value={'良'} />
                                </Card>
                            </Col>
                            <Col span={4}>
                                <Card style={{height:'130px'}}>
                                    位次比例
                                    <Progress style={{marginLeft:'10px'}} width={80} type="circle" percent={73} />
                                </Card>
                            </Col>
                            <Col span={4}>
                                <Card style={{height:'130px'}}>
                                    <Statistic style={{marginTop:'10px',display:'block'}} title="总排名" value={93} suffix="/ 120" />
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card style={{marginTop:'10px'}} title={'单次作业排名'}>
                                    <List
                                        pagination={{pageSize: 6}}
                                        dataSource={this.state.homework}
                                        renderItem={item => (
                                            <List.Item>
                                                <List.Item.Meta
                                                    title={<a  style={{color:'darkslategray',fontWeight:'bold',fontSize:'18px'}} href="https://ant.design">{item.title}</a>}
                                                />
                                                <div>成绩：{item.score}<br/> 排名：{item.rank}/120</div>
                                            </List.Item>
                                        )}
                                    >
                                        {this.state.loading && this.state.hasMore && (
                                            <div className="demo-loading-container">
                                                <Spin />
                                            </div>
                                        )}
                                    </List>
                                </Card>
                            </Col>

                        </Row>
                        <Row gutter={10} style={{marginTop:'10px'}}>
                            <Col span={12}>
                                <Card title='近一个月排名变化' bordered={false} className='card-item'>
                                    <Chart height={400} data={data} scale={cols} forceFit>
                                        <Axis name="year"/>
                                        <Axis name="value"/>
                                        <Tooltip crosshairs={{type: 'y'}}/>
                                        <Geom type="line" position="year*value" size={2}/>
                                        <Geom type='point' position="year*value" size={4} shape={'circle'}
                                              style={{stroke: '#fff', lineWidth: 1}}/>
                                    </Chart>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title='近一个月作业得分' bordered={false} className='card-item'>
                                    <Chart height={400} data={data2} scale={cols2} forceFit>
                                        <Axis name="year"/>
                                        <Axis name="sales"/>
                                        <Tooltip crosshairs={{type: 'y'}}/>
                                        <Geom type="interval" position="year*sales"/>
                                    </Chart>
                                </Card>
                            </Col>
                        </Row>
                }
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
