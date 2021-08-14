import { Header } from "antd/lib/layout/layout";
import Menu from "antd/lib/menu";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { axios } from "../../apis/axios";
import { IUser } from "../../helpers/interfaces";
import { store } from "../../redux/store";
import { setCurrentUser } from "../../redux/user/user.actions";
import "./navbar.styles.scss";

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const history = useHistory();

  store.subscribe(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  });

  useEffect(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  }, []);

  const logoutUser = async () => {
    try {
      await axios.post(`api/user/logout/`, { refresh: user?.tokens.refresh });
      store.dispatch(setCurrentUser(null));
      history.replace("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Header className="navbar">
      <div className="logo" />
      <div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" onClick={() => history.push("/")}>
            Home
          </Menu.Item>
          {!user ? (
            <Menu.Item key="2" onClick={() => history.push("/login")}>
              Login
            </Menu.Item>
          ) : (
            <>
              <Menu.Item key="3" onClick={() => history.push("/profile")}>
                Profile
              </Menu.Item>
              <Menu.Item key="4" onClick={logoutUser}>
                Logout
              </Menu.Item>
            </>
          )}
        </Menu>
      </div>
    </Header>
  );
};

export default Navbar;
