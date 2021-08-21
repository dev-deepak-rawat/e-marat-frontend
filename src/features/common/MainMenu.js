import React from "react";
import {Menu} from "antd";

const TopicMenu = ({ menuItems, selectedKey, changeSelectedKey }) => {
  const styledMenu = [];
  menuItems.forEach((menuItems, index) =>
    styledMenu.push(
      <Menu.Item key={index} onClick={changeSelectedKey}>
        {menuItems}
      </Menu.Item>
    )
  );

  return (
    <Menu mode="inline" selectedKeys={[selectedKey]}>
      {styledMenu}
    </Menu>
  );
}
export default TopicMenu;
