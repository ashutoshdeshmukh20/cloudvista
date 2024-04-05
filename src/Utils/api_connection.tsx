// apiConnection.js
import axios from "axios";

const baseURL = "https://lsvca8n44i.execute-api.ap-south-1.amazonaws.com/Prod";

const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


const request = async (method: string, url: string, data = null) => {
  try {
    const response = await api.request({
      method,
      url,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const get = async (url: string) => {
  return request("get", url);
};

const post = async (url: any, data: null | undefined) => {
  return request("post", url, data);
};

const put = async (url: any, data: null | undefined) => {
  return request("put", url, data);
};

const patch = async (url: any, data: null | undefined) => {
  return request("patch", url, data);
};

const remove = async (url: any) => {
  return request("delete", url);
};

export { get, post, put, patch, remove };
