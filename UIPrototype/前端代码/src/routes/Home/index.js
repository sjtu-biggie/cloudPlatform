import React from 'react'
import {Card, Carousel, Col, Icon, List, Row} from 'antd'
import './style.css'
import axios from "axios";

const imgs = [
  '../../pic/home2.png',
];

class Home extends React.Component {
  state = {
    role: null,
    userInfo:null,
  };
  componentDidMount() {
  }

  componentWillMount() {
    let storage = window.localStorage;
    let username = storage.getItem("username");
    this.getUserInfo(username);
  }
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
          console.log(response.data);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    console.log(user);
    this.setState({
      userInfo:user,
      role:user.type
    })
  };
  beTeacher=async(data)=>{

  };
  beStudent=async(data)=>{

  };
  render() {
    return (
      <div style={styles.bg} className='home'>
        <Carousel arrows effect='fade' className='size'>
          {imgs.map(item=><div key={item}>

            <div className='size' id='picc'>
              <Row>
                <Col offset ={1} span={10} >
                  <Card style={styles.cd} id='teacher1'>
                    <Row>
<Col span={8}>
                    <img /*width={275}*/ alt="logo" height={530} src={require("../../pic/teacher.png")}/>
</Col>
                      <Col span={16}>
                    <p style={{textAlign:'center',fontSize:'40px',fontWeight:'bold',marginTop:'30px'}}>成为一名老师</p>
                        <p style={{textAlign:'center',fontSize:'25px',marginTop:'100px'}}><Icon type={'check'}/>方便管理学生信息</p>
                        <p style={{textAlign:'center',fontSize:'25px'}}><Icon type={'check'}/>自由创建修改课程</p>
                        <p style={{textAlign:'center',fontSize:'25px'}}><Icon type={'check'}/>快速批改学生作业</p>
                        <p style={{textAlign:'center',fontSize:'25px'}}><Icon type={'check'}/>详细数据统计分析</p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
                <Col offset ={2} span={10}>
                  <Card style={styles.cd} id='teacher1'>
                    <Row>
                      <Col span={8}>
                        <img /*width={275}*/ alt="logo" height={530} src={require("../../pic/student.png")}/>
                      </Col>
                      <Col span={16}>
                        <p style={{textAlign:'center',fontSize:'40px',fontWeight:'bold',marginTop:'30px'}}>成为一名学生</p>
                        <p style={{textAlign:'center',fontSize:'25px',marginTop:'100px'}}><Icon type={'check'}/>一键进入课堂环境</p>
                        <p style={{textAlign:'center',fontSize:'25px'}}><Icon type={'check'}/>提交作业便捷省心</p>
                        <p style={{textAlign:'center',fontSize:'25px'}}><Icon type={'check'}/>作业错题一目了然</p>
                        <p style={{textAlign:'center',fontSize:'25px'}}><Icon type={'check'}/>详细数据统计分析</p>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              </Row>
            </div></div>)}
          {/*不用img标签是因为图片大小会出现问题*/}
        </Carousel>


      </div>
    )
  }
}

const styles = {
  bg:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%'
  },
  cd:{
    border:'2px solid',
    marginTop:'155px',
    height:'600px'
  }
};

export default Home