module.exports = (sequelize, DataTypes) => {
    const Infant = sequelize.define('infant', {
        babyname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contactnumber: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Infant;
} 