const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class DashboardController {
    constructor() {
        console.log('Constructor of FollowedPostsControlled is called.');
    }

    async followedUsers(ctx) {
        console.log("followedUsers called ");

        return new Promise((resolve, reject) => {
            const query = `select username_follower 
                            from users_followers 
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in DashboardController::followedUsers", error);
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

    async currentUserHighScores(ctx) {
        console.log("currentUserHighScores called");

        return new Promise((resolve, reject) => {
            const query = `select * 
                            from user_highscores 
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in DashboardController::currentUserHighScores", error);
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

    async followedUsersPost(ctx) {
        console.log("followedUserPost called");

        return new Promise((resolve, reject) => {
            const query = `select * 
                            from user_post 
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in DashboardController::followedUsersPosts", error);
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

module.exports = DashboardController;