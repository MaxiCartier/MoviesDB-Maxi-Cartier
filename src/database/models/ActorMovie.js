module.exports = (sequelize, dataTypes) => {

    const alias = "ActorMovie";
    const cols = {

        id : {
            type : dataTypes.INTEGER.UNSIGNED,
            primaryKey : true,
            allowNull : false,
            autoIncrement : true
        },
        movie_id : {
            type : dataTypes.INTEGER
        },
        actor_id : {
            type : dataTypes.INTEGER
        },
       
    }

    const config = {
        tableName : "actor_movie",
        timestamps : true, // si no tiene marca de tiempo debe ir en false
        underscored : true // si las marcas de tiempo estan escritas con un guion bajo"_"
    }
    const Actor = sequelize.define(alias,cols,config);
    return Actor
}
