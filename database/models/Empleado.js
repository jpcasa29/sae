module.exports = (sequelize, dataTypes) => {
    let alias = "Empleado"
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true
        },
        legajo_id: {
            type: dataTypes.INTEGER(11)
            
        },
        nombres: {
            type: dataTypes.STRING(100)
        },
        apellidos: {
            type: dataTypes.STRING(100)
        },
        tipo_doc1: {
            type: dataTypes.BIGINT(100)
        },
        numero_doc1: {
            type: dataTypes.INTEGER(11)
        },
        tipo_doc2: {
            type: dataTypes.BIGINT(100)
        },
        numero_doc2: {
            type: dataTypes.INTEGER(11)
        },
        fecha_nacimiento: {
            type: dataTypes.DATE
        },
        fecha_ingreso: {
            type: dataTypes.DATE
        },
        fecha_antiguedad: {
            type: dataTypes.DATE
        },
        estado: {
            type: dataTypes.STRING(100)
        },
        metodo_pago: {
            type: dataTypes.STRING(45)
        },
        cbu: {
            type: dataTypes.STRING(22)
        },
        posicion_id: {
            type: dataTypes.INTEGER(11)
        },
        obra_social_id: {
            type: dataTypes.INTEGER(11)
        },
        convenio_id: {
            type: dataTypes.INTEGER(11)
        },
        categoria_id: {
            type: dataTypes.INTEGER(11)
        },
        tipo_empleado_id: {
            type: dataTypes.INTEGER(11)
        },
        grupo_pago_id: {
            type: dataTypes.INTEGER(11)
        },
        base_horaria: {
            type: dataTypes.STRING(10)
        },
    }
    let config = {
        tableName: "empleados",
        timestamps: false,
        underscored: true
    }
    const Empleado = sequelize.define(alias, cols, config);

    return Empleado;

}