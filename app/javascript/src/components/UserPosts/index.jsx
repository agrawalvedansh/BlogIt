import React, { useState, useEffect } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Table, Dropdown } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import postsApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";
import { parseDate } from "utils/dateUtils";
import stringTruncator from "utils/stringUtils";

const UserPosts = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const {
        data: { posts },
      } = await postsApi.fetchUserPosts();
      setPosts(posts);
      setLoading(false);
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const deleteHandler = async slug => {
    try {
      postsApi.destroy({ slug, quiet: true });
      fetchPosts();
    } catch (error) {
      logger.error(error);
    }
  };

  const handleSubmit = async ({ status, slug }) => {
    try {
      await postsApi.update({
        slug,
        payload: { status },
      });
      fetchPosts();
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { Menu, MenuItem, Divider } = Dropdown;

  const postsData = posts.map(
    ({ id, title, categories, updated_at, status, slug }) => ({
      id,
      identity: { title, slug },
      published_at: updated_at,
      categories,
      status,
      slugstat: { slug, status },
    })
  );

  const columns = [
    {
      title: "Title",
      dataIndex: "identity",
      key: "identity",
      width: 200,
      render: identity => {
        const { title, slug } = identity;
        const truncatedTitle = stringTruncator(title);

        return (
          <Link className="text-md" to={`/posts/${slug}/show`}>
            {truncatedTitle}
          </Link>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      width: 150,
      render: categories => (
        <div>{categories.map(category => category.name).join(", ")}</div>
      ),
    },
    {
      title: "Last Published At",
      dataIndex: "published_at",
      key: "published_at",
      width: 150,
      render: published_at => {
        const { day, monthName, year, time } = parseDate(published_at);

        return (
          <div className="text-sm font-light text-gray-600">
            {day} {monthName} {year}, {time}
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 100,
      render: title => title[0].toUpperCase() + title.slice(1),
    },
    {
      title: "",
      dataIndex: "slugstat",
      key: "slugstat",
      width: 60,
      render: slugstat => {
        const { slug, status } = slugstat;

        return (
          <Dropdown
            buttonSize="small"
            buttonStyle="text"
            className="z-50"
            icon={MenuHorizontal}
            strategy="fixed"
          >
            <Menu>
              <MenuItem
                className="mx-1 cursor-pointer p-2"
                onClick={() =>
                  handleSubmit({
                    status: status === "draft" ? "published" : "draft",
                    slug,
                  })
                }
              >
                {status === "draft" ? "Publish" : "Unpublish"}
              </MenuItem>
              <Divider />
              <MenuItem
                className="onClick mx-1 cursor-pointer p-2 text-red-500"
                onClick={() => deleteHandler(slug)}
              >
                Delete
              </MenuItem>
            </Menu>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle history={history} title="My blog posts" />
        <div className="mx-14">
          <Table
            rowSelection
            bordered={false}
            className="custom-table"
            columnData={columns}
            enableAddColumn={false}
            enableColumnFreeze={false}
            enableColumnReorder={false}
            enableColumnResize={false}
            loading={loading}
            rowData={postsData}
          />
        </div>
      </div>
    </Container>
  );
};

export default UserPosts;
