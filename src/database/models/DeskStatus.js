module.exports = function(sequelize, dataTypes) {
    let alias = "DeskStatus";
    let cols = {
        id: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    }
    let config = {
        tableName: "desk_status",
        timestamps: false,
        underscored: true
    }
    
    let DeskStatus = sequelize.define(alias, cols, config);
    
    
    

    return DeskStatus;
}