module.exports = function(sequelize, dataTypes) {
    let alias = "Desk";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true  
        },
        area_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        status_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        pc: {
            type: dataTypes.INTEGER(10).UNSIGNED
        }
        
    }
    let config = {
        tableName: "desk",
        timestamps: false,
        underscored: true
    }
    
    let Desk = sequelize.define(alias, cols, config);

    Desk.associate = function(models) {
        Desk.belongsTo(models.Area, {
            as: "areas",
            foreignKey: "area_id"
        }),
        Desk.belongsTo(models.DeskStatus, {
            as: "status",
            foreignKey: "status_id"
        })
    }
    

    return Desk;
}