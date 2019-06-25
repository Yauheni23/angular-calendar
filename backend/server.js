const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./app/router')(app);

app.listen(3000, () => {
    console.log('App listening on port 3000!');
});

// const db = require('./app/db/db.config.js');
//
// db.sequelize.sync({force: true}).then(() => {
// 	console.log('Drop and Resync with { force: true }');
// });
