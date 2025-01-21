import React, { useState, useEffect } from "react";

import { MenuHorizontal, Filter, Delete } from "@bigbinary/neeto-icons";
import {
  Table,
  Dropdown,
  ActionDropdown,
  Checkbox,
  Pane,
  Button,
  Tag,
} from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import postsApi from "apis/posts";
import { Container, PageLoader, PageTitle } from "components/commons";
import { parseDate } from "utils/dateUtils";
import stringTruncator from "utils/stringUtils";

import FilterPosts from "./FilterPosts";

const UserPosts = ({ history }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [columnConfig, setColumnConfig] = useState({
    identity: true,
    categories: true,
    published_at: true,
    status: true,
    slugstat: true,
  });
  const [isPaneVisible, setIsPaneVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const numberOfResults = posts.length;
  const isSelected = selectedRows.length > 0;

  const handleColumnToggle = (checked, columnKey) => {
    setColumnConfig(prevConfig => ({
      ...prevConfig,
      [columnKey]: checked,
    }));
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();

      queryParams.append("title", title);

      queryParams.append("status", status.value);

      selectedCategories.forEach(category => {
        queryParams.append("category_ids[]", category.value);
      });

      const {
        data: { posts },
      } = await postsApi.fetchUserPosts(queryParams);
      setPosts(posts);
      setIsFiltered(
        Boolean(title || status?.value || selectedCategories.length)
      );
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isFiltered, status.value]);

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

  const handleSelect = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows);
  };

  const handleBulkAction = action => {
    selectedRows.forEach(({ slugstat: { slug } }) => {
      handleSubmit({
        status: action,
        slug,
      });
    });
  };

  const handleBulkDelete = () => {
    selectedRows.forEach(({ slugstat: { slug } }) => deleteHandler(slug));
    setSelectedRows([]);
    setSelectedRowKeys([]);
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

  const filteredColumns = columns.filter(({ key }) => columnConfig[key]);

  return (
    <Container>
      <div className="flex flex-col gap-y-8">
        <PageTitle history={history} title="My blog posts" />
        <div className="mx-14 flex items-center gap-4">
          {isFiltered && (
            <div className="flex gap-3">
              <h4>
                {numberOfResults} results for "{title}"
              </h4>
              {selectedCategories.map(({ label, value }) => (
                <Tag
                  key={value}
                  label={label}
                  style="secondary"
                  onClose={function noRefCheck() {}}
                />
              ))}
              {status.value === "draft" && (
                <Tag
                  className="bg-white"
                  label="Draft"
                  style="danger"
                  onClose={function noRefCheck() {}}
                />
              )}
            </div>
          )}
          {isSelected && (
            <div className="flex gap-4">
              <Dropdown buttonStyle="secondary" label="Change status">
                <Menu>
                  <MenuItem
                    className="mx-1 cursor-pointer p-2"
                    onClick={() => handleBulkAction("draft")}
                  >
                    Draft
                  </MenuItem>
                  <MenuItem
                    className="mx-1 cursor-pointer p-2"
                    onClick={() => handleBulkAction("published")}
                  >
                    Publish
                  </MenuItem>
                </Menu>
              </Dropdown>
              <Button
                className="bg-red-50"
                icon={Delete}
                label="Delete"
                style="danger-text"
                onClick={handleBulkDelete}
              />
            </div>
          )}
          {!isSelected && (
            <div className="ml-auto flex gap-3">
              <ActionDropdown buttonStyle="secondary" label="Columns">
                <Menu>
                  <Checkbox
                    checked
                    disabled
                    className="cursor-pointer p-3 text-sm"
                    id="title"
                    label="Title"
                  />
                  <Checkbox
                    checked={columnConfig.categories}
                    className="cursor-pointer p-3 text-sm"
                    id="category"
                    label="Category"
                    onClick={event => event.stopPropagation()}
                    onChange={({ target: { checked } }) =>
                      handleColumnToggle(checked, "categories")
                    }
                  />
                  <Checkbox
                    checked={columnConfig.published_at}
                    className="cursor-pointer p-3 text-sm"
                    id="published_at"
                    label="Last published at"
                    onClick={e => e.stopPropagation()}
                    onChange={({ target: { checked } }) =>
                      handleColumnToggle(checked, "published_at")
                    }
                  />
                  <Checkbox
                    checked={columnConfig.status}
                    className="cursor-pointer p-3 text-sm"
                    id="status"
                    label="Status"
                    onClick={e => e.stopPropagation()}
                    onChange={({ target: { checked } }) =>
                      handleColumnToggle(checked, "status")
                    }
                  />
                </Menu>
              </ActionDropdown>
              <Filter
                className="cursor-pointer"
                onClick={() => setIsPaneVisible(true)}
              />{" "}
            </div>
          )}
        </div>
        <Pane
          className="relative"
          isOpen={isPaneVisible}
          onClose={() => setIsPaneVisible(false)}
        >
          <FilterPosts
            {...{
              title,
              setTitle,
              status,
              setStatus,
              selectedCategories,
              setSelectedCategories,
              isFiltered,
              setIsFiltered,
              fetchPosts,
              setIsPaneVisible,
            }}
          />
        </Pane>
        <div className="mx-14">
          <Table
            rowSelection
            bordered={false}
            className="custom-table"
            columnData={filteredColumns}
            enableAddColumn={false}
            enableColumnFreeze={false}
            enableColumnReorder={false}
            enableColumnResize={false}
            loading={loading}
            rowData={postsData}
            selectedRowKeys={selectedRowKeys}
            selectedRows={selectedRows}
            onRowSelect={handleSelect}
          />
        </div>
      </div>
    </Container>
  );
};

export default UserPosts;
