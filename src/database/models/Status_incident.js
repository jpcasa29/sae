module.exports = function(sequelize, dataTypes) {
    let alias = "Status_incident";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }
    let config = {
        tableName: "status_incident",
        timestamps: false,
        underscored: true
    }
    
    let Status_incident = sequelize.define(alias, cols, config);
    
    Status_incident.associate = function(models) {
        Status_incident.hasMany(models.Incident, {
            as: "status",
            foreignKey: "status_id"
        })
    }
    

    return Status_incident;
}