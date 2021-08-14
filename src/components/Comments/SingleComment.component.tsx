import Comment from "antd/lib/comment";
import Avatar from "antd/lib/avatar/avatar";
import moment from "moment";
import { UserOutlined } from "@ant-design/icons";
import { IComment } from "../../helpers/interfaces";

const SingleComment: React.FC<IComment> = ({ user, comment, time }) => {
  return (
    <Comment
      author={user}
      avatar={<Avatar icon={<UserOutlined />} />}
      content={comment}
      datetime={moment(time).fromNow()}
    />
  );
};

export default SingleComment;
