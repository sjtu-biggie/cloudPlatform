import React from 'react'
import {Card, Col, Row, Button, Tooltip, notification, Select, Typography,List,Divider, Icon, Upload, Avatar} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";
import  CommitPage from "./commitPage"

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

                    <CommitPage/>


                    <Card bordered={false} className='card-item'>
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={this.onEditorStateChange}
                            onContentStateChange={this.onContentStateChange}
                            wrapperClassName="wrapper-class"
                            editorClassName="editor-class"
                            toolbarClassName="toolbar-class"
                            localization={{ locale: 'zh'}}
                            toolbar={{
                                image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true }},
                            }}
                        />
                    </Card>
                    <Upload>
                        <Button><Icon type="upload"/>上传作业</Button>
                    </Upload>
                    <br></br>
                    <Button type="primary"  onclick={()=>this.setState({isCommit:!this.state.isCommit})} size={this.state.size}>{this.state.isCommit===true?"重新提交":"提交"}</Button>&emsp;
                </Card>
            </div>
        )
    }
}

export default HomeworkCommit