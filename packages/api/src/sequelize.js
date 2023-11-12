"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeService = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const sequelizeService = (app) => {
    const sequelizeConfig = app.get('sequelize');
    const sequelize = new sequelize_typescript_1.Sequelize({
        ...sequelizeConfig,
        models: [__dirname + '/models']
    });
    app.set('sequelizeClient', sequelize);
};
exports.sequelizeService = sequelizeService;
//# sourceMappingURL=sequelize.js.map