import db from './db';

export default db.define('user', {
  name: db.Sequelize.STRING,
});
