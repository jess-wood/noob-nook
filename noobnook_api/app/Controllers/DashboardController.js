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
        console.log(`at the tom of followedUsersPost`, ctx.params.username, ctx.params.followed_username);
        return new Promise((resolve, reject) => {
            const query = `select username_user_post, post_content, date_created 
                            from user_post up, users_followers uf
                            where uf.username = ? and up.username_user_post = ? and username_follower = up.username_user_post
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username, ctx.params.followed_username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in DashboardController::followedUsersPosts", error);
                    ctx.body = [];
                    ctx.status = 200;
                    return reject(error);
                }
                ctx.body = tuples;
                console.log(`db return tuples ${JSON.stringify(tuples)}`);
                ctx.status = 200;
                return resolve();
            });
        }).catch(err => console.log("Database connection error.", err));
    }
}

module.exports = DashboardController;