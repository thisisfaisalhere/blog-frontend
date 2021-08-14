import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import LoginForm from "../components/LoginForm/LoginForm";
import SignUpForm from "../components/SignUpForm/SignUpForm";
import { IUser } from "../helpers/interfaces";
import { store } from "../redux/store";

const LoginPage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  const history = useHistory();

  store.subscribe(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  });

  useEffect(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  }, [history]);

  useEffect(() => {
    if (user) {
      history.replace("/");
    }
  });

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      {isLogin ? (
        <LoginForm toggleLogin={toggleLogin} />
      ) : (
        <SignUpForm toggleLogin={toggleLogin} />
      )}
    </div>
  );
};

export default LoginPage;
