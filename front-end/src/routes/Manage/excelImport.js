import React from "react";
import * as XLSX from 'xlsx';
import antd, {Button, message, Table} from 'antd';
const Dragger = antd.upload.Dragger;

class excelImport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],//表格内容
            tableHeader: [],//表格头部
            data:{
            }//excel数据
        };
    }

    uploadFilesChange(file) {
        // 通过FileReader对象读取文件
        const fileReader = new FileReader();
        fileReader.onload = event => {
            try {
                const { result } = event.target;
                // 以二进制流方式读取得到整份excel表格对象
                const workbook = XLSX.read(result, { type: 'binary' });
                // 存储获取到的数据
                let data = {
                };
                // 遍历每张工作表进行读取（这里默认只读取第一张表）
                for (const sheet in workbook.Sheets) {
                    let tempData = [];
                    // esline-disable-next-line
                    if (workbook.Sheets.hasOwnProperty(sheet)) {
                        // 利用 sheet_to_json 方法将 excel 转成 json 数据
                        data[sheet] = tempData.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                        console.log(data[sheet]);
                    }
                }
                //上传成功啦,data为上传后的数据
                this.setState({

                    data:data.Sheet1[0]
                });
                // 最终获取到并且格式化后的 json 数据
                message.success('上传成功！')
            } catch (e) {
                // 这里可以抛出文件类型错误不正确的相关提示
                message.error('文件类型不正确！');
            }
            console.log(this.state.data);
            let columns = [];
            let dataSource = [];
            let keys = Object.keys(this.state.data);
            columns = keys.map((item,index)=>{
                return {
                    title:item,
                    dataIndex:item,
                    key:item
                }
            });
            columns.push( {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <span>
                  <a style={{ marginRight: 16 }}>Invite {record.name}</a>
                  <a>Delete</a>
                </span>
                ),
            },)
            dataSource = this.state.data.map((item,index)=>{
                return {
                    key:index.toString(),
                    "用户名":item["username"],
                    "学号":item["sid"],
                    "电话":item["telephone"],
                    "昵称":item["nickname"],
                    "用户类型":item["type"],
                    "年级":item["theGrade"],
                    "班级":item["theClass"],
                    "邮箱":item["email"]
                }

            })
            this.setState({
                    tableHeader: columns,
                    tableData: dataSource,
                }
            )
            console.log(this.state.tableData)
        };
        // 以二进制方式打开文件
        fileReader.readAsBinaryString(file.file);
    }

    render() {
        return (
            <div>
                <Dragger name="file"
                         beforeUpload={function () {
                             return false;
                         }}
                         onChange={this.uploadFilesChange.bind(this)}
                         showUploadList={false}>
                    <p className="ant-upload-text">
                        <span>点击上传文件</span>
                        或者拖拽上传
                    </p>
                </Dragger>
                <Table columns={this.state.tableHeader} dataSource={this.state.tableData}/>
            </div>
        );
    }
}

export default excelImport