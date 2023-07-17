import axios from 'axios';

export const getData = async (search?: string) => {
  try {
    if (search) {
      const response = await axios.get('http://localhost:4000/sick', {
        params: {
          q: search,
        },
      });
      console.info('calling api');
      return response.data;
    } else {
      const response = await axios.get('http://localhost:4000/sick');
      console.info('calling api');
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
