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
        title:"",
        homeworkId:"",
        correct:"",
        comment:"",
        handinTime:"",
        fileList:[]
    };

    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        console.log(file);
    }

    getChildrenMsg = (result, correct,comment,title,handinTime) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        console.log(comment)
        this.setState({
            correct: correct,
            comment:comment,
            title:title,
            handinTime:handinTime
        })
    }

    getUploadMsg = (result, fileList) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        this.setState({
            fileList:fileList
        })
    }

    postObject = async() => {
        console.log(this.state.fileList)
        let obj={
            fileList:this.state.fileList,
            homeworkId:this.state.homeworkId,
            handinTime:new Date().toLocaleTimeString(),
            studentId:localStorage.getItem("username")
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

    componentWillMount() {
        this.setState({
            homeworkId:this.props.match.params[0].substr(1)
        });
        console.log(this.props.match.params[0].substr(1))
    }

    componentDidMount() {
        console.log(this.state.correct)
    }

    render(){
        const { editorState,contentState } = this.state;
        return (
            <div>
                <CustomBreadcrumb arr={['作业','提交']}/>
                <Card  bordered={false} className='card-item' title={this.state.title} style={{minHeight:200}}>

                    <CommitPage homeworkId={this.state.homeworkId} parent={this}/>


                    <Card bordered={false} className='card-item'>
                        <RichText></RichText>
                    </Card>
                    <p>{this.state.correct}</p>
                    <p>{this.state.comment}</p>
                    <Upload parent={this}></Upload>
                    <br></br>
                    <Button type="primary"  onClick={()=>this.postObject()}>{this.state.handinTime!==null?"重新提交":"提交"}</Button>&emsp;
                </Card>
            </div>
        )
    }
}

export default HomeworkCommit