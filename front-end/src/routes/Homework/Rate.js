import React from 'react'
import CanvasDraw from "react-canvas-draw"
// import LZString from "/node_modules/string"
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
    Col, Row, Statistic, InputNumber, Slider
} from 'antd'
import axios from 'axios'
import TextArea from "antd/es/input/TextArea";
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};

const status = {
    DRAWING: 1,
    NOTING: 2,
    READING: 3,
};

class Rating extends React.Component {
    state = {
        status:3,
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
        penSize:5,
        penLazy:1
    };
    onChange = value => {
        this.setState({
            penSize: value,
        });
    };
    onChange2 = value => {
        this.setState({
            penLazy: value,
        });
    };
    componentWillMount=()=> {

        this.setState({
            loading: true,
            studentHomeworkList: this.props.studentHomeworkList,
            homework: this.props.homework
        });
        this.setState({
            loading: false
        });
    }

    render=()=> {
        let defaultProps = {
            lazyRadius: this.state.penLazy,
            onChange: null,
            loadTimeOffset: 5,
            brushRadius: this.state.penSize,
            brushColor: "red",
            catenaryColor: "#0a0302",
            gridColor: "rgba(150,150,150,0.17)",
            hideGrid: false,
            canvasWidth: 900,
            canvasHeight: 1000,
            disabled: false,
            imgSrc: require("../../pic/deadHomework1.jpg"),
            saveData: null,
            immediateLoading: false,
            hideInterface: false
        };
        const { penSize } = this.state;
        const { penLazy } = this.state;

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
                                <p style={{fontSize:20,color: 'white', fontWeight: 'bold'}}  >已批/未批</p>
                                <Statistic style={{marginBottom:'30px',transform:'translateY(-60%)'}} valueStyle={{color: 'white', fontWeight: 'bold'}}  value={35}
                                           suffix="/ 50"/>
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '10%',
                                textAlign: 'center',
                                height: '90px',
                                color:'white'
                            }} hoverable={false}>
                                <p style={{fontSize:20,color: 'white', fontWeight: 'bold'}}  >当前平均分</p>
                                <Statistic style={{transform:'translateY(-40%)'}} valueStyle={{color: 'white', fontWeight: 'bold', paddingBottom: '20px'}}
                                            value={93} suffix="/ 100"/>
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
                            {this.state.status === status.DRAWING? <CanvasDraw ref={canvasDraw => (this.saveableCanvas = canvasDraw)} {...defaultProps}/>:this.state.status === status.NOTING?null:<img style={{overflow:'scroll'}} width={900} alt="logo" src={require("../../pic/deadHomework1.jpg" )}/>}
                            {/**/}

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
                                            <InputNumber style={{marginLeft: '20px'}} id={'inputNumber'} min={0} max={100}/> /100</p>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评价 : </span>
                                            <TextArea style={{height:'200px',marginTop:'15px'}} id={'textarea'}/></p>
                                    </div>
                                    :
                                    <div style={{height:'320px'}}>
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

                            <div style={{height:'200px'}}>
                                {
                                    this.state.status === status.DRAWING?      <div>
                                        <span style={{fontWeight:'bold'}}> 画笔大小</span>
                                        <Row>
                                        <Col span={12}>
                                            <Slider
                                                min={1}
                                                max={50}
                                                onChange={this.onChange}
                                                value={typeof penSize === 'number' ? penSize : 0}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <InputNumber
                                                min={1}
                                                max={50}
                                                style={{ margin: '0 16px' }}
                                                value={penSize}
                                                onChange={this.onChange}
                                            />
                                        </Col>
                                    </Row>
                                        <span style={{fontWeight:'bold'}}> 画笔延迟</span>
                                        <Row>
                                            <Col span={12}>
                                                <Slider
                                                    min={1}
                                                    max={50}
                                                    onChange={this.onChange2}
                                                    value={typeof penLazy === 'number' ? penLazy : 0}
                                                />
                                            </Col>
                                            <Col span={4}>
                                                <InputNumber
                                                    min={1}
                                                    max={50}
                                                    style={{ margin: '0 16px' }}
                                                    value={penLazy}
                                                    onChange={this.onChange2}
                                            />
                                        </Col>
                                        </Row>
                                        <Row style={{marginTop:'15px'}}>
                                            <Col  span={3}>
                                                <Button  onClick={()=>{this.saveableCanvas.undo()}} style={{fontWeight:'bold',marginLeft:'10px'}}> 撤销一笔 </Button>
                                            </Col>
                                            <Col  offset={3} span={3}>
                                                <Button  onClick={()=>{this.saveableCanvas.clear()}} style={{fontWeight:'bold',marginLeft:'10px'}}> 清除画布 </Button>
                                            </Col>
                                            <Col offset={3} span={3}>
                                                <Button  onClick={()=>{console.log(this.saveableCanvas.getSaveData())}} style={{fontWeight:'bold',marginLeft:'10px'}}> 保存画布 </Button>
                                            </Col>
                                        </Row>

                                    </div>:null
                                }
                            </div>
                            <Row>
                                <Col offset={1} span={7}>
                                    <img onClick={()=>{this.setState({status:status.DRAWING})}} style={{float:'left'}} width={80} alt="logo" src={require("../../pic/school-svg/002-marker.svg" )}/>
                                </Col>
                                <Col offset={1} span={7}>
                                    <img onClick={()=>{this.setState({status:status.NOTING})}} style={{float:'left'}} width={80} alt="logo" src={require("../../pic/school-svg/001-exam.svg" )}/>
                                </Col>
                                <Col offset={1} span={7}>
                                    <img onClick={()=>{this.setState({status:status.READING})}} style={{float:'left'}} width={80} alt="logo" src={require("../../pic/school-svg/012-laptop.svg" )}/>
                                </Col>
                            </Row>

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
