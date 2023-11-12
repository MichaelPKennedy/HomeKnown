"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const logger_1 = require("./logger");
// Heroku dynamically assigns a port via process.env.PORT
const port = process.env.PORT || app_1.app.get('port');
const host = app_1.app.get('host');
console.log('port2', port);
console.log(process.env);
console.log('test');
process.on('unhandledRejection', (reason) => {
    logger_1.logger.error('Unhandled Rejection %O', reason);
});
console.log('port', port);
console.log(process.env);
app_1.app.listen(port, () => {
    logger_1.logger.info(`Feathers app listening on http://${host}:${port}`);
});
//# sourceMappingURL=index.js.map