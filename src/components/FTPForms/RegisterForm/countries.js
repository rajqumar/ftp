import axios from 'axios';

export const getListOfCountries = async () => {
  const url = 'https://ftp-api.hellosme.com/api/country';
  const countriesResponse = await axios.get(url);
  if (countriesResponse.status == 200) {
    return await countriesResponse.data.success.data;
  }
  return;
};

export default {
  getListOfCountries,
};
