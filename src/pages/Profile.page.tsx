import {
  DeleteOutlined,
  EditFilled,
  EditOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { Skeleton, Button, Empty, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { axios } from "../apis/axios";
import { IBlog, IUser } from "../helpers/interfaces";
import { store } from "../redux/store";

const ProfilePage = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [userBlogs, setUserBlogs] = useState<IBlog[] | null>(null);

  const history = useHistory();

  store.subscribe(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  });

  useEffect(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  }, [history]);

  // useEffect(() => {
  //   if (!user) {
  //     history.replace("/");
  //   }
  // });

  // getting user post
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("api/blog/edit/");
        console.log(data);
        setUserBlogs(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const deletePost = async (id: string) => {
    try {
      const res = await axios.delete(`api/blog/edit/${id}`);
      console.log(res);
      if (res.status === 204) {
        const temp = userBlogs;
        const indexOf = temp?.findIndex((item) => item.id === id);
        if (indexOf) temp?.splice(indexOf, 1);
        if (temp) setUserBlogs([...temp]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const viewPost = (slug: string) => {
    history.push(`/blog/${slug}/`);
  };

  const editPost = (slug: string) => {
    history.push(`/edit/${slug}/`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "80%",
        margin: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "1rem auto 1rem auto",
        }}
      >
        <h4>Your Name: {user?.name}</h4>
        <Button
          type="primary"
          size="large"
          shape="round"
          icon={<EditFilled />}
          onClick={() => history.push("/create")}
        >
          Add Article
        </Button>
      </div>
      <div>
        {userBlogs ? (
          userBlogs.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridGap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              {userBlogs.map((blog) => (
                <Card
                  key={blog.id}
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <img
                      alt="thumbnail"
                      src={`${process.env.REACT_APP_BACKEND_URL}${blog.thumbnail}`}
                    />
                  }
                  actions={[
                    <DeleteOutlined
                      key="setting"
                      onClick={() => deletePost(blog.id)}
                    />,
                    <EditOutlined
                      key="edit"
                      onClick={() => editPost(blog.slug)}
                    />,
                    <EyeOutlined
                      key="ellipsis"
                      onClick={() => viewPost(blog.slug)}
                    />,
                  ]}
                >
                  <Meta title={blog.title} description={blog.excerpt} />
                  <Meta
                    style={{ marginTop: "1rem", fontSize: "0.8rem" }}
                    description={new Date(
                      blog.published_on
                    ).toLocaleDateString()}
                  />
                </Card>
              ))}
            </div>
          ) : (
            <Empty />
          )
        ) : (
          <Skeleton />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
