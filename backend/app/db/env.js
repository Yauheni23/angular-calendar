const env = {
  database: 'calendar_dev',
  username: 'admin',
  password: 'password',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 5,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;
