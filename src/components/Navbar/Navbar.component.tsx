import { Header } from "antd/lib/layout/layout";
import Menu from "antd/lib/menu";
import { useEffect, useState } from "react";
import { IUser } from "../../helpers/interfaces";
import { store } from "../../redux/store";
import "./navbar.styles.scss";

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>(null);

  store.subscribe(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  });

  useEffect(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  }, []);

  return (
    <Header className="navbar">
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1">Home</Menu.Item>
          {user ? (
            <Menu.Item key="2">Login</Menu.Item>
          ) : (
            <>
              <Menu.Item key="3">Profile</Menu.Item>
              <Menu.Item key="4">Logout</Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
