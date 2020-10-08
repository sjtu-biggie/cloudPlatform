import React from 'react'
import {Card, Col, Row, Button, Tooltip, notification, Select, Typography,List,Divider, Icon, Upload, Avatar} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";

const { Text, Link } = Typography;
class HomeworkCommit extends React.Component{

    state={
        title:"作业0",
        id:1,
        avatar: '../../assets/img/mistakes.png',
        content: '已知：如图，P是正方形ABCD内点，∠PAD=∠PDA=15° 求证：△PBC是正三角形',
        time:"2020-10-1 20:00",
        editorState: EditorState.createEmpty(),
        size: 'default',
        iscommit:true,
        overddl:true,
};

    render(){
        const { editorState,contentState } = this.state;
        return (
            <div>
                <CustomBreadcrumb arr={['作业','提交']}/>
                <Card  bordered={false} className='card-item' title={this.state.title} style={{minHeight:200}}>

                    <Row>
                        <Col span={20}>{this.state.description}</Col>
                        <Col span={4}>{this.state.overddl===true?"已截止 |":"未截止 |"}{this.state.iscommit===true?" 已提交":" 未提交"}</Col>
                    </Row>
                    <Row>
                        <img  alt="logo" src={require("../../assets/img/mistakes.png" )}/>
                    </Row>
                    <Row>
                        <Text type={"secondary"}>{"截止日期："+this.state.time}</Text>
                    </Row>


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
                    <Button type="primary" size={this.state.size}>{this.state.iscommit===true?"重新提交":"提交"}</Button>&emsp;
                </Card>
            </div>
        )
    }
}

export default HomeworkCommit