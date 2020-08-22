module.exports = function(sequelize, dataTypes) {
    let alias = "Incident";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        description: {
            type: dataTypes.STRING(2000),
            allowNull: false
        },
        type_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        user_id: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        created_date: {
            type: dataTypes.DATEONLY
        },
        
        status_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        deadline: {
            type: dataTypes.DATEONLY
        },
        closing_date: {
            type: dataTypes.DATEONLY
        },
        userclose_id: {
            type: dataTypes.STRING(100)
        },
        resolution: {
            type: dataTypes.STRING(2000)
        }
        
    }
    let config = {
        tableName: "incident",
        timestamps: false,
        underscored: true
    }
    
    let Incident = sequelize.define(alias, cols, config);

    Incident.associate = function(models) {
        Incident.belongsTo(models.Type_incident, {
            as: "types",
            foreignKey: "type_id"
        }),
        Incident.belongsTo(models.Status_incident, {
            as: "status",
            foreignKey: "status_id"
        }),
        Incident.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
    }
    

    return Incident;
}