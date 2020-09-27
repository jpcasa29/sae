module.exports = function(sequelize, dataTypes) {
    let alias = "Reservation";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true  
        },
        desk_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        user_id: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        date: {
            type: dataTypes.DATE
            
        },
        status: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        }
        
    }
    let config = {
        tableName: "reservations",
        timestamps: false,
        underscored: true
    }
    
    let Reservation = sequelize.define(alias, cols, config);

    Reservation.associate = function(models) {
        Reservation.belongsTo(models.Desk, {
            as: "desks",
            foreignKey: "desk_id"
        }),
        Reservation.belongsTo(models.User, {
            as: "users",
            foreignKey: "user_id"
        })
    }
    

    return Reservation;
}