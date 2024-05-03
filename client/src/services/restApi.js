import axios from "axios";

const baseUrl = "http://localhost:8080/api/v1/";

export const addContacts = async (data) => {
  try {
    const url = baseUrl + "contact/add";
    const response = await axios({
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: data ? JSON.stringify(data) : undefined,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const fetchAllContacts = async (config) => {
  try {
    const url = baseUrl + `contact?phoneNumber=${config.phoneNumber}`;
    const response = await axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const fetchContactById = async (id) => {
  try {
    const url = baseUrl + `contact/${id}`;
    const response = await axios({
      method: "GET",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const updateContact = async (data, id) => {
  try {
    const url = baseUrl + `contact/${id}`;
    const response = await axios({
      method: "PUT",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const deleteContact = async (id) => {
  try {
    const url = baseUrl + `contact/${id}`;
    const response = await axios({
      method: "DELETE",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const bulkContactUpload = async (data) => {
  try {
    const url = baseUrl + "contact/bulkUpload";
    const response = await axios({
      method: "POST",
      url,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};
