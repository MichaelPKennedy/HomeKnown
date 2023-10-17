"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesService = void 0;
const axios_1 = __importDefault(require("axios"));
class PlacesService {
    constructor(app) {
        this.app = app;
    }
    async find(params) {
        // Extract the query parameter from the params
        const query = params.query?.query;
        if (!query) {
            throw new Error('A query parameter is required.');
        }
        // Here, GOOGLE_API_KEY is a placeholder. Replace it with your key or a method to retrieve it.
        const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
        const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${apiKey}`;
        try {
            const response = await axios_1.default.get(url);
            return response.data;
        }
        catch (error) {
            throw new Error(error.response ? error.response.data.error_message : 'Failed to fetch data from Google Places API');
        }
    }
    async get(id, params) {
        throw new Error('Method not implemented.');
    }
    async create(data, params) {
        throw new Error('Method not implemented.');
    }
    async update(id, data, params) {
        throw new Error('Method not implemented.');
    }
    async patch(id, data, params) {
        throw new Error('Method not implemented.');
    }
    async remove(id, params) {
        throw new Error('Method not implemented.');
    }
}
exports.PlacesService = PlacesService;
//# sourceMappingURL=places.class.js.map