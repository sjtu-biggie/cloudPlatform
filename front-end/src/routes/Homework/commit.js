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
        comment:""
    };

    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        console.log(file);
    }

    getChildrenMsg = (result, correct,comment,title) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        console.log(comment)
        this.setState({
            correct: correct,
            comment:comment,
            title:title
        })
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
                    <Upload></Upload>
                    <br></br>
                    <Button type="primary"  onClick={()=>this.setState({isCommit:!this.state.isCommit})} size={this.state.size}>{this.state.isCommit===true?"重新提交":"提交"}</Button>&emsp;
                </Card>
            </div>
        )
    }
}

export default HomeworkCommit