import MDEditor from "@uiw/react-md-editor";
import { Skeleton } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios } from "../apis/axios";
import CommentComponent from "../components/Comments/CommentList.component";
import { IBlogDetails } from "../helpers/interfaces";

const BlogDetailPage = () => {
  const [blog, setBlog] = useState<IBlogDetails | null>(null);
  let { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/api/blog/${slug}`);
        console.log(data);
        setBlog(data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [slug]);

  return (
    <>
      {blog ? (
        <div style={{ width: "80%", margin: "auto" }}>
          <div style={{ marginTop: "3rem" }}>
            <div
              style={{
                backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${blog.thumbnail})`,
                height: "40rem",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            />
            <h2 style={{ fontSize: "2rem", textAlign: "center" }}>
              {blog?.title}
            </h2>
            <p style={{ fontSize: "0.8rem", textAlign: "right" }}>
              {/* {blog.author},  */}
              {new Date(blog.published_on).toDateString()}
            </p>
          </div>
          <div>
            <MDEditor.Markdown source={blog.body} />
          </div>
          <CommentComponent id={blog.id} />
        </div>
      ) : (
        <Skeleton />
      )}
    </>
  );
};

export default BlogDetailPage;
