"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyService = void 0;
const sequelize_1 = require("sequelize");
const RecreationalInterestMappings = {
    mountains: ['Mountain Peak', 'Mountain', 'Hiking Trail', 'Hiking Spot'],
    nationalParks: [
        'National Park',
        'State Park',
        'Park',
        'National Park for the Performing Arts',
        'National Preserve',
        'Scenic Area',
        'National Grassland',
        'National Reserve',
        'Wilderness Area',
        'National Recreation Area'
    ],
    forests: ['National Forest', 'Rainforest'],
    waterfrontViews: [
        'National Seashore',
        'Beach',
        'National Lakeshore',
        'Lake',
        'Great Lake',
        'Lakes',
        'Reservoir',
        'Bay',
        'Inlet',
        'River',
        'Fjord',
        'Lake System',
        'Lake Region',
        'National River'
    ],
    scenicDrives: ['Scenic Drive', 'Parkway'],
    historicSites: [
        'Historic Site',
        'Historical Park',
        'Historical Site',
        'Ranch',
        'Historic Landmark',
        'Historic Trail',
        'Landmark',
        'Center',
        'Battlefields Memorial',
        'Heritage Area',
        'Memorial Park',
        'Heritage Corridor',
        'National Military Park',
        'National Battlefield',
        'National Historical Park'
    ],
    monuments: ['National Monument', 'National Memorial', 'Mountain Memorial', 'Memorial', 'Monument'],
    museums: ['Museum', 'National Museum'],
    naturalWonders: [
        'Natural Arch',
        'Waterfall',
        'Viewpoint',
        'Granite Dome',
        'Slot Canyon',
        'Valley',
        'Estuary',
        'Cave'
    ],
    rockClimbing: ['Climbing Area'],
    waterSports: [
        'National Riverway',
        'National Scenic River',
        'Scenic River',
        'National Lakeshore',
        'Lake',
        'Great Lake',
        'Lakes',
        'Bay',
        'Lake System',
        'Lake Region',
        'National River'
    ],
    beach: ['Beach'],
    diverseFloraFauna: ['Botanical Garden'],
    birdWatching: [],
    zoos: ['Zoo', 'Wildlife Reserve'],
    winterSports: ['Ski Resort'],
    stargazing: ['Observatory'],
    amusementParks: ['Amusement Park']
};
class SurveyService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    scoreCities(job, weather, recreation, publicServices, crime, scenery, airQuality, housing, weights, recreationFormData, jobFormData) {
        const cityScores = new Map();
        const categories = [
            { data: job?.topCities, weight: weights.jobOpportunityWeight },
            { data: weather, weight: weights.weatherWeight },
            { data: recreation, weight: weights.recreationalActivitiesWeight },
            { data: housing, weight: weights.costOfLivingWeight },
            { data: publicServices, weight: weights.publicServicesWeight },
            { data: scenery, weight: weights.sceneryWeight },
            { data: airQuality, weight: weights.airQualityWeight },
            { data: crime, weight: weights.crimeRateWeight }
        ];
        categories.forEach((category) => {
            category.data?.forEach((city) => {
                if (!city?.ranking) {
                    return;
                }
                const normalizedScore = 301 - city?.ranking;
                const weightedScore = normalizedScore * (category.weight || 0);
                cityScores.set(city.city_id, (cityScores.get(city.city_id) || 0) + weightedScore);
            });
        });
        const sortedCities = Array.from(cityScores)
            .map(([city_id, score]) => ({ city_id, score }))
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
        // Get detailed information for the top cities
        const citiesWithDetails = this.getCityDetails(sortedCities, recreationFormData, jobFormData);
        return citiesWithDetails;
    }
    async create(data, params) {
        const jobData = this.parseJobData(data);
        const weatherData = this.parseWeatherData(data);
        const recreationData = this.parseRecreationData(data);
        const housingData = this.parseHousingData(data);
        const publicServicesData = this.parsePublicServicesData(data);
        const sceneryData = this.parseSceneryData(data);
        const crimeData = {};
        const airQualityData = {};
        const weights = data.data.weights;
        let apiPromises = {};
        // Add API call promises based on weights
        const addApiCall = (weightKey, apiCall, parsedData) => {
            if (weights[weightKey] && weights[weightKey] > 0) {
                apiPromises[weightKey] = apiCall(parsedData);
            }
        };
        addApiCall('jobOpportunityWeight', this.getIndustryResponse.bind(this), jobData);
        addApiCall('weatherWeight', this.getWeatherResponse.bind(this), weatherData);
        addApiCall('recreationalActivitiesWeight', this.getRecreationResponse.bind(this), recreationData);
        addApiCall('publicServicesWeight', this.getPublicServicesResponse.bind(this), publicServicesData);
        addApiCall('crimeRateWeight', this.getCrimeResponse.bind(this), crimeData);
        addApiCall('sceneryWeight', this.getSceneryResponse.bind(this), sceneryData);
        addApiCall('airQualityWeight', this.getAirQualityResponse.bind(this), airQualityData);
        addApiCall('costOfLivingWeight', this.getHousingResponse.bind(this), housingData);
        try {
            let responses = await Promise.allSettled(Object.values(apiPromises));
            let processedResponses = {};
            Object.keys(apiPromises).forEach((key, index) => {
                const responseKey = key.replace('Weight', 'Response');
                const result = responses[index];
                if (result.status === 'fulfilled') {
                    processedResponses[responseKey] = result.value;
                }
                else {
                    processedResponses[responseKey] = null;
                }
            });
            const topTen = await this.scoreCities(processedResponses.jobOpportunityResponse, processedResponses.weatherResponse, processedResponses.recreationalActivitiesResponse, processedResponses.publicServicesResponse, processedResponses.crimeRateResponse, processedResponses.sceneryResponse, processedResponses.airQualityResponse, processedResponses.costOfLivingResponse, weights, recreationData, jobData);
            return {
                topTen
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
    parseSceneryData(data) {
        const { searchRadius, scenery } = data.data;
        return {
            searchRadius,
            scenery
        };
    }
    parseRecreationData(data) {
        const { recreationalInterests, searchRadius } = data.data;
        return {
            recreationalInterests,
            searchRadius
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
                    ...data
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
    async getSceneryResponse(data) {
        const sceneryService = this.app.service('scenery');
        try {
            const response = await sceneryService.find({
                query: {
                    scenery: data.scenery,
                    searchRadius: data.searchRadius
                }
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the scenery service:', error);
            throw new Error('Unable to fetch data from scenery service.');
        }
    }
    async getAirQualityResponse() {
        const airQualityService = this.app.service('air-quality');
        try {
            const response = await airQualityService.find({
                query: {}
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the air quality service:', error);
            throw new Error('Unable to fetch data from air quality service.');
        }
    }
    async getCrimeResponse() {
        const crimeService = this.app.service('crime');
        try {
            const response = await crimeService.find({
                query: {}
            });
            return response;
        }
        catch (error) {
            console.error('Error querying the crime service:', error);
            throw new Error('Unable to fetch data from crime service.');
        }
    }
    async getCityDetails(cities, recreation, job) {
        let { recreationalInterests, searchRadius } = recreation;
        if (typeof recreationalInterests === 'string') {
            recreationalInterests = [recreationalInterests];
        }
        const { selectedJobs } = job;
        // Get the raw city details
        const cityDetailsRaw = await this.sequelize.models.City.findAll({
            where: {
                city_id: cities.map((city) => city.city_id)
            },
            include: [
                {
                    model: this.sequelize.models.CrimeStatsCity
                },
                {
                    model: this.sequelize.models.CityDemographics
                },
                {
                    model: this.sequelize.models.PublicServiceCache
                },
                {
                    model: this.sequelize.models.CityMonthlyWeatherCounty
                },
                {
                    model: this.sequelize.models.HomePrice
                },
                {
                    model: this.sequelize.models.MonthlyRentCities
                },
                {
                    model: this.sequelize.models.Area,
                    attributes: ['area_title'],
                    include: [{ model: this.sequelize.models.State }, { model: this.sequelize.models.AirQuality }]
                },
                {
                    model: this.sequelize.models.County,
                    attributes: ['county_name']
                }
            ]
        });
        const areaCodes = cityDetailsRaw.map((cityDetail) => cityDetail.area_code);
        const jobData = await this.sequelize.models.CityIndustrySalary.findAll({
            where: {
                area_code: { [sequelize_1.Op.in]: areaCodes },
                occ_code: { [sequelize_1.Op.in]: selectedJobs.map((job) => job.occ_code) }
            }
        });
        const jobDataByCity = jobData.reduce((acc, job) => {
            if (!acc[job.area_code]) {
                acc[job.area_code] = [];
            }
            acc[job.area_code].push(job);
            return acc;
        }, {});
        const landmarkTypes = (Array.isArray(recreationalInterests) ? recreationalInterests : [recreationalInterests]).flatMap((interest) => RecreationalInterestMappings[interest]);
        const landmarks = await this.sequelize.models.LandMarks.findAll({
            where: { Type: landmarkTypes }
        });
        const cityDetailsPromises = cityDetailsRaw.map(async (city) => {
            const { Latitude: cityLatitude, Longitude: cityLongitude } = city;
            const landmarkPromises = landmarks.map(async (landmark) => {
                const distance = await this.calculateDistance(cityLatitude, cityLongitude, landmark.Latitude, landmark.Longitude);
                return distance <= searchRadius ? landmark : null;
            });
            const cityJobs = jobDataByCity[city.area_code] || [];
            const nearbyLandmarks = (await Promise.all(landmarkPromises)).filter((l) => l !== null);
            return {
                score: cities.find((c) => c.city_id === city.city_id)?.score,
                city_id: city.city_id,
                city_name: city.city_name,
                county_name: city.County?.county_name,
                state_name: city.Area?.State.state,
                latitude: cityLatitude,
                longitude: cityLongitude,
                Population: {
                    pop_2020: city.pop_2020,
                    pop_2021: city.pop_2021,
                    pop_2022: city.pop_2022
                },
                AirQuality: city.Area?.AirQuality,
                CityDemographics: city.CityDemographic,
                PublicServices: city.PublicServiceCache,
                Crime: city.CrimeStatsCity,
                HomePrice: city.HomePrices,
                MonthlyRent: city.MonthlyRentCities,
                Jobs: cityJobs,
                Weather: city.CityMonthlyWeatherCounties,
                Recreation: nearbyLandmarks.map((landmark) => ({
                    Location: landmark.Location,
                    Type: landmark.Type,
                    Latitude: landmark.Latitude,
                    Longitude: landmark.Longitude
                }))
            };
        });
        const cityDetails = await Promise.all(cityDetailsPromises);
        const sortedCities = cityDetails.sort((a, b) => b.score - a.score);
        return sortedCities;
    }
    async calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
                Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in kilometers
        return d * 0.621371; // Convert to miles
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