"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecreationService = void 0;
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
function haversineDistance(lat1, lon1, lat2, lon2) {
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
class RecreationService {
    constructor(app, sequelizeClient) {
        this.app = app;
        this.sequelize = sequelizeClient;
    }
    async find(params) {
        const { recreationalInterests } = params.query;
        const landmarkTypes = (Array.isArray(recreationalInterests) ? recreationalInterests : [recreationalInterests]).flatMap((interest) => RecreationalInterestMappings[interest]);
        const landmarks = await this.sequelize.models.LandMarks.findAll({
            where: { Type: landmarkTypes }
        });
        const cities = await this.sequelize.models.City.findAll({});
        const cityRankings = [];
        cities.forEach((city) => {
            let closestDistance = Infinity;
            let landmarkCount = 0;
            const nearbyLandmarks = [];
            landmarks.forEach((landmark) => {
                const currentDistance = haversineDistance(city.Latitude, city.Longitude, landmark.Latitude, landmark.Longitude);
                if (currentDistance < closestDistance) {
                    closestDistance = currentDistance;
                }
                if (currentDistance <= 50) {
                    landmarkCount++;
                    nearbyLandmarks.push(landmark);
                }
            });
            if (landmarkCount > 0) {
                cityRankings.push({ city, closestDistance, landmarkCount, nearbyLandmarks });
            }
        });
        cityRankings.sort((a, b) => b.landmarkCount - a.landmarkCount || a.closestDistance - b.closestDistance);
        let ranking = 1;
        let previousLandmarkCount = 0;
        let tieRank = 1;
        const rankedCities = cityRankings.map((entry, index) => {
            if (previousLandmarkCount !== entry.landmarkCount) {
                previousLandmarkCount = entry.landmarkCount;
                ranking = tieRank;
            }
            tieRank++;
            return {
                ...entry,
                ranking
            };
        });
        const topCities = rankedCities.slice(0, 300).map((entry) => ({
            city_id: entry.city.city_id,
            ranking: entry.ranking,
            nearbyLandmarks: entry.nearbyLandmarks
        }));
        if (topCities.length < 10) {
            console.log('Obtained less than 10 cities for recreation');
        }
        return topCities;
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
exports.RecreationService = RecreationService;
//# sourceMappingURL=recreation.class.js.map