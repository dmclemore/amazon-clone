import axios from "axios";

const instance = axios.create({
    baseURL: "https://us-central1-clone-269c4.cloudfunctions.net/api",
    // baseURL: "http://localhost:5001/clone-269c4/us-central1/api",
});

export default instance;
