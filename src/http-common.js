import axios from 'axios';

export default axios.create({
    baseURL: "https://evening-waters-80755.herokuapp.com",
    // baseURL: "http://localhost:8080",
    headers: {
        "Content-type": "application/json"
    }
});