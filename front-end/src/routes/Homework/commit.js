import React from 'react'
import {Card, Col, Row, Button, Tooltip, notification, Select, Typography,List,Divider, Icon, Upload, Avatar} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";
import  CommitPage from "./commitPage"
import RichText from "./RichText"

const { Text, Link } = Typography;




class HomeworkCommit extends React.Component{

    state={
        title:"作业0",
        isCommit:false,
    };

    render(){
        const { editorState,contentState } = this.state;
        return (
            <div>
                <CustomBreadcrumb arr={['作业','提交']}/>
                <Card  bordered={false} className='card-item' title={this.state.title} style={{minHeight:200}}>

                    <CommitPage isCommit={this.state.isCommit} />


                    <Card bordered={false} className='card-item'>
                        <RichText></RichText>
                    </Card>
                    <br></br>
                    <Button type="primary"  onClick={()=>this.setState({isCommit:!this.state.isCommit})} size={this.state.size}>{this.state.isCommit===true?"重新提交":"提交"}</Button>&emsp;
                </Card>
            </div>
        )
    }
}

export default HomeworkCommit