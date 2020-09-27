module.exports = function(sequelize, dataTypes) {
    let alias = "Access";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true  
        },
        user_id: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        area_id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allowNull: false
        },
        
        
    }
    let config = {
        tableName: "access",
        timestamps: false,
        underscored: true
    }
    
    let Access = sequelize.define(alias, cols, config);

    Access.associate = function(models) {
        Access.belongsTo(models.User, {
            as: "users_access",
            foreignKey: "user_id"
        }),
        Access.belongsTo(models.Area, {
            as: "area_access",
            foreignKey: "area_id"
        })
    }
    

    return Access;
}