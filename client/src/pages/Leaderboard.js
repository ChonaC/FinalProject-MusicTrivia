import React from "react";
import { Table, Tag, Space } from "antd";

const Leaderboard = () => {
    // ! For testing, remove for deployment
    const dataSource = [];
    const randomDate = (start, end) => {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    };

    for (let i = 0; i < 250; i++) {
        let date = randomDate(new Date(2020, 0, 1), new Date());
        dataSource.push({
            key: i,
            username: "ByteSizeErrorLong",
            score: Math.floor(Math.random() * 101),
            date:
                (date.getMonth() > 8
                    ? date.getMonth() + 1
                    : "0" + (date.getMonth() + 1)) +
                "/" +
                (date.getDate() > 9 ? date.getDate() : "0" + date.getDate()) +
                "/" +
                date.getFullYear(),
        });
    }
    // ! for testing
    console.log(dataSource);

    const columns = [
        {
            title: "Rank",
            key: "rank",
            // width: 70,
            // * To get the index of the sorted array for the rank
            render: (item) => <>{dataSource.indexOf(item) + 1}</>,
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            align: "center",
            // ellipsis: true,
        },

        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            align: "right",
            // width: 93,
        },
        {
            title: "Score",
            dataIndex: "score",
            key: "score",
            align: "right",
            // width: 80,
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
