import React from 'react';
import { Statistic, Row, Col } from "antd";

const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

function onFinish() {
    console.log('finished!');
}

function onChange(val) {
    if (4.95 * 1000 < val && val < 5 * 1000) {
        console.log('changed!');
    }
}
const Dashboard = () => {
    return (
        <Row gutter={16}>
            <Col span={12}>
                <Countdown
                    title="Countdown"
                    value={deadline}
                    onFinish={onFinish}
                />
            </Col>
            <Col span={12}>
                <Countdown
                    title="Million Seconds"
                    value={new Date().getDate()}
                    format="HH:mm:ss:SSS"
                />
            </Col>
            <Col span={24} style={{ marginTop: 32 }}>
                <Countdown
                    title="Day Level"
                    value={deadline}
                    format="D H m s"
                />
            </Col>
            <Col span={12}>
                <Countdown
                    title="Countdown"
                    value={Date.now() + 10 * 1000}
                    onChange={onChange}
                />
            </Col>
        </Row>
    );
};
export default Dashboard;
