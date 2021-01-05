import React from 'react'
import {Card, Col, Row, Button, Tooltip, notification, Select, Typography,List,Divider, Icon, Upload, Avatar} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";
import Commit from "./commit"

const { Text, Link } = Typography;
class commitPage extends React.Component{

    state={
        avatar: '../../assets/img/mistakes.png',
        content: '已知：如图，P是正方形ABCD内点，∠PAD=∠PDA=15° 求证：△PBC是正三角形',
        time:"2020-10-1 20:00",
        editorState: EditorState.createEmpty(),
        size: 'default',
        overDdl:false,
        isCommit:null,
    };


    componentWillMount() {
        this.setState({
            isCommit:this.props.isCommit
        })
    }

    render(){
        const { editorState,contentState } = this.state;
        return (

            <div>
                    <Row>
                        <Col span={20}>{this.state.content}</Col>
                        <Col span={4}>{this.state.overDdl===true?"已截止 |":"未截止 |"}{this.state.isCommit===true?" 已提交":" 未提交"}</Col>
                    </Row>
                    <Row>
                        <img  alt="logo" src={require("../../assets/img/mistakes.png" )}/>
                    </Row>
                    <Row>
                        <Text type={"secondary"}>{"截止日期："+this.state.time}</Text>
                    </Row>
            </div>
        )
    }
}

export default commitPage