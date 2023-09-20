module.exports = (sequelize, dataTypes) => {

    const alias = "Genre";
    const cols = {

        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        name : {
            type : dataTypes.STRING(100),
            allowNull : false
        },
        ranking : {
            type : dataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            unique : true,
        },
       /* created_at : {
            type : dataTypes.DATE,
            allowNull : false
        },
        update_at : {
            type : dataTypes.DATE,
            allowNull : false
        },*/
        active : {
            type : dataTypes.BOOLEAN,
            allowNull: false,
            defaultValue : 1
        }
    }

    const config = {
        tableName : "genres",
        timestamps : true, // si no tiene marca de tiempo debe ir en false
        underscored : true // si las marcas de tiempo estan escritas con un guion bajo"_"
    }
    const Genre = sequelize.define(alias,cols,config);
    return Genre
}
