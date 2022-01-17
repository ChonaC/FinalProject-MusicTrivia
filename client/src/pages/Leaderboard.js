import React from "react";
import { Table, Tag, Space } from "antd";

const Leaderboard = () => {
    const columns = [
        // todo: add rank
        {
            title: "Rank",
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
            <Table columns={columns} />
        </div>
    );
};

export default Leaderboard;
