/* eslint-disable */
import React, {useState, useEffect, useRef, useContext} from 'react';
import {Button, Card, Input, Table,Row} from 'antd';
import styles from './index.css';

let index = 0;
const getMockData = () => {
    const result = {
        id: index,
        name: 'name' + index,
        no: 'no.' + index,
        cls: 'class' + index,
        score: (Math.random() * 100).toFixed(2),
        // point: (Math.random() * 10).toFixed(1),
    };
    index += 1;
    return result;
};
const getMockDatas = (num) => {
    const data = [];
    for (let i = 0; i < num; i++) {
        data.push(getMockData());
    }
    return data;
};
const data1 = getMockDatas(10);
const data2 = getMockDatas(100);

const columns = [
    {title: '姓名', dataIndex: 'name'},
    {title: '学号', dataIndex: 'no'},
    {title: '班级', dataIndex: 'cls'},
    {title: '是否提交', dataIndex: 'commit'},
    {title: '提交时间', dataIndex: 'time'},
    {title: '是否批改', dataIndex: 'correct'},
    {title: '成绩', dataIndex: 'score'}
    ];
columns.map(item => {
    item.sorter = (a, b) => {
        if (!isNaN(a[item.dataIndex]) && !isNaN(b[item.dataIndex])) {
            return a[item.dataIndex] - b[item.dataIndex];
        }
        const aa = a[item.dataIndex] || '';
        const bb = b[item.dataIndex] || '';
        return String(aa).localeCompare(String(bb));
    };
});

const EditText = ({children, onChange}) => {
    const [edit, setEdit] = useState(false);
    const [editValue, setEditValue] = useState(children);
    return edit ? <Input autoFocus style={{width: 100}}
                         value={editValue}
                         onChange={event => setEditValue(event.target.value)}
                         onBlur={() => {
                             setEdit(false);
                             onChange(editValue);
                         }}/> :
        <div style={{width: 100}} onDoubleClick={() => setEdit(true)}>{children || <span>&nbsp;</span>}</div>;
};


export default function (param) {
    const count = param.homeworkId;
    console.log(count);
    const [search, setSearch] = useState();
    const [orData, setOrData] = useState(data1);
    const [orData2, setOrData2] = useState(data2);
    const [renderData, setRenderData] = useState(data1);
    const searchInput = useRef();

    useEffect(() => {
        columns.forEach(item => {
            const {dataIndex, title} = item
            item.filterDropdown = ({setSelectedKeys, selectedKeys, confirm}) => (
                <div style={{padding: 8}}>
                    <Input
                        allowClear
                        ref={searchInput}
                        placeholder={`搜索 ${title}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{width: 188, marginBottom: 8, display: 'block'}}
                    />
                    <Button
                        type="primary"
                        onClick={confirm}
                        size="small"
                        style={{width: 90}}
                    >
                        搜索
                    </Button>
                </div>
            );
            item.onFilter = (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '';
            item.onFilterDropdownVisibleChange = visible => {
                if (visible) {
                    setTimeout(() => searchInput.current.select(), 100);
                }
            }
        })
    }, []);
    const handleSearch = () => {
        const filterData = orData.filter(row => {
            if (!search) return true;
            const keys = columns.map(item => item.dataIndex);
            for (let i = 0; i < keys.length; i++) {
                if (String(row[keys[i]] || '').toLowerCase().includes(search.toLowerCase())) return true;
            }
            return false;
        });
        setRenderData(filterData);
    };

    useEffect(() => {
        handleSearch();
    }, [orData]);
    return (
        <div className={styles.normal}>
            <Card bordered={false} style={{marginBottom: 10}}>
            <Table
                rowKey={'id'}
                columns={[...columns.map(item => ({
                    ...item,
                    render: (text, record) => <EditText onChange={value => {
                        const newData = [...orData];
                        newData.find(col => col.id === record.id)[item.dataIndex] = value;
                        setOrData(newData);
                    }}>{text}</EditText>,
                })), {
                    name: '操作',
                    key: 'del',
                    render: record => (
                        <Button type="danger" onClick={() => {
                            setOrData(orData.filter(item => item.id !== record.id));
                            setOrData2([record, ...orData2]);
                        }}>删除</Button>),
                },{
                    name: '操作',
                    key: 'cor',
                    render: record => (
                        <a href={"/home/homework/rate?homeworkId="+count}>批改</a>),
                }]}
                dataSource={renderData}/>
            </Card>
        </div>
    );
}
