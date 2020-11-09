import React from 'react'
import {Card, Col, Row, Button, Tooltip, notification, Select,message, Typography,List,Divider, Icon, Avatar} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";
import  CommitPage from "./commitPage"
import RichText from "./RichText"
import * as XLSX from "xlsx";
import {fileToObject} from "antd/es/upload/utils";
import axios from "axios";
import Upload from "./upload"

const { Text, Link } = Typography;

class HomeworkCommit extends React.Component{

    state={
        homeworkId:"",
        content:"",
        comment:"",
        handinTime:"",
        file:[],
        homework:[]
    };

    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        console.log(file);
    }

    getChildrenMsg = (result, homework) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        this.setState({
            homework:homework,
            content:homework.content
        })
    }

    getUploadMsg = (result, fileList) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        this.setState({
            file:fileList,
        })
        console.log(this.state.file)
        let homework=this.state.homework;
        for(let i=0;i<fileList.length;i++){
            homework.upload.push(fileList[i].response)
        }
        console.log(homework)
    }

    getEditorMsg = (result, editorContent) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        let homework=this.state.homework;
        homework.content=editorContent;
        this.setState({
            homework:homework
        })
        console.log(this.state.homework)
    }

    postObject = async() => {

        let homework=this.state.homework;
        homework.handinTime=new Date();
        this.setState({
            homework: homework
        })

        console.log(this.state.homework)

        let obj={
            homework:this.state.homework,
        }

        console.log(obj)

        let config = {
            method: 'post',
            data: obj,
            url: 'http://106.13.209.140:8383/addStudentHomework',
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
    }

    changeData=(e)=>{//input输入什么，就监听这个方法，然后再修改state，然后返回到视图
        this.setState({
            file:[e.target.value]
        })
    }

    componentWillMount() {
        this.setState({
            homeworkId:this.props.match.params[0].substr(1)
        });
    }

    componentDidMount() {
        console.log(this.state.correct)
    }

    render(){
        const { editorState,contentState } = this.state;
        return (
            <div>
                <CustomBreadcrumb arr={['作业','提交']}/>
                <Card  bordered={false} className='card-item' title={this.state.homework.title} style={{minHeight:200}}>

                    <CommitPage homeworkId={this.state.homeworkId} parent={this}/>


                    <Card bordered={false} className='card-item'>
                        <RichText parent={this}></RichText>
                    </Card>
                    <Card title="作业内容" >
                        <p>{this.state.content}</p>

                    </Card> <br/>
                    <Card title="批改内容"  >
                        <p>{this.state.homework.correct}</p>
                    </Card><br/>
                    <Card title="作业评论" >
                        <p>{this.state.homework.comment}</p>
                    </Card><br/>
                    <Upload parent={this}></Upload>
                    <br></br>
                    <Button type="primary"  onClick={()=>this.postObject()}>{this.state.homework.handinTime!==null?"重新提交":"提交"}</Button>&emsp;
                </Card>
            </div>

        )
    }
}

export default HomeworkCommit
