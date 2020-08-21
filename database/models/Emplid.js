module.exports = (sequelize, dataTypes) => {
    let alias = "Emplid"
    let cols = {
        legajo: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        country_id: {
            type: dataTypes.INTEGER(11)
            
        }
    }
    let config = {
        tableName: "emplid",
        timestamps: false,
        underscored: true
    }
    const Emplid = sequelize.define(alias, cols, config);

    return Emplid;

}