const dbConnection = require('../../database/mySQLconnect');
const setAccessToken = require('../../config/setAccessToken');


require('dotenv').config();

class LoginController {
    async authorizeUser(ctx) {
        //console.log(JSON.stringify(dbConnection));
        console.log("authorize user is being called");
        return new Promise((resolve, reject) => {

            // Right up here, you could inspect the provided uers_id to
            // make sure that it is, at the surface, a legitimate ID.
            // For example, if user ids are suppose to be email addresses,
            // you can at least make sure that user's input is consistent
            // with the format of email addresses.

            let query = "SELECT * FROM users WHERE username = ? AND user_password = ?";
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.username, ctx.params.password]
                }, (error, tuples) => {
                    if (error) {
                        console.log("Query error.", error);
                        return reject(`Query error. Error msg: error`);
                    }
                    if (tuples.length === 1) {  // Did we have a matching user record?
                        setAccessToken(ctx, tuples[0]);
                        console.log('from studentRecord. About to return ', tuples[0]);
                        ctx.body = {
                            status: "OK",
                            user: tuples[0],
                        };
                    } else {
                        console.log('Not able to identify the user.');
                        return reject('No such user.');
                    }
                    return resolve();
                }
            )
        }).catch(err => {
            console.log('authorize in LoginController threw an exception. Reason...', err);
            ctx.status = 200;
            ctx.body = {
                status: "Failed",
                error: err,
                user: null
            };
        });

    }

    async userSignUp(ctx) {
        console.log('userSignUpCalled.');
        return new Promise((resolve, reject) => {
            const query = `
                       INSERT INTO users (username, user_email, user_password, dateJoined, user_rank, user_ProfilePic)
                       VALUES (?,?,?,?,'N00blet','default.jpg')
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username, ctx.params.email, ctx.params.pw, ctx.params.date]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in LoginController::userSignUp", error);
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

    async userHighScores(ctx) {
        console.log('create HS row called.');
        return new Promise((resolve, reject) => {
            const query = `
                       INSERT INTO user_highscores (username, HS_matching, HS_2048, HS_LightsOut, HS_Tetris, HS_Wordle, HS_Snake, HS_Checkers, HS_Connect4, HS_Pong, HS_Typing, HS_SpaceGame, HS_WordleMinInt, HS_WordleSecInt)
                       VALUES (?,100,0,0,0,'0m0s',0,0,0,0,0,0,100,100)
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in LoginController::userSignUp", error);
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

module.exports = LoginController;