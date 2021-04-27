const User = require("./user");
const Infant = require("./infant");
const Care = require("./care");

//Associations
Infant.hasOne(User);
User.belongsTo(Infant);
User.hasMany(Care);
Care.belongsTo(User);

module.exports = {
    User,
    Infant,
    Care,
};