import * as Sequelize from 'sequelize';
import * as config from '../config';

export default new Sequelize(config.DB_URL, { logging: false });
