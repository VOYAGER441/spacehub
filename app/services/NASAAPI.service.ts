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
  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/DONKI/${apiType}`;
  const url = `${baseUrl}?startDate=${startDate}&endDate=${endDate}&api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}`;

  const response = await axios.get(url);
  return response.data;
};

export default{ getPicOfTheDay, getASONews ,fetchDonkiData};
