import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Axios from "../../utils/axios";
import "antd/dist/antd.css";
import "./style.css";
import { Table, Tag, Input, Button, Space, Dropdown, Menu } from "antd";
import Highlighter from "react-highlight-words";
import {
  SearchOutlined,
  EditFilled,
  DeleteFilled,
  DatabaseOutlined,
} from "@ant-design/icons";
import btn from "../../assets/img/btn.png";
import { ReactComponent as EditBtn } from "../../assets/img/editbtn.svg";
import moment from "moment";

class LocationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      searchedColumn: "",
      region: "",
      loading: true,
    };
  }

  componentDidMount() {
    Axios.get(`locations`).then((res) => {
      const data = res.data;
      this.setState({ data, loading: false });
      console.log(this.state, "----------------");
    });
  }
  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  render() {
    console.log(this.props.user);
    const { loading } = this.state;
    const { type, locationType } = this.props.user;
    const menu = (id) => {
      return (
        <Menu>
          <Menu.Item
            onClick={() => {
              this.props.history.push(`/location/${id}`);
            }}
          >
            <DatabaseOutlined /> View
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              Axios.get(`/locations/${id}/delete`)
                .then((res) => {
                  this.setState((prevState) => ({
                    data: prevState.data.filter((i) => i._id !== id),
                  }));
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            <DeleteFilled /> Delete
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              this.props.history.push(`/locations-update/${id}`);
            }}
          >
            <EditFilled /> Edit
          </Menu.Item>
        </Menu>
      );
    };
    const columns = [
      {
        width: "20%",
        title: "Region",
        dataIndex: "region",
        key: "region",
        ...this.getColumnSearchProps("region"),
      },
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: "20%",
        ...this.getColumnSearchProps("name"),
      },
      {
        title: "Tashkilot turi",
        dataIndex: "type",
        key: "type",
        width: "30%",
        ...this.getColumnSearchProps("type"),
      },
      {
        title: "Deadline",
        dataIndex: "deadline",
        key: "deadline",
        width: "20%",
        ...this.getColumnSearchProps("deadline"),
        render: (text) => <a>{moment(text).format("DD-MM-YYYY")}</a>,
      },
      {
        title: "Status",
        key: "isFinished",
        dataIndex: "isFinished",
        width: "10%",
        ...this.getColumnSearchProps("Status"),
        render: (text, record) =>
          record.isFinished == "true" ? (
            <Tag color="#29CC97">Finished</Tag>
          ) : record.isFinished == "false" ? (
            <Tag color="#F12B2C">No</Tag>
          ) : record.isFinished == "progress" ? (
            <Tag color="#FEC400">Progress</Tag>
          ) : null,
      },
      {
        dataIndex: "",
        key: "",
        render: (record) => {
          const showBtns =
            type === "admin" ||
            (type === "user" &&
              locationType.toLowerCase() === record.region.toLowerCase());
          return (
            showBtns && (
              <span
                className="table-operation"
                onClick={(e) => e.stopPropagation()}
              >
                <Dropdown overlay={menu(record._id)} trigger={["click"]}>
                  <img src={btn} alt="btn" />
                </Dropdown>
              </span>
            )
          );
        },
      },
    ];
    return (
      <div>
        <div className="location-top">
          <h2>All Locations</h2>
          {type == "admin" && (
            <Button
              onClick={() => this.props.history.push(`/locations-create`)}
              className="add-location-btn"
            >
              <EditBtn />
              <span>Add Location</span>
            </Button>
          )}
        </div>
        <div className="location-list">
          <Table
            sortDirections={["descend"]}
            columns={columns}
            loading={loading}
            dataSource={this.state.data}
            rowKey="id"
            onRow={(record) => {
              return {
                onClick: (e) =>
                  this.props.history.push("/location/" + record._id),
              };
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};
export default connect(mapStateToProps)(LocationList);
