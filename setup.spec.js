const sinon = require('sinon');
const chai = require('chai');
const chaiSubset = require('chai-subset');
const sinonChai = require("sinon-chai");
const Logger = require('./lib/logger/Logger.js');
const Database = require('../lib/database/Database.js');
const { clearDatabase } = require('./testUtils.js');

chai.use(sinonChai);
chai.use(chaiSubset);

global.expect = chai.expect;
global.sinon = sinon;

Logger.prototype.info = sinon.stub();
Logger.prototype.warn = sinon.stub();
Logger.prototype.error = sinon.stub();
Logger.prototype.fromError = sinon.stub();

beforeEach(async () => {
    sinon.restore();
    await clearDatabase(Database.getInstance());
});

afterEach(async () => {
    sinon.restore();
    await clearDatabase(Database.getInstance());
});


