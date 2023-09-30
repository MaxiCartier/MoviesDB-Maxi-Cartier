module.exports = (sequelize, dataTypes) => {

    const alias = "Actor";
    const cols = {

        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        first_name : {
            type : dataTypes.STRING
        },
        last_name : {
            type : dataTypes.STRING
        },
        rating : {
            type : dataTypes.DECIMAL,
            
        },
        favorite_movie_id : {
            type : dataTypes.INTEGER
        }
       
    }

    const config = {
        tableName : "actors",
        timestamps : true, // si no tiene marca de tiempo debe ir en false
        underscored : true // si las marcas de tiempo estan escritas con un guion bajo"_"
    }
    const Actor = sequelize.define(alias,cols,config);
    return Actor
}
