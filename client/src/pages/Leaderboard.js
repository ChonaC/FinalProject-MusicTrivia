import React, { useState } from "react";
import { Table, Tag, Space, Input, Button } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import { useQuery } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";

import { GET_SCORES } from "../utils/queries";

const Leaderboard = () => {
    let { data } = useQuery(GET_SCORES);
    let dataSource = [];

    if (data) {
        let needSort = [...data.scores];
        dataSource = needSort.sort((a, b) => (a.points < b.points ? 1 : -1));
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
            // width: 70,
            // * To get the index of the sorted array for the rank
            render: (item) => <>{dataSource.indexOf(item) + 1}</>,
            sorter: (a, b) => dataSource.indexOf(a) - dataSource.indexOf(b),
            sortDirection: ["descend", "ascend"],
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username",
            // align: "center",
            ...getColumnSearchProps("username", "Username"),
            // ellipsis: true,
        },
        {
            title: "Tags",
            key: "tags",
            dataIndex: "tags",
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
            sorter: (a, b) => a.date_created < b.date_created,
            sortDirection: ["descend", "ascend"],
            ...getColumnSearchProps("date_created", "Date"),

            // width: 93,
        },
        {
            title: "Score",
            dataIndex: "points",
            key: "score",
            align: "right",
            sorter: (a, b) => a.points - b.points,
            sortDirection: ["descend", "ascend"],
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
