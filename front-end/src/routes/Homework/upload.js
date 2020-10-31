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
            fileList: [{
                uid: -1,
                name: 'xxx.png',
                status: 'done',
                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }],
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
                if (info.file.status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} 文件上传成功`);
                    that.setState({
                        fileList:[...info.fileList]
                    });
                    that.toParent()
                    console.log(that.state.fileList)

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
                <Upload {...props}>
                    <Button><Icon type="upload"/>Upload</Button>
                </Upload>
            </div>
        )
    }
}


export default UploadDemo