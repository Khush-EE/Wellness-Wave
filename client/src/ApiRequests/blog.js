import axios from "axios";

const url = "http://localhost:8000/api/v1/blog";

export const getAllBlogs = async () => {
  const response = await axios.get(url);
  const blogs = response.data.data;

  return blogs;
};

export const createBlog = async (title, description, tags, images) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("tags", tags);
    formData.append("images", images);

    const response = await axios.post(`${url}/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });

    const res = {
      _id: response.data.data["blog"]._id,
      user: response.data.data["user"],
    };
    return res;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id) => {
  try {
    const response = await axios.delete(`${url}/${id}/delete`, {
      withCredentials: true,
    });

    return response.data.data["user"];
  } catch (error) {
    throw error;
  }
};

export const likeBlog = async (id) => {
  try {
    const response = await axios.post(
      `${url}/${id}/like`,
      {},
      { withCredentials: true }
    );

    const res = {
      blog: response.data.data["blog"],
      user: response.data.data["user"],
    };

    return res;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await axios.get(`${url}/${id}`);

    return response.data.data["blog"];
  } catch (error) {
    throw error;
  }
};

export const comment = async (id, title, description) => {
  try {
    const response = await axios.post(
      `${url}/${id}/comment`,
      { title, description },
      { withCredentials: true }
    );

    return response.data.data["comment"];
  } catch (error) {
    throw error;
  }
};

export const getBlogUsingTags = async (tags) => {
  let query = "";
  if (tags && tags.length > 0) {
    query = tags.map(tag => `tags=${tag}`).join('&');
  }

  try {
    const response = await axios.get(`${url}/filter${query ? `?${query}` : ''}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}
