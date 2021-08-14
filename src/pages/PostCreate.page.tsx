import PostEditor from "../components/PostEditor/PostEditor.component";
import { axios } from "../apis/axios";

const PostCreatePage = () => {
  const savePost = async (formData: FormData) => {
    try {
      const res = await axios.post("api/blog/edit/", formData);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return <PostEditor savePost={savePost} />;
};

export default PostCreatePage;
