module.exports = function(sequelize, dataTypes) {
    let alias = "Area";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        location_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
    }
    let config = {
        tableName: "areas",
        timestamps: false,
        underscored: true
    }
    
    let Area = sequelize.define(alias, cols, config);
    
    Area.associate = function(models) {
        Area.belongsTo(models.Locations, {
            as: "locations",
            foreignKey: "location_id"
        })
    }
    

    return Area;
}