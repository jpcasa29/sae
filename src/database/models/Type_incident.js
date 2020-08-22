module.exports = function(sequelize, dataTypes) {
    let alias = "Type_incident";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        time_resolution: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    let config = {
        tableName: "type_incident",
        timestamps: false,
        underscored: true
    }
    
    let Type_incident = sequelize.define(alias, cols, config);
    
    Type_incident.associate = function(models) {
        Type_incident.hasMany(models.Incident, {
            as: "incident",
            foreignKey: "type_id"
        })
    }
    

    return Type_incident;
}