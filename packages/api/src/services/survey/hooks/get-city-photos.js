"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("@google-cloud/storage");
const getCityPhoto = async (context) => {
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS || '');
    const storage = new storage_1.Storage({ credentials: credentials });
    const bucketName = 'city-photos';
    const bucket = storage.bucket(bucketName);
    const cities = context.result?.topTen ?? [];
    for (const city of cities) {
        const prefix = `${city.city_id}-`;
        const [files] = await bucket.getFiles({ prefix, maxResults: 1 });
        if (files.length > 0) {
            const photoUrl = `https://storage.googleapis.com/${bucketName}/${files[0].name}`;
            city.photoUrl = photoUrl;
        }
        else {
            city.photoUrl = null;
        }
    }
    return context;
};
exports.default = getCityPhoto;
//# sourceMappingURL=get-city-photos.js.map