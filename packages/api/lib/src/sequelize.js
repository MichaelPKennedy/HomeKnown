"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeService = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelizeService = (app) => {
    const sequelize = new sequelize_typescript_1.Sequelize({
        ...app.get('sequelize'),
        models: [__dirname + '/models'] // This tells Sequelize where to find your models
    });
    app.set('sequelizeClient', sequelize);
};
exports.sequelizeService = sequelizeService;
//# sourceMappingURL=sequelize.js.map