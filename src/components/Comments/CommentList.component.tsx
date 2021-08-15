import { useState, useEffect } from "react";
import Comment from "antd/lib/comment";
import Avatar from "antd/lib/avatar/avatar";
import message from "antd/lib/message";
import Button from "antd/lib/button";
import UserOutlined from "@ant-design/icons/UserOutlined";
import Editor from "../CommentEditor/Editor.component";
import { axios } from "../../apis/axios";
import { store } from "../../redux/store";
import SingleComment from "./SingleComment.component";
import { IComment, IUser } from "../../helpers/interfaces";

const CommentComponent: React.FC<{ id: string }> = ({ id }) => {
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [viewComments, setViewComments] = useState(false);

  const url = `api/blog/c/comment/${id}`;

  store.subscribe(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  });

  useEffect(() => {
    let updatedUser = store.getState().user.currentUser;
    setUser(updatedUser);
  }, [user]);

  useEffect(() => {
    async function getComments() {
      try {
        if (viewComments) {
          setLoading(true);
          const { data } = await axios.get(url);
          setComments(data);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getComments();
  }, [url, viewComments]);

  const handleSubmit = async (value: string, setValue: any) => {
    if (value.length > 0) {
      setSubmitting(true);
      try {
        const { data } = await axios.post("api/blog/c/comment/", {
          comment: value,
          article: id,
        });
        if (comments && user)
          setComments([
            {
              user: user?.name,
              comment: value,
              time: new Date(),
            },
            ...comments,
          ]);
        setViewComments(true);
        message.info(data.msg);
      } catch (err) {
        console.error("error=> ", err);
      } finally {
        setSubmitting(false);
        setValue("");
      }
    }
  };

  return (
    <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
      {user && (
        <Comment
          avatar={<Avatar size="large" icon={<UserOutlined />} />}
          content={
            <Editor
              btnText={"Add Comment"}
              placeholderText={"add a comment..."}
              submitting={submitting}
              handleSubmit={handleSubmit}
            />
          }
        />
      )}
      {!viewComments ? (
        <Button
          type={"default"}
          onClick={() => {
            setViewComments(true);
          }}
          size={"large"}
        >
          View Comments
        </Button>
      ) : (
        !loading &&
        comments &&
        comments.map((comment) => (
          <SingleComment key={comment.id} {...comment} />
        ))
      )}
    </div>
  );
};

export default CommentComponent;
