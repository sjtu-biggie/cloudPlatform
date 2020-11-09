import React from 'react'
import {Icon, Upload, message, Button} from 'antd'
import axios from "axios";

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}




class UploadDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            uid:"",
            previewVisible: false,
            previewImage: '',
            fileList: [],
            imgList:[]
        }
    }


    componentWillMount() {
        let uid=localStorage.getItem("username")
        console.log(uid)
        this.setState({
            uid:uid,
        })
    }

    toParent = () => {
        // console.log(this.props.parent.getChildrenMsg.bind(this, this.state.msg))
        this.props.parent.getUploadMsg(this, this.state.fileList)
    }

    beforeUpload(file, fileList) {
        const isJPG = file.type === 'image/jpeg'
        if (!isJPG) {
            message.error('只能上传JPG格式的图片');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('图片大小不超过 5MB!');
        }
        return isJPG && isLt5M;
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }))
        } else if (info.file.status === 'error') {
            // console.log(info.file)
            message.error(`${info.file.name} 文件上传失败（${info.file.error.message}）`);
            this.setState({
                loading: false
            })
        }
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    onRemove=(file)=>{
        console.log(file)
    }

    render() {
        let that = this;
        const props = {
            name: 'file',
            action: 'http://106.13.209.140:8383/upload?userId='+this.state.uid,
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                console.log(info)
                if (info.file.status === 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 文件上传成功`);

                    that.setState({
                        fileList:[...info.fileList]
                    });
                    console.log(that.state.fileList)
                    that.toParent()
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} 文件上传失败`);
                }
            },
            defaultFileList: [],
        }
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div>
                <Upload {...props}   onRemove={this.onRemove} >
                    <Button><Icon type="upload"/>Upload</Button>
                </Upload>
            </div>
        )
    }
}


export default UploadDemo

/*
import React from 'react';
import {
    Upload, Button, Icon, message,
} from 'antd';
import 'antd/dist/antd.css';
import reqwest from 'reqwest';  //这块要安装一下reqwest   npm install reqwest

class UploadDemo extends React.Component {
    state = {
        fileList: [],
        uploading: false,
        uid:""
    }

    componentWillMount() {
        let uid=localStorage.getItem("username")
        console.log(uid)
        this.setState({
            uid:uid,
        })
    }

    handleUpload = () => {
        const { fileList } = this.state;
        const formData = new FormData();
        formData.append('file1', fileList[0]);   //注意第一个参数是传给后台的参数名字，我的项目中叫file1
        formData.append('file2', fileList[1]);   //注意第一个参数是传给后台的参数名字，我的项目中叫file2
        console.log(fileList)

        this.setState({
            uploading: true,
        });

        // You can use any AJAX library you like
        reqwest({
            url: 'http://106.13.209.140:8383/upload?userId='+this.state.uid,   //这块是你项目的接口
            method: 'post',
            processData: false,
            data: formData,
            success: () => {
                this.setState({
                    fileList,
                    uploading: false,
                });
                message.success('upload successfully.');
            },
            error: () => {
                this.setState({
                    uploading: false,
                });
                message.error('upload failed.');
            },
        });
    }

    render() {
        const { uploading, fileList } = this.state;
        const props = {
            onRemove: (file) => {
                this.setState((state) => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                    };
                });
            },
            beforeUpload: (file) => {
                this.setState(state => ({
                    fileList: [...state.fileList, file],
                }));
                return false;
            },
            fileList,
        };

        return (
            <div>
                <Upload {...props}>
                    <Button>
                        <Icon type="upload" /> Select File
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={this.handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload' }
                </Button>
            </div>
        );
    }
}
export default UploadDemo;*/