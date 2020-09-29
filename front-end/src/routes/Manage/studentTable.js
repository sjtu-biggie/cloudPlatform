/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { Button, Input, Table } from 'antd';
import styles from './index.css';

let index = 0;
const getMockData = () => {
    const result = {
        id: index,
        name: 'name' + index,
        no: 'no.' + index,
        cls: 'class' + index,
        score: (Math.random() * 100).toFixed(2),
        point: (Math.random() * 10).toFixed(1),
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
    { title: '姓名', dataIndex: 'name' },
    { title: '学号', dataIndex: 'no' },
    { title: '班级', dataIndex: 'cls' },
    { title: '成绩', dataIndex: 'score' },
    { title: '绩点', dataIndex: 'point' }];
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

const EditText = ({ children, onChange }) => {
    const [edit, setEdit] = useState(false);
    const [editValue, setEditValue] = useState(children);
    return edit ? <Input autoFocus style={{ width: 100 }}
                         value={editValue}
                         onChange={event => setEditValue(event.target.value)}
                         onBlur={() => {
                             setEdit(false);
                             onChange(editValue);
                         }}/> :
        <div style={{ width: 100 }} onDoubleClick={() => setEdit(true)}>{children || <span>&nbsp;</span>}</div>;
};


export default function() {
    const [search, setSearch] = useState();
    const [search2, setSearch2] = useState();
    const [orData, setOrData] = useState(data1);
    const [orData2, setOrData2] = useState(data2);
    const [renderData, setRenderData] = useState(data1);
    const [renderData2, setRenderData2] = useState(data2);
    const [modifyIds, setModifyIds] = useState([]);

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

    const handleSearch2 = () => {
        const filterData = orData2.filter(row => {
            if (!search2) return true;
            const keys = columns.map(item => item.dataIndex);
            for (let i = 0; i < keys.length; i++) {
                if (String(row[keys[i]] || '').toLowerCase().includes(search2.toLowerCase())) return true;
            }
            return false;
        });
        setRenderData2(filterData);
    };

    useEffect(() => {
        handleSearch2();
    }, [orData2]);

    return (
        <div className={styles.normal}>
            <div className={styles.control}>
                <Input style={{ width: 200, marginRight: 16 }}
                       value={search}
                       allowClear
                       onChange={event => setSearch(event.target.value)}/>
                <Button onClick={handleSearch}>搜索</Button>
                <div style={{ flex: 1 }}/>
                <Button type={'primary'} onClick={() => {
                    setOrData([getMockData(), ...orData]);
                }}>添加</Button>
            </div>
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
                        <Button onClick={() => {
                            setOrData(orData.filter(item => item.id !== record.id));
                            setOrData2([record, ...orData2]);
                        }}>删除</Button>),
                }]}
                dataSource={renderData}/>


            <div className={styles.control}>
                <Button
                    type={'primary'}
                    onClick={() => {
                        const selectData = orData2.filter(item => modifyIds.includes(item.id));
                        const notSelectData = orData2.filter(item => !modifyIds.includes(item.id));
                        setOrData2(notSelectData);
                        setOrData([...selectData, ...orData]);
                    }}
                >添加到上表</Button>
                <Input style={{ width: 200, marginLeft: 16, marginRight: 16 }}
                       value={search2}
                       allowClear
                       onChange={event => setSearch2(event.target.value)}/>
                <Button onClick={handleSearch2}>搜索</Button>
            </div>
            <Table
                rowKey={'id'}
                columns={columns}
                dataSource={renderData2}
                rowSelection={{
                    type: 'checkbox',
                    selectedRowKeys: modifyIds,
                    onChange: ids => setModifyIds(ids),
                }}/>
        </div>
    );
}
