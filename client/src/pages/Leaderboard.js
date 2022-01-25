import React from "react";
import { Table, Tag, Space } from "antd";
import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from 'uuid';

import { GET_SCORES } from "../utils/queries";

const Leaderboard = () => {
    // ! For testing, remove for deployment
    let { data } = useQuery(GET_SCORES);
    let dataSource = [];

    if (data) {
        let needSort = [...data.scores];
        dataSource = needSort.sort((a, b) => (a.points < b.points ? 1 : -1));
        console.log(dataSource);
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
            title: "Username",
            dataIndex: "username",
            key: "username",
            align: "center",
            // ellipsis: true,
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",

            render: (tags) => (
                <>
                    {tags.map((tag) => {
                        let color = "blue";
                        if (tag === "5") {
                            color = "green";
                        } else if (tag === "10") {
                            color = "gold";
                        } else if (tag === "15") {
                            color = "volcano";
                        } else if (tag === "20") {
                            color = "red";
                        } else {
                            color = "blue";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: "Date",
            dataIndex: "date_created",
            key: "date",
            align: "right",
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
    return (
        <div>
            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default Leaderboard;
