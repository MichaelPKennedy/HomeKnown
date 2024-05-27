import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import axios from "axios";

const isMobileTesting = process.env.REACT_APP_MOBILE_TESTING;
const DEFAULT_API_ENDPOINT = isMobileTesting
  ? "http://10.0.0.2:3030"
  : "http://localhost:3030";

const API_ENDPOINT = process.env.REACT_APP_API_URL || DEFAULT_API_ENDPOINT;

export const axiosInstance = axios.create({
  baseURL: API_ENDPOINT,
});

const API_KEY = process.env.REACT_APP_API_KEY;
axiosInstance.defaults.headers.common["x-access-token"] = API_KEY;

const restClient = rest(API_ENDPOINT);

const client = feathers();
client.configure(restClient.axios(axiosInstance));

export default client;
