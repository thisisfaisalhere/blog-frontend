import PostEditor from "../components/PostEditor/PostEditor.component";
import { axios } from "../apis/axios";
import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { IBlogDetails } from "../helpers/interfaces";

const PostEditPage = () => {
  const [blog, setBlog] = useState<IBlogDetails | null>(null);
  let { slug } = useParams<{ slug: string }>();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`api/blog/${slug}`);
        setBlog(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [slug]);

  const savePost = async (formData: FormData) => {
    try {
      const res = await axios.put(`api/blog/edit/${blog?.id}/`, formData);
      console.log(res);
      if (res.status === 200) {
        history.replace("/profile");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return <>{blog ? <PostEditor savePost={savePost} blog={blog} /> : ""}</>;
};

export default PostEditPage;
