import React from "react";
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
    console.log(img);
}

function beforeUpload(file) {
    console.log(file);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}



class PersonalAvatar extends React.Component {
    state = {
        loading: false,
        visible:false
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    showModal = () => {
        this.setState({
            visible:true
        })
    };

    handOk=()=>{
        console.log("确定上传");
        console.log(this.state.imageUrl);
        this.setState({
            visible:false,
            imageUrl:null
        })
    };

    handleCancel = () => {
        console.log("取消上传")
        this.setState({
            visible:false,
            imageUrl:null
        })
    };


    render() {
        const { loading, imageUrl,visible } = this.state;
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <div>
                <a onClick={this.showModal}>
                    修改头像
                </a>
                <Modal
                    title="上传头像"
                    visible={visible}
                    onOk={this.handOk}
                    onCancel={this.handleCancel}
                >
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Modal>

            </div>
        );
    }
}

export default PersonalAvatar




