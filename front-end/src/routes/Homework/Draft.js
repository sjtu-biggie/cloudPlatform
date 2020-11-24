import React from 'react'
import {Card} from 'antd'
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './style.css'
import draftToHtml from 'draftjs-to-html';

const content = {"entityMap":{},"blocks":[{"key":"637gr","text":"Initialized from content state.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}]};
class Draft extends React.Component{
    state = {
        editorState: EditorState.createEmpty(),
        contentState:content,

    };

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
        let editorContent = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        if (this.props.flag === 'content'){
            this.props.parent.getContent(this, editorContent);
        }
        else if (this.props.flag === 'answer'){
            this.props.parent.getAnswer(this, editorContent);
        }

    };
    onContentStateChange =  (contentState) => {
        this.setState({
            contentState,
        });
    };

    uploadImageCallBack = ()=>{

    }
    render(){
        const { editorState } = this.state;
        return (
            <div>
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
            </div>
        )
    }
}
export default Draft
