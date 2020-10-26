import React from 'react'
import CanvasDraw from "react-canvas-draw"
// import LZString from "/node_modules/string"
import {
    Card,
    Spin,
    Button,
    Radio,
    Icon,
    Form,
    Dropdown,
    Input,
    Menu,
    message,
    Col, Row, Statistic, InputNumber, Slider, Modal
} from 'antd'
import axios from 'axios'
import TextArea from "antd/es/input/TextArea";
import {withRouter} from 'react-router'


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
        saveableCanvas:"",
        visibleHomework:false,
        visibleAnswer:false,
        handinAlready: 10000,
        status: 3,
        type: 0,
        size: 'default',
        bordered: true,
        loading: false,
        loadingMore: false,
        delete: false,
        role: 'teacher',
        studentIndex: 0,
        homework: {},
        penSize: 5,
        penLazy: 1,
        index: 0,
        average: 0,
        assignHomework:{}
    };
    add0 = (m) => {
        return m < 10 ? '0' + m : m
    };
    format = (shijianchuo) => {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
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
    getAverageScore = async (homework) => {
        if(homework===undefined) return;
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8383/getAverage?homeworkId=' + homework,
            headers: {
                withCredentials: true,
            }
        };
        let data = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        if (data !== null && data !== undefined) {
            data = data.toFixed(2);
        }
        this.setState({
            average: data,
        })
    };
    getHomework = async(homeworkId)=>{
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8383/getTeacherHomeworkOne?homeworkId=' + homeworkId,
            headers: {
                withCredentials: true,
            }
        };
        let data = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.setState({
            assignHomework:data,
        })
    };
    componentWillMount = () => {
        this.setState({
            handinAlready: this.props.handinAlready,
            loading: true,
            homework: this.props.homework,
            index: this.props.index,

        });
        console.log(this.props.homework);
        this.setState({
            loading: false
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            loading: true,
            handinAlready: nextProps.handinAlready,
            homework: nextProps.homework,
            index: nextProps.index
        });
        console.log(nextProps.homework);
        if(nextProps.homework===undefined){
            return;
        }
        this.getAverageScore(nextProps.homework.homeworkId);
        this.getHomework(nextProps.homework.homeworkId);
        this.setState({
            loading: false
        });
    }

    render = () => {
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
        const {penSize} = this.state;
        const {penLazy} = this.state;

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
                                height: '90px',
                            }}>
                                <p id={"seeHomework"} onClick={this.showModalHomework}>
                                    查看作业
                                </p>
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '10%',
                                textAlign: 'center',
                                height: '90px'
                            }}>
                                <p id={"seeAnswer"} onClick={this.showModalAnswer}>
                                    查看答案
                                </p>
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
                                <p style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>已批/未批</p>
                                <Statistic style={{marginBottom: '30px', transform: 'translateY(-60%)'}}
                                           valueStyle={{color: 'white', fontWeight: 'bold'}} value={35}
                                           suffix="/ 50"/>
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '10%',
                                textAlign: 'center',
                                height: '90px',
                                color: 'white'
                            }} hoverable={false}>
                                <p style={{fontSize: 20, color: 'white', fontWeight: 'bold'}}>当前平均分</p>
                                <Statistic style={{transform: 'translateY(-40%)'}}
                                           valueStyle={{color: 'white', fontWeight: 'bold', paddingBottom: '20px'}}
                                           value={this.state.average} suffix="/ 100"/>
                            </Card.Grid>
                            <Card.Grid style={{
                                width: '29%',
                                textAlign: 'center',
                                height: '90px'
                            }} hoverable={false}>
                                {this.state.index == 0 ? null :
                                    <Icon type={'left'} onClick={
                                        () => {
                                            this.getNewHomework(Number(this.state.index) - 1, -1);
                                        }
                                    } style={{float: 'left', marginTop: '5px'}}/>}
                                {this.state.homework.nickName}
                                {this.state.index == (this.state.handinAlready - 1) ? null :
                                    <Icon type={'right'} onClick={
                                        () => {
                                            this.getNewHomework(Number(this.state.index) + 1, 1);
                                        }
                                    } style={{float: 'right', marginTop: '5px'}}/>}

                            </Card.Grid>

                        </Card>
                    </Col>
                    <Col span={17}>
                        <Card style={{height: '800px', overflow: 'scroll'}}>
                            {this.state.status === status.DRAWING ? <CanvasDraw
                                ref={canvasDraw => (this.saveableCanvas = canvasDraw)} {...defaultProps}/> : this.state.status === status.NOTING ? null :
                                <img style={{overflow: 'scroll'}} width={900} alt="logo"
                                     src={require("../../pic/deadHomework1.jpg")}/>}
                            {/**/}

                        </Card>
                        <Modal
                            title="作业内容"
                            visible={this.state.visibleHomework}
                            onOk={this.handleOk}
                            onCancel={this.handleOk}
                            footer={[
                                <Button key="back" onClick={this.handleOk}>
                                    关闭
                                </Button>,
                            ]}
                        >
                            <p>Some contents...</p>
                        </Modal>
                        <Modal
                            title="作业答案"
                            visible={this.state.visibleAnswer}
                            onOk={this.handleOk}
                            onCancel={this.handleOk}
                            footer={[
                                <Button key="back" onClick={this.handleOk}>
                                    关闭
                                </Button>,
                            ]}
                        >
                            <p>{this.state.assignHomework.answer}</p>
                        </Modal>
                    </Col>
                    <Col span={7}>
                        <Card style={{height: '800px'}}>
                            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>作业类型 : </span>
                                {this.state.homework.accessmentalgorithms}</p>
                            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>截止时间 : </span>
                                {this.format(this.state.homework.endTime)}</p>
                            <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>提交时间 : </span>
                                {this.format(this.state.homework.handinTime)}</p>
                            {
                                this.state.homework.score === null ?
                                    <div>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评分 : </span>
                                            <InputNumber style={{marginLeft: '20px'}} id={'inputNumber'} min={0}
                                                         max={100}/> /100</p>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评价 : </span>
                                            <TextArea style={{height: '200px', marginTop: '15px'}} id={'textarea'}/></p>
                                    </div>
                                    :
                                    <div style={{height: '320px'}}>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评分 : </span>
                                            <span style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'blue'
                                            }}>已评分！</span>
                                            <p style={{marginTop: '10px'}}> {this.state.homework.score}/100</p>
                                            <div style={{height: '30px'}}/>
                                        </p>
                                        <p style={{fontSize: '20px'}}><span style={{fontWeight: 'bold'}}>评价 : </span>
                                            <span style={{
                                                fontSize: '20px',
                                                fontWeight: 'bold',
                                                color: 'blue'
                                            }}>已评价！</span>
                                            <p>{this.state.homework.comment}</p>
                                            <Button onClick={() => {
                                                let homework = this.state.homework;
                                                homework.score = null;
                                                homework.comment = "";
                                                this.setState({
                                                    homework: homework
                                                })
                                            }} style={{fontWeight: 'bold', marginLeft: '10px'}}> 重新评价 </Button>
                                        </p>
                                    </div>
                            }

                            <div style={{height: '200px'}}>
                                {
                                    this.state.status === status.DRAWING ? <div>
                                        <span style={{fontWeight: 'bold'}}> 画笔大小</span>
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
                                                    style={{margin: '0 16px'}}
                                                    value={penSize}
                                                    onChange={this.onChange}
                                                />
                                            </Col>
                                        </Row>
                                        <span style={{fontWeight: 'bold'}}> 画笔延迟</span>
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
                                                    style={{margin: '0 16px'}}
                                                    value={penLazy}
                                                    onChange={this.onChange2}
                                                />
                                            </Col>
                                        </Row>
                                        <Row style={{marginTop: '15px'}}>
                                            <Col span={3}>
                                                <Button onClick={() => {
                                                    this.saveableCanvas.undo()
                                                }} style={{fontWeight: 'bold', marginLeft: '10px'}}> 撤销一笔 </Button>
                                            </Col>
                                            <Col offset={3} span={3}>
                                                <Button onClick={() => {
                                                    this.saveableCanvas.clear()
                                                }} style={{fontWeight: 'bold', marginLeft: '10px'}}> 清除画布 </Button>
                                            </Col>
                                            <Col offset={3} span={3}>
                                                <Button onClick={() => {
                                                    this.setState({
                                                        saveableCanvas:this.saveableCanvas.getSaveData()
                                                    });
                                                    console.log(this.saveableCanvas.getSaveData());
                                                }} style={{fontWeight: 'bold', marginLeft: '10px'}}> 保存画布 </Button>
                                            </Col>
                                        </Row>

                                    </div> : null
                                }
                            </div>
                            <Row>
                                <Col offset={1} span={7}>
                                    <img onClick={() => {
                                        this.setState({status: status.DRAWING})
                                    }} style={{float: 'left'}} width={80} alt="logo"
                                         src={require("../../pic/school-svg/002-marker.svg")}/>
                                </Col>
                                <Col offset={1} span={7}>
                                    <img onClick={() => {
                                        this.setState({status: status.READING})
                                    }} style={{float: 'left'}} width={80} alt="logo"
                                         src={require("../../pic/school-svg/012-laptop.svg")}/>
                                </Col>
                                <Col offset={1} span={7}>
                                    <img onClick={() => {
                                        this.setState({status: status.READING})
                                        this.submitRate();
                                    }} style={{float: 'left'}} width={80} alt="logo"
                                         src={require("../../pic/market-svg/013-backup.svg")}/>
                                </Col>
                            </Row>

                        </Card>
                    </Col>
                </Row>
            </div>
        )
    };
    submitRate=()=>{
        if(!(this.state.homework.score === null)){
            message.error("请先点击重新评价，再提交批改");
            return 1;
        }
        let score = document.getElementById("inputNumber").value;
        let comment = document.getElementById("textarea").value;
        let drawing = this.state.saveableCanvas;
        // score = score.value;
        // comment = comment.value;
        if (score===""||score===null||comment===""||comment===null){
            message.error("请填写正确的分数和评语！");
            return 1;
        }
    };
    showModalHomework = () => {
        this.setState({
            visibleHomework: true,
        });
    };
    showModalAnswer = () => {
        this.setState({
            visibleAnswer: true,
        });
    };


    handleOk = e => {
        console.log(e);
        this.setState({
            visibleHomework: false,
            visibleAnswer: false,
        });
    };
    getNewHomework = async (newIndex, value) => {
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8383/getPageHomeworkOfStudents?homeworkId=' + this.state.homework.homeworkId + '&page=' + newIndex + '&size=1',
            headers: {
                withCredentials: true,
            }
        };
        let data = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        this.props.history.push("/home/homework/rate/" + this.state.handinAlready + "/" + this.state.homework.homeworkId + "/" + data[0].studentId + "/" + newIndex + "/");
        this.setState({homework: data[0], index: newIndex,saveableCanvas:""})
    }
}


export default withRouter(Rating)
