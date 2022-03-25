import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-placeholder.herokuapp.com/api/v2',
});
