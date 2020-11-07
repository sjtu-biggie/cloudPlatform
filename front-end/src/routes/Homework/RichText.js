import React from "react";
import {Button,Card,Modal} from 'antd';
import {Editor} from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftjs from 'draftjs-to-html';

export class RichText extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            editorState: '',
        };
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    imageUploadCallBack = file => new Promise(
        (resolve, reject) => {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            let img = new Image();
            // let url = ''
            reader.onload = function (e) {
                img.src = this.result
            };

            img.onload = function () {
                //console.log(img); // 获取图片
                // console.log(img.src.length)
                // 缩放图片需要的canvas（也可以在DOM中直接定义canvas标签，这样就能把压缩完的图片不转base64也能直接显示出来）
                let canvas = document.createElement('canvas');
                let context = canvas.getContext('2d');

                // 图片原始尺寸
                let originWidth = this.width;
                let originHeight = this.height;

                // 最大尺寸限制，可通过设置宽高来实现图片压缩程度
                let maxWidth = 400,
                    maxHeight = 500;
                // 目标尺寸
                let targetWidth = originWidth,
                    targetHeight = originHeight;
                // 图片尺寸超过300x300的限制
                if(originWidth > maxWidth || originHeight > maxHeight) {
                    if(originWidth / originHeight > maxWidth / maxHeight) {
                        // 更宽，按照宽度限定尺寸
                        targetWidth = maxWidth;
                        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
                    } else {
                        targetHeight = maxHeight;
                        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
                    }
                }
                // canvas对图片进行缩放
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                // 清除画布
                context.clearRect(0, 0, targetWidth, targetHeight);
                // 图片压缩
                context.drawImage(img, 0, 0, targetWidth, targetHeight);
                /*第一个参数是创建的img对象；第二三个参数是左上角坐标，后面两个是画布区域宽高*/

                //压缩后的图片转base64 url
                /*canvas.toDataURL(mimeType, qualityArgument),mimeType 默认值是'image/png';
                  * qualityArgument表示导出的图片质量，只有导出为jpeg和webp格式的时候此参数才有效，默认值是0.92*/
                let newUrl = canvas.toDataURL('image/jpeg', 0.92);//base64 格式

                resolve({
                    data: {
                        link: newUrl
                    }
                })

                //也可以把压缩后的图片转blob格式用于上传
                // canvas.toBlob((blob)=>{
                //     console.log(blob)
                //     //把blob作为参数传给后端
                // }, 'image/jpeg', 0.92)
            }
        }
    );

    render(){
        const { editorContent, editorState } = this.state;
        return (
            <div style={{marginBottom:'20px'}}>
                <Card >
                    <Editor
                        editorState={editorState}
                        toolbarClassName="home-toolbar"
                        wrapperClassName="home-wrapper"
                        editorClassName="home-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        toolbar={{ //Editor富文本组件功能控制
                            history: { inDropdown: true },
                            inline: { inDropdown: false },
                            list: { inDropdown: true },
                            textAlign: { inDropdown: true },
                            /*image: {
                                urlEnabled: false,
                                uploadEnabled: false,
                                alignmentEnabled: true,   // 是否显示排列按钮 相当于text-align
                                uploadCallback: this.imageUploadCallBack,  //图片的处理 （但是仅限于本地上传的，url方式不经过此函数）
                                previewImage: true,
                                inputAccept: 'image/!*',
                                alt: {present: false, mandatory: false}
                            }*/
                        }}
                        onContentStateChange={this.props.onEditorChange.bind(this)}//引用父组件的函数
                        placeholder="答题区域" //输入框中默认内容
                        spellCheck
                        localization={{ locale: 'zh', translations: { 'generic.add': '添加' } }}
                    />
                </Card>
            </div>
        );
    }
}

//使用组件  ==>子组件中要找到父组件onEditorChange函数，直接将这个函数写在子组件中也可以，根据个人需要自行修改
export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            editorContent: '',
        };
    }

    toParent = () => {
        // console.log(this.props.parent.getChildrenMsg.bind(this, this.state.msg))
        this.props.parent.getEditorMsg(this,draftjs(this.state.editorContent))
    }

    onEditorChange = (editorContent) => {
        console.log('父组件' + draftjs(editorContent)); //实时根据输入进行更新
        console.log(typeof(draftjs(editorContent)))
        //editorContent = '<html lang="en"><head><meta charset="UTF-8"><title></title></head><body>' + draftjs(editorContent) + '</body></html>'
        this.setState({
            editorContent,
        });
        console.log(editorContent)
        this.toParent()
    };//获取html富文本

    render() {
        let {editorContent} = this.state;
        //传递给子组件的函数
        return <RichText onEditorChange={this.onEditorChange.bind(this)} editorContent={editorContent}/>
    }
}

