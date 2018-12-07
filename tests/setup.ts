import * as chai from 'chai';
import db from '../src/models/db';

chai.use(require('chai-http')); // tslint:disable-line no-var-requires Due to chai-http import bug

before(() => db.sync());
beforeEach(() => db.truncate());
