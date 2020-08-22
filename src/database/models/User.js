module.exports = function(sequelize, dataTypes) {
    let alias = "User";
    let cols = {
        email: {
            type: dataTypes.STRING(255),
            primaryKey: true,
            allowNull: false,
            unique: true
        },
        username: {
            type: dataTypes.STRING(30),
            allowNull: false,
            unique: true
        },
        password: {
            type: dataTypes.STRING(255),
            allowNull: false
        },
        status: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        first_name: {
            type: dataTypes.STRING(50)
        },
        last_name: {
            type: dataTypes.STRING(50)
        },
        birth_date: {
            type: dataTypes.DATEONLY
        },
        
        type_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        },
        cambiopass: {
            type: dataTypes.INTEGER(11),
            allowNull: false
        }
        
    }
    let config = {
        tableName: "user",
        timestamps: false,
        underscored: true
    }
    
    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.belongsTo(models.Type, {
            as: "types",
            foreignKey: "type_id"
        }),
        User.hasMany(models.Incident, {
            as: "incident",
            foreignKey: "user_id"
        })
    }
    

    return User;
}