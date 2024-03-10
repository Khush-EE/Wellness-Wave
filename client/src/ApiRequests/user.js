import axios from "axios";

const url = "/api/v1/user";

export const userById = async (id) => {
  try {
    const res = await axios.get(`${url}/${id}`);
    return res.data.data["user"];
  } catch (error) {
    throw error;
  }
};

export const signup = async (data) => {
  try {
    const response = await axios.post(`${url}/register`, data);

    return response.data.data["user"];
  } catch (error) {
    throw error; // Re-throw the error to handle it in the component
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${url}/login`,
      { email: email, password: password },
      { withCredentials: true }
    );

    return response.data.data["user"];
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post(
      `${url}/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    throw error;
  }
};

export const updateProfilePic = async (id, avatarImage) => {
  try {
    const formData = new FormData();
    formData.append("avatarImage", avatarImage); // Append the file here
    const response = await axios.post(
      `${url}/${id}/updateProfilePic`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response.data.data["user"];
  } catch (error) {
    throw error;
  }
};

export const updateMentalDisorder = async (id, mentalDisorder) => {
  try {
    const response = await axios.patch(
      `${url}/${id}/updateMentalDisorder`,
      { disorder: mentalDisorder },
      {
        withCredentials: true,
      }
    );

    return response.data.data["user"];
  } catch (error) {
    throw error;
  }

}

export const userWithSameDisorder = async (disorder) => {
  try {
    const response = await axios.get(`${url}/disorder/getUsersWithSameDisorder`, {
      params: {
        disorder: disorder,
      },
    });

    return response.data.data["user"];
  } catch (error) {
    throw error;
  }
}
