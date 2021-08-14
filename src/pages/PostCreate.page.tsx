import PostEditor from "../components/PostEditor/PostEditor.component";
import { axios } from "../apis/axios";
import { useHistory } from "react-router";

const PostCreatePage = () => {
  const history = useHistory();

  const savePost = async (formData: FormData) => {
    try {
      const res = await axios.post("api/blog/edit/", formData);
      console.log(res);
      if (res.status === 201) {
        history.push("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <PostEditor savePost={savePost} />;
};

export default PostCreatePage;
