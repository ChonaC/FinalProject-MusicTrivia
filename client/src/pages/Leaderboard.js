import React from "react";
import { Table, Tag, Space } from "antd";

const Leaderboard = () => {
    // ! For testing, remove for deployment
    const dataSource = [];

    for (let i = 0; i < 25; i++) {
        dataSource.push({
            key: i,
            username: "ByteSizeError",
            score: Math.floor(Math.random() * 101),
            date: "1/1/2022",
        });
    }
    // ! for testing

    const columns = [
        {
            title: "Rank",
            // * To get the index of the sorted array for the rank
            render: (item) => <>{dataSource.indexOf(item) + 1}</>,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
        },
        {
            title: "Score",
            dataIndex: "score",
            key: "score",
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
        },
    ];

    return (
        <div>
            <Table
                dataSource={dataSource.sort((a, b) =>
                    a.score < b.score ? 1 : -1
                )}
                columns={columns}
            />
        </div>
    );
};

export default Leaderboard;
