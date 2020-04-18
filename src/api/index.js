import axios from "axios";

const url = " https://covid19.mathdro.id/api";

export const fetchData = async (country) => {
  let dynamicUrl = url;
  if (country) {
    dynamicUrl = `${url}/countries/${country}`;
  }
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(dynamicUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);
    const modifiedData = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      recovered: dailyData.deaths.recovered,
      date: dailyData.reportDate,
    }));
    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);
    const countryName = data.countries.map((country) => country.name);
    return countryName;
  } catch (error) {
    console.log(error);
  }
};
