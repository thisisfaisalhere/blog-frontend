import { useEffect, useState } from "react";
import { axios } from "../apis/axios";
import { Card, Empty, Pagination, Skeleton } from "antd";
import { IBlogList } from "../helpers/interfaces";
import Meta from "antd/lib/card/Meta";
import { useHistory } from "react-router";

const HomePage = () => {
  const [blogList, setBlogList] = useState<IBlogList | null>(null);
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get("/api/blog/");
        if (data) {
          setBlogList(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, []);

  const onPageChange = (e: any) => {
    console.log(e);
  };

  return (
    <div
      style={{
        width: "80%",
        margin: "2rem auto",
      }}
    >
      {blogList ? (
        blogList?.results && blogList.results.length > 0 ? (
          <>
            <div
              style={{
                display: "grid",
                gridGap: "1rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              }}
            >
              {blogList.results.map((blog) => (
                <Card
                  key={blog.id}
                  hoverable
                  style={{ width: "100%" }}
                  cover={<img alt="thumbnail" src={blog.thumbnail} />}
                  onClick={() => history.push(`/blog/${blog.slug}/`)}
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
            <div style={{ margin: "1rem" }}>
              <Pagination
                defaultCurrent={1}
                total={blogList?.count}
                onChange={onPageChange}
                hideOnSinglePage
              />
            </div>
          </>
        ) : (
          <Empty />
        )
      ) : (
        <Skeleton active />
      )}
    </div>
  );
};

export default HomePage;
