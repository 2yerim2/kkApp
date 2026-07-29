import axios from "axios";

const API_URL = "http://192.168.0.13:8080";


export const searchPosts = async (keyword) => {
  try {
    const response = await axios.get(
      `${API_URL}/posts/search`,
      {
        params: {
          keyword: keyword
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("검색 API 오류:", error);
    return [];
  }
};