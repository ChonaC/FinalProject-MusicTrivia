import React from "react";
import { Table, Tag, Space } from "antd";
import { List, Divider } from 'antd';

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

import { Typography, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Profile = () => {
    let { data } = useQuery(QUERY_USER);
    let user;
    let dataSource = [];
    let gameNum = 0
    let highscore = 0
    let pointsRight = 0
    let questionsRight = 0

    if (data) {
        user = data.user;
        let needSort = [...user.score];
        dataSource = needSort.sort((a, b) => (a.points < b.points ? 1 : -1));
        gameNum = dataSource.length
        highscore = dataSource[0].points
        dataSource.forEach(item => {
            let add = item.points
           pointsRight = (pointsRight + add)
        });

        questionsRight = (pointsRight / 100)
        console.log(gameNum);
        console.log(highscore);
        console.log(questionsRight);
        }

    const columns = [
        {
            title: "Rank",
            key: "rank",
            // width: 70,
            // * To get the index of the sorted array for the rank
            render: (item) => <>{dataSource.indexOf(item) + 1}</>,
        },
        {
            title: "Date",
            dataIndex: "date_created",
            key: "date",
            align: "center",
            // width: 93,
        },
        {
            title: "Score",
            dataIndex: "points",
            key: "score",
            align: "right",
            // width: 80,
        },
    ];
    const listdata = [
        'Games Played: ' + gameNum,
        'High Score: ' + highscore,
        'Correct Answers: ' + questionsRight,
    ];

    return (
        <div
            className="page"
            style={{
                textAlign: "center",
            }}
        >
            <Avatar size={200} icon={<AntDesignOutlined />} />
            <Title level={2}>{user.username}</Title>
            <List
                  bordered
                  dataSource={listdata}
                  renderItem={item => (
                    <List.Item>
                      <Typography.Text></Typography.Text> {item}
                    </List.Item>
                  )}             
            />
            <Table dataSource={dataSource} columns={columns} />
       
     
        </div>
    );
};

export default Profile;