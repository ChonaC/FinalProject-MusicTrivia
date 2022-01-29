import React, { useState } from "react";
import { Table, Tag, Space, Button, List, Input, Statistic } from "antd";
import Highlighter from "react-highlight-words";
import {
    SearchOutlined,
    CustomerServiceOutlined,
    CheckCircleOutlined,
    TrophyOutlined,
} from "@ant-design/icons";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";

import { Typography, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";

const { Title } = Typography;

const Profile = () => {
    let { data } = useQuery(QUERY_USER);
    let user;
    let dataSource = [];
    let gameNum = 0;
    let highscore = 0;
    let pointsRight = 0;
    let questionsRight = 0;
    let username = "";

    if (data) {
        user = data.user;
        username = user.username;
        let needSort = [...user.score];
        dataSource = needSort.sort((a, b) => (a.points < b.points ? 1 : -1));
        gameNum = dataSource.length;
        highscore = dataSource[0].points;
        dataSource.forEach((item) => {
            let add = item.points;
            pointsRight = pointsRight + add;
        });

        questionsRight = pointsRight / 100;
        console.log(gameNum);
        console.log(highscore);
        console.log(questionsRight);
        console.log(dataSource);
    }

    const [searchText, setSearchText] = useState("");
    const [searchedColumn, setSearchedColumn] = useState("");

    let searchInput = "";

    const getColumnSearchProps = (dataIndex, search) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${search}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{ marginBottom: 8, display: "block" }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });

                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{ color: filtered ? "#1890ff" : undefined }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                ? record[dataIndex]
                      .toString()
                      .toLowerCase()
                      .includes(value.toLowerCase())
                : "",
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ""}
                />
            ) : (
                text
            ),
    });

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText("");
    };

    const columns = [
        {
            title: "Rank",
            key: "rank",
            fixed: "left",
            align: "center",
            width: "8%",
            // * To get the index of the sorted array for the rank
            render: (item) => <>{dataSource.indexOf(item) + 1}</>,
            sorter: (a, b) => dataSource.indexOf(a) - dataSource.indexOf(b),
            sortDirection: ["descend", "ascend"],
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
            width: "25%",
            ...getColumnSearchProps("tags", "Artist"),

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
            width: "30%",
            sorter: (a, b) => a.date_created < b.date_created,
            sortDirection: ["descend", "ascend"],
            ...getColumnSearchProps("date_created", "Date"),
        },
        {
            title: "Score",
            dataIndex: "points",
            key: "score",
            align: "right",
            width: "10%",
            sorter: (a, b) => a.points - b.points,
            sortDirection: ["descend", "ascend"],
        },
    ];

    // const listdata = [
    //     "Games Played: " + gameNum,
    //     "High Score: " + highscore,
    //     "Correct Answers: " + questionsRight,
    // ];

    return (
        <div
            className="page"
            style={{
                textAlign: "center",
            }}
        >
            <Avatar size={200} icon={<AntDesignOutlined />} />
            <Title level={2}>{username}</Title>
            <Space size={"large"} style={{ marginBottom: "20px" }}>
                <Statistic
                    title="Games Played"
                    value={gameNum}
                    prefix={<CustomerServiceOutlined />}
                />
                <Statistic
                    title="High Score"
                    value={highscore}
                    prefix={<TrophyOutlined />}
                />
                <Statistic
                    title="Correct Answers"
                    value={questionsRight}
                    prefix={<CheckCircleOutlined />}
                />
            </Space>
            {/* <List
                bordered
                dataSource={listdata}
                renderItem={(item) => (
                    <List.Item>
                        <Typography.Text></Typography.Text> {item}
                    </List.Item>
                )}
            /> */}
            <Table
                dataSource={dataSource}
                columns={columns}
                scroll={{ x: 850, y: 800 }}
            />
        </div>
    );
};

export default Profile;
