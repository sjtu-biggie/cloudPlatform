import React from 'react'
import {Card, Col, Row, Button, Tooltip, notification, Select, Typography,List,Divider, Icon, Avatar,message} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";
import Commit from "./commit"
import axios from "axios";
import {UploadOutlined} from "@ant-design/icons";


const { Text, Link } = Typography;
class commitPage extends React.Component{

    state={
        content: '已知：如图，P是正方形ABCD内点，∠PAD=∠PDA=15° 求证：△PBC是正三角形',
        endTime:"2020-10-1 20:00",
        editorState: EditorState.createEmpty(),
        size: 'default',
        overDdl:false,
        isCommit:null,
        homeworkId:"",
    };

    format = (shijianchuo) => {
        let time = new Date(shijianchuo);
        let y = time.getFullYear();
        let m = time.getMonth() + 1;
        let d = time.getDate();
        let h = time.getHours();
        let mm = time.getMinutes();
        let s = time.getSeconds();
        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
    };

    add0 = (m) => {
        return m < 10 ? '0' + m : m
    }

    getTeacherHomeworkOne=async (hid)=>{
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8383/getTeacherHomeworkOne?homeworkId='+hid,
            headers: {
                withCredentials: true,
            }
        };
        const hw = await axios(config)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
        console.log(hw);
        hw.endTime = this.format(hw.endTime);
        this.setState({
            content:hw.content,
            endTime:hw.endTime
        })
    };
    componentWillMount() {
        this.setState({
            isCommit:this.props.isCommit,
            homeworkId:this.props.homeworkId
        })
        let username=localStorage.getItem("username");
        console.log(username);

    }

    MyUpLoad = (option) => {
        let images = this.state.images;
        let len = this.state.uids.length;
        let temp = [];
        temp.push(this.state.uids[len - 1]);

        const formData = new FormData();
        formData.append("files[]", option.file);
        const reader = new FileReader();
        reader.readAsDataURL(option.file);

        reader.onloadend = (e) => {

            if (e && e.target && e.target.result) {
                option.onSuccess();
                temp.push(e.target.result);
                images.push(temp);
                this.setState({
                    images: images,
                });
                console.log(images[0][1]);
            }
        };
    };

    componentDidMount() {
        console.log(this.state.homeworkId)
        this.getTeacherHomeworkOne(this.state.homeworkId);
    }

    render(){
        const { editorState,contentState } = this.state;
        const props = {
            name: 'file',
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
                    <Row>
                        <Col span={20}>{this.state.content}</Col>
                        <Col span={4}>{this.state.overDdl===true?"已截止 |":"未截止 |"}{this.state.isCommit===true?" 已提交":" 未提交"}</Col>
                    </Row>
                    <Row>
                        <Text type={"secondary"}>{"截止日期："+this.state.endTime}</Text>

                    </Row>
            </div>
        )
    }
}

export default commitPage