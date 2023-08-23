import feathers from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import axios from "axios";

const restClient = rest("http://localhost:3030"); // Adjust this URL to match where your backend is running.
const client = feathers();

client.configure(restClient.axios(axios));

export default client;
