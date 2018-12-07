import app from '../src/app';
import * as chai from 'chai';
import './setup';

export default () => chai.request(app);
