const db = require('../database/models');
const Movie = require('../database/models/Movie');
const moment = require('moment');
const { validationResult } = require('express-validator');

module.exports = {
    list: (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                return res.render('moviesList', {
                    movies
                })
            })
            .catch(error => console.log(error))
    },
    detail: (req, res) => {
        const { id } = req.params;
        db.Movie.findByPk(id)
            .then(movie => {
                return res.render('moviesDetail', {
                    movie
                })
            })
            .catch(error => console.log(error))
    },
    new: (req, res) => {
        db.Movie.findAll({
            order: [
                ['release_date', 'DESC']
            ]
        }).then(movies => {
            return res.render('newestMovies', {
                movies

            })
        })
            .catch(error => console.log(error))
    },
    recomended: (req, res) => {
        db.Movie.findAll({
            order: [
                ['rating', 'DESC'],
            ]
        }).then(movies => {
            return res.render('recommendedMovies', {
                movies

            })
        })
            .catch(error => console.log(error))
    },
    add: function (req, res) {
        // TODO   
        return res.render('moviesAdd')
    },
    create: function (req, res) {
        // TODO
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('moviesAdd', {
                errors: errors.mapped(),
                old: req.body
            });
        }
        const { title, rating, release_date, awards, length, genre_id } = req.body;
        db.Movie.create({
            title: title.trim(),
            rating,
            awards,
            release_date,
            length,
            genre_id
        })
            .then(movie => {
                console.log(movie);
                return res.redirect('/movies')
            })
            .catch(error => console.log(error))
    },
    edit: function (req, res) {
        // TODO
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                console.log(moment(movie.release_date).format('YYYY-MM-DD'));
                return res.render('moviesEdit', {
                    Movie: movie,
                    moment
                })
            })
            .catch(error => console.log(error))
    },
    update: function (req, res) {
        // TODO
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            req.body.id = req.params.id;
            return res.render('moviesEdit', {
                errors: errors.mapped(),
                Movie: req.body,
                moment
            })
        }
        const { title, rating, release_date, awards, length, genre_id } = req.body;
        db.Movie.update(
            {
                title: title.trim(),
                rating,
                awards,
                release_date,
                length,
                genre_id
            },
            {
                where: {
                    id: req.params.id
                }
            }
        ).then(response => {
            console.log(response);
            db.Movie.findByPk(req.params.id)
                .then(movie => {
                    return res.render('moviesDetail', {
                        movie
                    })
                })

        })
            .catch(error => console.log(error))
    },
    delete: function (req, res) {
        // TODO
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                return res.render('moviesDelete', {
                    Movie: movie
                });
            })
            .catch(error => console.log(error))
    },
    destroy: function (req, res) {
        // TODO
        const { id } = req.params

        db.ActorMovie.destroy({
            where: {
                movie_id: id
            }
        })
            .then(response => {
                console.log(response);

                db.Actor.update(
                    {
                        favorite_movie_id: null
                    }, {
                    where: {
                        favorite_movie_id: id
                    }
                }
                )
                    .then(response => {
                        console.log(response);
                        db.Movie.destroy({
                            where: {
                                id
                            }
                        })
                            .then(response => {
                                console.log(response);
                                return res.redirect('/movies')
                            })
                    })
            }).catch(error => console.log(error))
    },
};
