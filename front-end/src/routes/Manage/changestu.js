import React from "react";
import { Transfer, Button } from 'antd';
// import CourseSetDemo from "./courseset";

class ChangeStuDemo extends React.Component {
    state = {
        mockData: [],
        targetKeys: [],
    };

    componentDidMount() {
        this.getMock();
    }

    getMock = () => {
        const targetKeys = [];
        const mockData = [];
        for (let i = 0; i < 20; i++) {
            const data = {
                key: i.toString(),
                name: `学号${i + 1}`,
                sid: `518030910${i + 1}`,
                chosen: Math.random() * 2 > 1,
            };
            if (data.chosen) {
                targetKeys.push(data.key);
            }
            mockData.push(data);
        }
        this.setState({ mockData, targetKeys });
    };

    handleChange = targetKeys => {
        this.setState({ targetKeys });
    };

    renderFooter = () => (
        <Button size="small" style={{ float: 'right', margin: 5 }} onClick={this.getMock}>
            reload
        </Button>
    );

    render() {
        return (
            <Transfer
                dataSource={this.state.mockData}
                showSearch
                listStyle={{
                    width: 250,
                    height: 300,
                }}
                operations={['添加到上课', '从上课移除']}
                targetKeys={this.state.targetKeys}
                onChange={this.handleChange}
                render={item => `${item.name}-${item.sid}`}
                footer={this.renderFooter}
            />
        );
    }
}
export default ChangeStuDemo