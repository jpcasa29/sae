module.exports = function(sequelize, dataTypes) {
    let alias = "Used";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true  
        },
        reservation_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        checkin: {
            type: dataTypes.DATE
        },
        checkout: {
            type: dataTypes.DATE
        }
        
        
    }
    let config = {
        tableName: "used",
        timestamps: false,
        underscored: true
    }
    
    let Used = sequelize.define(alias, cols, config);

    Used.associate = function(models) {
        Used.belongsTo(models.Reservation, {
            as: "reservations",
            foreignKey: "reservation_id"
        })
    }
    

    return Used;
}