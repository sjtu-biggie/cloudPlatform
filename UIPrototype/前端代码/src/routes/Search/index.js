import React from 'react'
import {Card, Col, Row, Button, Tooltip, notification, Select, Typography,List,Divider, Icon, Upload, Avatar} from 'antd'
import CustomBreadcrumb from '../../components/CustomBreadcrumb/index'
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import TypingCard from '../../components/TypingCard'
import {Editor} from "react-draft-wysiwyg";
import React, {
    Component,
    PropTypes
} from 'react';
import ReactDOM from 'react-dom';
import {SimpleRow, SelectGroup} from '../components/EditableRow'

var listStyle={
    paddingLeft:8,
    position:"absolute",
    minHeight:50,
    width:250,
    left:34,
    top:25,
    borderWidth:1,
    borderColor:"#ddd",
    borderStyle:"solid",
    listStyle:"none"
}

const { Text, Link } = Typography;
class search extends React.Component{

    constructor(props){
        super(props);
        this.state={
            data:null,
            searchInfo:""
        }
        this.index=0;
    }

    searchKeyword(e){
        this.index=0;
        let name = e.target.value;
        if(name == ""){
            this.setState({
                searchInfo : ""
            });
            return;
        }
        $.ajax({
            url:"/selectInfo",
            type:"post",
            data: JSON.stringify({Information:this.refs.information.value}),
            dataType: 'json',
            contentType : 'application/json',
            success:function(data){
                if(data){
                    this.setState({
                        searchInfo : data.data
                    });
                }else{
                    searchInfo:""
                }
            }.bind(this),
            error:function(){
                alert("请求失败");
            }
        });
    }

    genRows(data){
        if(data == "")
            return "";
        var that = this;
        var i=0,j=0;
        var rows = data.map(function(row){
            i++;
            return <li key={i}  onClick={that.liClickSelected.bind(that)}>{row}</li>
        })
        return (
            <ul className="selected" style={listStyle}>
                {rows}
            </ul>
        );
    }

    liClickSelected(e){
        //console.log(e.target.innerText);
        this.refs.information.value=e.target.innerText;
        this.setState({
            searchInfo:""
        });
    }

    handleKeyPress(e){
        var code = e.keyCode;
        var lis=$(".selected>li");
        lis.removeClass("active");
        var firstLi=$(".selected>li:first-child");
        //console.log(firstLi);
        var lastLi=$(".selected>li:last-child");
        //firstLi.attr("class","selected");
        //下
        if (code == 40) {
            if(this.index==($(".selected>li").length)){
                return;
            }
            $(lis[this.index]).addClass("active");
            this.index++;
            console.log(this.index);
        }

        //上
        if (code == 38) {
            if(this.index==0){
                return;
            }
            this.index--;
            $(lis[this.index-1]).addClass("active");
            console.log(this.index);
        }

        if (code == 13) {
            this.refs.information.value=$(".selected>li")[this.index-1].innerText;
            //console.log($($(".selected>li")[this.index]));
            this.setState({
                searchInfo:""
            });
            this.index=0;
        }
    }


    render(){
        var rows = this.genRows(this.state.searchInfo);
        return(
            <div style={{marginLeft:50,position:"relative"}}>
                <label>搜索:</label>
                <input style={{width:250,paddingLeft:8}}  type="text" name="search" ref="information" placeholder="--请输入检索关键字--" onKeyDown={this.handleKeyPress.bind(this)}  onChange={this.searchKeyword.bind(this)}/>
                {rows}
            </div>
        );
    }
}

ReactDOM.render(
    <SelectInfo  />,
    document.getElementById("selectInfo")
)



export default search