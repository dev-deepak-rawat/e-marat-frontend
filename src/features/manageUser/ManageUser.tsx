import React, { useState } from "react";
import { Layout } from "antd";
import MainMenu from "../common/MainMenu";
import Table from "../common/Table"
import NavBar from "../common/NavBar/NavBar";
import SideBar from "../common/SideBar/SideBar";

function ManageUser() {
    const menuItems = [
        "Home",
        "Amenities",
        "Feeds",
        "Broadcast",
        "Complaints",
        "Users",
        "Payments",
    ];
    const [contentIndex, setContentIndex] = useState(0);
    const [selectedKey, setSelectedKey] = useState("0");
    const changeSelectedKey = (event: any) => {
        const key = event.key;
        setSelectedKey(key);
        setContentIndex(+key);
    };
    const Menu = (
        <MainMenu
            menuItems={menuItems}
            selectedKey={selectedKey}
            changeSelectedKey={changeSelectedKey}
        />
    );
    return (
        <div className="App">
            <NavBar menu={Menu} />
            <Layout>
                <SideBar menu={Menu} />
                <Layout.Content className="content">
                    <Table />
                </Layout.Content>
            </Layout>
        </div>
    );
}

export default ManageUser;