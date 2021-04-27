const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize('careshareinfant', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to careshareinfant postgres database.');
    },
    function(err) {
        console.log(err);
    }
);

let User = sequelize.import("./models/user");
let Infant = sequelize.import("./models/infant");
let Care = sequelize.import("./models/care");
//Associations
Infant.hasMany(User);
User.belongsTo(Infant);

User.hasMany(Care);
Care.belongsTo(User);

module.exports = sequelize;