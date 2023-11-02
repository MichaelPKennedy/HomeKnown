"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecreationService = void 0;
const turf_1 = require("@turf/turf");
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
        const cities = await this.sequelize.models.City.findAll({
            include: [
                {
                    model: this.sequelize.models.Area,
                    required: true,
                    attributes: ['area_code'],
                    include: [
                        {
                            model: this.sequelize.models.State,
                            required: true,
                            attributes: ['state']
                        }
                    ]
                }
            ]
        });
        const cityRankings = [];
        cities.forEach((city) => {
            let closestDistance = Infinity;
            let landmarkCount = 0;
            const nearbyLandmarks = [];
            landmarks.forEach((landmark) => {
                const from = (0, turf_1.point)([city.Latitude, city.Longitude]);
                const to = (0, turf_1.point)([landmark.Latitude, landmark.Longitude]);
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
        // Sort cities by number of landmarks and then by proximity, and limit to top 10
        const topCities = cityRankings
            .sort((a, b) => b.landmarkCount - a.landmarkCount || a.closestDistance - b.closestDistance)
            .slice(0, 10)
            .map((entry) => ({ city: entry.city, nearbyLandmarks: entry.nearbyLandmarks }));
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