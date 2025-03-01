/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import * as Interface from "@/app/interface/NASAData.interface";

async function getPicOfTheDay() {
  // console.log('3333333333');
  // console.log("Base URL:", process.env.NEXT_PUBLIC_BASE_URL);
  // console.log("API Key:", process.env.NEXT_PUBLIC_NASA_API_KEY);
  // console.log('###############');

  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
  // console.log("Full API URL:", url);
  try {
    const response = await axios.get<Interface.IPicOfTheDay>(url);

    if (!response.data) {
      throw new Error("Data set empty!!!");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    throw new Error("Server error");
  }
}

async function getASONews(startDate: string, endDate: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
    const response = await axios.get(url);

    if (!response.data) {
      throw new Error("⚠️ Data set is empty.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    throw new Error("❌ Server error.");
  }
}

const fetchDonkiData = async (apiType: any, { startDate, endDate }: any) => {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/DONKI/${apiType}`;
    const url = `${baseUrl}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;

    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("⚠️ Data set is empty.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    throw new Error("❌ Server error.");
  }
};

async function getEpic() {
  try {
    const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/EPIC/api/natural/images`;
    const url = `${baseUrl}?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("⚠️ Data set is empty.");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    throw new Error("❌ Server error.");
  }
}

async function getMarsWeather() {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/insight_weather/?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&feedtype=json&ver=1.0`;
    // console.log(url);

    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("⚠️ Data set is empty.");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    throw new Error("❌ Server error.");
  }
}

async function getMarsRoverPic(date: string) {
  try {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;
    // console.log(url);
    const response = await axios.get(url);
    if (!response.data) {
      throw new Error("⚠️ Data set is empty.");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching NASA data:", error);
    throw new Error("❌ Server error.");
  }
}

const BASE_URL = "https://images-api.nasa.gov/search?q=";

const getSearchResult = async (query: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${query}`);

    if (
      response.data &&
      response.data.collection &&
      Array.isArray(response.data.collection.items)
    ) {
      return response.data.collection.items;
    } else {
      console.error("Unexpected API response:", response.data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default {
  getPicOfTheDay,
  getASONews,
  fetchDonkiData,
  getEpic,
  getMarsWeather,
  getMarsRoverPic,
  getSearchResult,
};
