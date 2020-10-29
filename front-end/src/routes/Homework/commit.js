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
        title:"作业0",
        isCommit:false,
        homeworkId:""
    };

    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        console.log(file);
    }

    componentWillMount() {
        this.setState({
            homeworkId:this.props.match.params[0].substr(1)
        });
        console.log(this.props.match.params[0].substr(1))
    }

    componentDidMount() {
        console.log(this.state.homeworkId)
    }

    render(){
        const { editorState,contentState } = this.state;
        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <div>
                <CustomBreadcrumb arr={['作业','提交']}/>
                <Card  bordered={false} className='card-item' title={this.state.title} style={{minHeight:200}}>

                    <CommitPage isCommit={this.state.isCommit} homeworkId={this.state.homeworkId} />


                    <Card bordered={false} className='card-item'>
                        <RichText></RichText>
                    </Card>
                    <Upload></Upload>
                    <br></br>
                    <Button type="primary"  onClick={()=>this.setState({isCommit:!this.state.isCommit})} size={this.state.size}>{this.state.isCommit===true?"重新提交":"提交"}</Button>&emsp;
                </Card>
            </div>
        )
    }
}

export default HomeworkCommit