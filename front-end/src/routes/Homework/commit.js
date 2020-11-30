import React from 'react'
import {
    Card,
    Col,
    Row,
    Button,
    Tooltip,
    notification,
    Select,
    message,
    Typography,
    List,
    Divider,
    Icon,
    Avatar,
    Collapse, Checkbox, Input
} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";
import CommitPage from "./commitPage"
import RichText from "./RichText"
import * as XLSX from "xlsx";
import {fileToObject} from "antd/es/upload/utils";
import axios from "axios";
import Upload from "./upload"
import CanvasDraw from "react-canvas-draw";
import Loading2 from "../../components/Loading2";

const {Text, Link} = Typography;

class HomeworkCommit extends React.Component {

    state = {
        syllabus: {
            chapterNum: 1,
            chapter1: {
                title: "题目",
                type: '选择题',
                text: '请输入题干，若是填空题请显式标记出要填的空来，并和填空题的答案一一对应',
                content: []
            }
        },
        homeworkId: "",
        content: "",
        comment: "",
        handinTime: "",
        file: [],
        homework: [],
        path: [],
        endTime: "",
        penLazy: 5,
        penSize: 5,
        saveableCanvas: "",
        teacherHomework: {},
        loading: true,
        edit: false,
        src: "",
        width: 900,
        height: 1000,
        objJson:[],
    };

    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        console.log(file);
    }

    getChildrenMsg = (result, homework, teacherHomework) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        this.setState({
            homework: homework,
            content: homework.content,
            teacherHomework: teacherHomework,
        });
        console.log(homework, teacherHomework,);
        let objJson = [];
        for (let i =0;i<teacherHomework.syllabus.chapterNum;++i){
            objJson.push([]);
        }
        this.setState({
            objJson:objJson
        })
        if (homework.title !== null && homework.title !== undefined && teacherHomework.title !== undefined) {
            this.setState({
                loading: false
            })
        }

        // this.downloadDoc(homework.file,"test.jpeg");
        let sid = localStorage.getItem("username")
        this.getStudentHomeworkOne(sid, this.props.match.params[0].substr(1));
        if (homework.correct !== "" && homework.correct !== undefined && homework.correct !== null) {
            console.log(12345);
            this.saveableCanvas.loadSaveData(homework.correct)

        }

    };
    downloadDoc = function (content) {
        let i = 0;
        for (let file of content) {
            var eleLink = document.createElement('a');
            eleLink.download = "picture" + i;
            i = i + 1;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([file]);
            eleLink.href = URL.createObjectURL(blob);
            // 自动触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        }

    };
    getUploadMsg = (result, fileList) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        this.setState({
            file: fileList,
        });
        console.log(this.state.file);
        let homework = this.state.homework;
        this.setState({
            path: []
        });
        for (let i = 0; i < fileList.length; i++) {
            this.state.path.push(fileList[i].response)
        }
        homework.upload = this.state.path.join(',');
        this.setState({
            homework: homework
        });
        console.log(homework)
        let sid = localStorage.getItem("username")
        this.getStudentHomeworkOne(sid, this.props.match.params[0].substr(1));
    };

    getEditorMsg = (result, editorContent) => {
        // console.log(result, msg)
        // 很奇怪这里的result就是子组件那bind的第一个参数this，msg是第二个参数
        let homework = this.state.homework;
        homework.content = editorContent;
        this.setState({
            homework: homework
        });
        console.log(this.state.homework)
    };

    getStudentHomeworkOne = async (sid, hid) => {
        let config = {
            method: 'get',
            url: 'http://106.13.209.140:8383/getStudentHomeworkOne?studentId=' + sid + "&homeworkId=" + hid,
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
        console.log(hw.comment);
        if (hw.file === null || hw.file === undefined) {
            this.setState({
                src: ""
            });
            return;
        }
        let file = hw.file[0];
        let src = "data:image/png;base64," + file;
        this.setState({
            src: src
        });
        var nImg = new Image();
        nImg.src = src;
        let w = nImg.width;
        let h = nImg.height;
        if (w === 0 || h === 0) {
            return;
        }
        console.log(w + "  " + h, src);
        this.setState({
            height: h * 900 / w
        })
    };

    postObject = async () => {
        if (this.state.homework.handinTime === null) {
            console.log("handin")
            let config0 = {
                method: 'post',
                url: 'http://106.13.209.140:8383/UpdateHandinAlready?homeworkId=' + this.state.homework.homeworkId,
                headers: {
                    withCredentials: true,
                }
            };
            const user0 = await axios(config0)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

            let homework = this.state.homework;
            homework.handinTime = new Date();
            this.setState({
                homework: homework,
            });
        }

        let homework = this.state.homework;
        homework.handinTime = new Date();
        this.setState({
            homework: homework,
            content: homework.content,
        });

        console.log(this.state.homework);
        let obj = this.state.homework;
        let str = "";
        if(this.state.teacherHomework.type==="客观题"){
            for(let q =0 ;q<this.state.objJson.length;++q){
                str+=" 第"+(q+1)+"题：";
                for(let t of this.state.objJson[q]){
                    str+=(" "+t);
                }
            }
            obj.ocontent ={array:this.state.objJson} ;
            obj.content = str;
        }
        console.log(obj);
        let config1 = {
            method: 'post',
            data: obj,
            url: 'http://106.13.209.140:8383/editStudentHomework',
            //url: 'http://localhost:8080/editStudentHomework',
            headers: {
                withCredentials: true,
            }
        };

        const user = await axios(config1)
            .then(function (response) {
                console.log(response.data);
                return response.data;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    changeData = (e) => {//input输入什么，就监听这个方法，然后再修改state，然后返回到视图
        this.setState({
            file: [e.target.value]
        })
    };

    componentWillMount() {
        this.setState({
            homeworkId: this.props.match.params[0].substr(1)
        });
        let sid = localStorage.getItem("username")
        this.getStudentHomeworkOne(sid, this.props.match.params[0].substr(1));
    }

    componentDidMount() {

    }
    renderObjAns = () =>{
        return(<div></div>)
    };
    renderObj = (syllabus) => {
        if (syllabus === undefined || syllabus === null) {
            return;
        }
        let chapterList = [];
        let i = 1;
        while (1) {
            let str = 'syllabus.chapter' + i;
            let contents = eval(str);
            if (contents === undefined || contents === null) break;
            chapterList.push(contents);
            ++i;
        }
        return (
            <Collapse>{chapterList.map((value, index) => {
                return (<Collapse.Panel header={value.type + (index + 1)} key={index}>
                    <p style={{marginBottom: '15px'}}>{value.text}</p>

                    <List
                        bordered
                        dataSource={value.content}
                        renderItem={(item,idx) => (
                            <List.Item actions={value.type === '选择题' ? [<Checkbox id={item} onChange={(e)=>{this.handleValue(e,index,item)}}/>] : []}>
                                {value.type === '选择题' ? item : <Input onChange={(e)=>{this.handleField(index,e,idx)}}/>}
                            </List.Item>
                        )}
                    /></Collapse.Panel>)
            })}</Collapse>);
        //TODO
        // return syllabus;
    };
    handleField=(index,e,sidx)=>{
        console.log(index,e.target.value,sidx);
        let objJson = this.state.objJson;
        objJson[index][sidx] = e.target.value;
        this.setState({
            objJson:objJson
        });
        console.log(objJson);

    };
    handleValue=(e,index,item)=>{
        console.log(e.target.checked,index,item);
        let objJson = this.state.objJson;
        if(e.target.checked===false){
            let ind=0;
            for(let i of objJson[index]){
                ind++;
                if(i===item){
                    break;
                }
            }
            console.log(ind);
            objJson[index] = objJson[index].slice(0,ind-1).concat(objJson[index].slice(ind));
        }else{
            objJson[index].push(item);
        }
        this.setState({
            objJson:objJson,
        });
        console.log(objJson);
    };
    render() {
        let defaultProps = {
            lazyRadius: this.state.penLazy,
            onChange: null,
            loadTimeOffset: 5,
            brushRadius: this.state.penSize,
            brushColor: "red",
            catenaryColor: "#0a0302",
            gridColor: "rgba(150,150,150,0.17)",
            hideGrid: false,
            canvasWidth: this.state.width,
            canvasHeight: this.state.height,
            disabled: false,
            imgSrc: this.state.src,
            saveData: null,
            immediateLoading: false,
            hideInterface: false
        };
        const {editorState, contentState} = this.state;
        return (
            <div>
                {this.state.loading ? <div>
                    <h3 style={styles.loadingTitle} className='animated bounceInLeft'>载入中...</h3>
                    <Loading2/>

                </div> : null}
                <CustomBreadcrumb arr={['作业', '提交']}/>
                <Card bordered={false} className='card-item' title={this.state.homework.title} style={{minHeight: 200}}>
                    <CommitPage homeworkId={this.state.homeworkId} parent={this}/>
                    <Card title="作业内容">

                        <p>{this.state.teacherHomework.type === "主观题" ? <iframe style={{width: '100%'}} title={"s"}
                                                                                src={'data:text/html;charset=UTF-8,' + this.state.teacherHomework.content}/> : this.renderObj(this.state.teacherHomework.syllabus)}</p>
                    </Card>
                    {new Date(Date.parse(this.state.homework.endTime)) > new Date() ? <div><br/><Card title={"作答区域"}>
                        <p>{this.state.homework.handinTime === null ? <p style={{color: 'red'}}>未提交!</p> :
                            <iframe style={{width: '100%'}} title={"s"}
                                    src={'data:text/html;charset=UTF-8,' + this.state.content}/>}</p>
                        {!this.state.homework.handinTime === null ?
                            <Button style={{marginBottom: '10px'}} onClick={() => {
                                this.setState({edit: true})
                            }}>修改</Button> : null}
                        <br/>
                        {this.state.edit === true || this.state.homework.handinTime === null ?
                            this.state.teacherHomework.type==="主观题"?<RichText parent={this}/>:this.renderObjAns() : null}
                        {this.state.teacherHomework.type==="主观题"&&(this.state.edit === true || this.state.homework.handinTime === null )? <Upload
                                parent={this}><Button>{this.state.homework.handinTime === null ? null : '重新'}上传作业图片</Button></Upload>
                            : null}
                        <br/>
                        {this.state.homework.file !== null ? <Button onClick={() => {
                            this.downloadDoc(this.state.homework.file)
                        }}>下载已上传的图片附件</Button> : null}
                        <br/>
                    </Card><br/></div> : <div><br/></div>}
                    <Card title="批改内容">
                        {this.state.homework.score === null ?
                            <div><p style={{color: 'red'}}>未批改!</p>{this.state.homework.file === null ?
                                <p style={{color: 'red'}}>未提交图片附件！</p> : <div><img
                                    src={this.state.src}/></div>}</div> : this.state.homework.file === null ?
                                <p style={{color: 'red'}}>未提交图片附件！</p> : <div><CanvasDraw
                                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)} {...defaultProps}/></div>}

                    </Card><br/>
                    <Card title="作业评论">
                        <p>{this.state.homework.comment === null ? '暂无评论' : this.state.homework.comment}</p>
                    </Card><br/>

                    <Button type="primary"
                            onClick={() => this.postObject()}>{this.state.homework.handinTime !== null ? "重新提交" : "提交"}</Button>&emsp;
                </Card>
            </div>
        )
    }
}

const styles = {
    loadingTitle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -45,
        marginTop: -18,
        color: '#000',
        fontWeight: 500,
        fontSize: 24
    },
};
export default HomeworkCommit
