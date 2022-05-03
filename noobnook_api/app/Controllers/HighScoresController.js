const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class HighScoresController {
    constructor() {
        console.log('Constructor of HighScoresController is called.');
    }

    async getHighScoreByGame(ctx) {
        //console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT ? FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.game, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::allFollowings", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async getHighScoreLO(ctx) {
        //console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_LightsOut FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::LOHS", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }
    async getHighScoreTetris(ctx) {
        //console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_Tetris FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::Tetris", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async getHighScoreSpace(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_SpaceGame FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::Space", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                console.log(JSON.stringify(tuples));
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async getHighScoreWordle(ctx) {
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_Wordle FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::Wordle", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async getHighScoreWordleMinSec(ctx) {
        //console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_WordleMinInt, HS_WordleSecInt FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::WordleMinSec", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async getHighScoreTyping(ctx) {
        //console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_Typing FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::Typing", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async getHighScoreMemory(ctx) {
        //console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_matching FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::Typing", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async getHighScoreSnake(ctx) {
        //console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT HS_Snake FROM user_highscores
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::Snake", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreTyping(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_Typing = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreWPM", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreMatching(ctx) {
        //console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_matching = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreMatching", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreWordle(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_Wordle = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreWordle", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }


    async postNewHighScoreSpace(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_SpaceGame = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreSpace", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreTetris(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_Tetris = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreTetris", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreSnake(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_Snake = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreSnake", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreLO(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_LightsOut = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreLO", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreWordleMin(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_WordleMinInt = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreWMin", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

    async postNewHighScoreWordleSec(ctx) {
        console.log('postNewHighScore called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_WordleSecInt = ?
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.score, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in HighScoresController::postNewHighScoreWSec", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }

}

module.exports = HighScoresController;
