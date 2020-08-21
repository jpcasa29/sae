module.exports = function(sequelize, dataTypes) {
    let alias = "Type";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        load: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        response: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        admin: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
    }
    let config = {
        tableName: "type_user",
        timestamps: false,
        underscored: true
    }
    
    let Type = sequelize.define(alias, cols, config);
    
    Type.associate = function(models) {
        Type.hasMany(models.User, {
            as: "users",
            foreignKey: "type_id"
        })
    }
    

    return Type;
}