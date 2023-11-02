"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyService = void 0;
class SurveyService {
    constructor(app) {
        this.app = app;
    }
    async create(data, params) {
        const jobData = this.parseJobData(data);
        const weatherData = this.parseWeatherData(data);
        const recreationData = data.data.recreationalInterests;
        const housingData = this.parseHousingData(data);
        const publicServicesData = this.parsePublicServicesData(data);
        try {
            const [jobResponse, weatherResponse, recreationResponse, housingResponse, publicServicesResponse] = await Promise.all([
                this.getIndustryResponse(jobData),
                this.getWeatherResponse(weatherData),
                this.getRecreationResponse(recreationData),
                this.getHousingResponse(housingData),
                this.getPublicServicesResponse(publicServicesData)
            ]);
            const topCitiesMatches = weatherResponse.topCities.filter((weatherCity) => {
                return jobResponse.topCities.some((jobCity) => {
                    const regex = new RegExp(`^${weatherCity.city}-|-${weatherCity.city}-|-${weatherCity.city}$`);
                    return regex.test(jobCity.Area.area_title) || weatherCity.city === jobCity.Area.area_title;
                });
            });
            let topCities;
            if (topCitiesMatches) {
                topCities = topCitiesMatches;
            }
            else {
                topCities = [...weatherResponse.topCities.slice(0, 5), ...jobResponse.topCities.slice(0, 5)];
            }
            //TODO: make a call to non-existent function which will normalize the responses and get all necessary missing data for each of the selected top cites and states
            return {
                jobResponse,
                weatherResponse,
                recreationResponse,
                topCities
            };
        }
        catch (error) {
            console.error('Error processing requests:', error);
            throw new Error('Unable to process requests.');
        }
    }
    parseJobData(data) {
        const { minSalary, jobLevel, selectedJobs } = data.data;
        return {
            minSalary,
            jobLevel,
            selectedJobs
        };
    }
    parseWeatherData(data) {
        const { temperatureData, snowPreference, rainPreference } = data.data;
        return {
            temperatureData,
            snowPreference,
            rainPreference
        };
    }
    parseHousingData(data) {
        const { housingType, homeMin, homeMax, rentMin, rentMax } = data.data;
        return {
            housingType,
            homeMin,
            homeMax,
            rentMin,
            rentMax
        };
    }
    parsePublicServicesData(data) {
        const { searchRadius, publicServices } = data.data;
        return {
            searchRadius,
            publicServices
        };
    }
    async getIndustryResponse(data) {
        const industryService = this.app.service('industry');
        try {
            const response = await industryService.find({
                query: {
                    ...data
                }
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the industry service:', error);
            throw new Error('Unable to fetch data from industry service.');
        }
    }
    async getWeatherResponse(data) {
        const weatherService = this.app.service('weather');
        try {
            const response = await weatherService.find({
                query: {
                    ...data
                }
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the industry service:', error);
            throw new Error('Unable to fetch data from industry service.');
        }
    }
    async getRecreationResponse(data) {
        const recreationService = this.app.service('recreation');
        try {
            const response = await recreationService.find({
                query: {
                    recreationalInterests: data
                }
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the recreation service:', error);
            throw new Error('Unable to fetch data from recreation service.');
        }
    }
    async getHousingResponse(data) {
        const housingService = this.app.service('housing');
        try {
            const response = await housingService.find({
                query: {
                    ...data
                }
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the housing service:', error);
            throw new Error('Unable to fetch data from housing service.');
        }
    }
    async getPublicServicesResponse(data) {
        console.log('public service data', data);
        const publicServicesService = this.app.service('public-services');
        try {
            const response = await publicServicesService.find({
                query: {
                    publicServices: data.publicServices,
                    searchRadius: data.searchRadius
                }
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the public services service:', error);
            throw new Error('Unable to fetch data from public services service.');
        }
    }
    async find(params) {
        return [];
    }
    async get(id, params) {
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
exports.SurveyService = SurveyService;
//# sourceMappingURL=survey.class.js.map