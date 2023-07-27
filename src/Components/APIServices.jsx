import axios from "axios";


const BaseURL = "https://zingcam.prod.flamapp.com/skrull";
const AuthKey = "02500eb9-eda8-45c2-ba1c-bfb3cef5a02d";

export const getAll = async () => {
  try {
    const response = await axios.get(`${BaseURL}/jobs/getAll`, {
      headers: {
        Authorization: AuthKey,
      },
    });

    console.log("getAll", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getOrderByJobId = async (jobId, param) => {
  try {
    const response = await axios.get(
      `${BaseURL}/orders/getOrderByJobId/${jobId}`,
      {
        headers: {
          Authorization: AuthKey,
        },
      }
    );
    console.log("getOrderByJobId", response.data.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
