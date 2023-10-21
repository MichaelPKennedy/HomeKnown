import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import axios from "axios";

// const isMobileTesting = process.env.REACT_APP_MOBILE_TESTING === "true";
const isMobileTesting = true;
const API_ENDPOINT = isMobileTesting
  ? "http://10.0.0.18:3030"
  : "http://localhost:3030";

const restClient = rest(API_ENDPOINT);
const client = feathers();

client.configure(restClient.axios(axios));

export default client;
