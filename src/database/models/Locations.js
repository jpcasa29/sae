module.exports = function(sequelize, dataTypes) {
    let alias = "Locations";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        address: {
            type: dataTypes.STRING(100),
            allowNull: false
        }
    }
    let config = {
        tableName: "location",
        timestamps: false,
        underscored: true
    }
    
    let Locations = sequelize.define(alias, cols, config);
    
    
    

    return Locations;
}