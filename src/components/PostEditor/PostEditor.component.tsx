import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { IBlogDetails } from "../../helpers/interfaces";
import "./PostEdit.styles.scss";

const PostEditor: React.FC<{ savePost: Function; blog?: IBlogDetails }> = ({
  savePost,
  blog,
}) => {
  const [post, setPost] = useState({
    title: "",
    excerpt: "",
    published: "",
  });
  const [postBody, setPostBody] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (blog) {
      setPost({
        title: blog.title,
        excerpt: blog.excerpt,
        published: blog.published,
      });
      setPostBody(blog.body);
    }
  }, [blog]);

  const onChange = (field: string, value: any) => {
    if (field !== "body") setPost({ ...post, [field]: value });
    else setPostBody(value);
  };

  const fileChangeHandler = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    if (file.size > 2048000) setError("File size more than 2mb");
    else {
      if (
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg"
      )
        setThumbnail(file);
      else
        setError("File type not supported. Supported formats png, jpg, jpeg");
    }
  };

  const handleSavePost = () => {
    const formData = new FormData();

    formData.append("thumbnail", thumbnail);
    formData.append("body", postBody);
    formData.append("title", post.title);
    formData.append("excerpt", post.excerpt);
    formData.append("published", post.published.toString());

    savePost(formData);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "80%",
        margin: "auto",
      }}
    >
      <div className="formContainer">
        <p className="pTag">Title</p>
        <input
          type="text"
          name="title"
          value={post.title}
          className="inputField"
          placeholder="Enter Post Title"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
        <p className="pTag">Intro to your blog</p>
        <textarea
          name="excerpt"
          cols={80}
          rows={8}
          value={post.excerpt}
          className="textField"
          onChange={(e) => onChange(e.target.name, e.target.value)}
        ></textarea>

        <MDEditor
          style={{ marginTop: "1rem" }}
          value={postBody}
          onChange={(value) => onChange("body", value)}
        />

        <label>
          <input
            type="checkbox"
            name="published"
            value={post.published}
            className="checkbox"
            onChange={(e) => onChange(e.target.name, e.target.value)}
          />
          {"  "}Publish?
        </label>
        <p className="pTag">Thumbnail</p>
        <input
          type="file"
          name="thumbnail"
          onChange={fileChangeHandler}
          className="fileField"
        />
        {thumbnail === "" && blog ? (
          <>
            <p className="pTag">Previous Thumbnail</p>
            <img
              width={250}
              alt="thumbnail"
              src={`${process.env.REACT_APP_BACKEND_URL}${blog?.thumbnail}`}
            />
          </>
        ) : (
          <>
            <p className="pTag">Current Thumbnail</p>
            {thumbnail !== "" && (
              <img width={250} src={URL.createObjectURL(thumbnail)} alt="" />
            )}
          </>
        )}
        <p className="pTag">{error}</p>
        <button className="postBtn" onClick={handleSavePost}>
          {blog ? "Edit" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default PostEditor;
