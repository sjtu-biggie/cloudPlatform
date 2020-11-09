import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import {Card} from 'antd'

export default class BasicDemo extends React.Component {

    state = {
        editorState: BraftEditor.createEditorState(''), // 设置编辑器初始内容
        outputHTML: ''
    }

    componentDidMount () {
        this.isLivinig = true
        // 3秒后更改编辑器内容
        setTimeout(this.setEditorContentAsync, 3000)
    }

    componentWillUnmount () {
        this.isLivinig = false
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
        this.toParent()
    }

    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
        })
    }

    toParent = () => {
        // console.log(this.props.parent.getChildrenMsg.bind(this, this.state.msg))
        this.props.parent.getEditorMsg(this,this.state.outputHTML)
    }

    render () {

        const { editorState, outputHTML } = this.state

        return (
            <div>
                <div className="editor-wrapper">
                    <Card>
                        <BraftEditor
                            value={editorState}
                            onChange={this.handleChange}
                        /></Card>
                </div>
            </div>
        )
    }
}