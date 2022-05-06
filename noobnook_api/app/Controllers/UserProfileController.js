const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');


class UserProfileController {
    constructor() {
        console.log('Constructor of UserProfileController is called.');
    }

    async userData(ctx) {
        console.log('userData called.');
        return new Promise((resolve, reject) => {
            const query = `
                       select *, DATE_FORMAT(dateJoined, '%m/%d/%Y') from users u, user_highscores h 
                       where u.username = h.username and u.username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in UserProfileController::userData", error);
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

    async userPosts(ctx) {
        console.log('userPostsCalled');
        return new Promise((resolve, reject) => {
            const query = `
                       select username_user_post, post_content, DATE_FORMAT(date_created, '%m/%d/%Y'), cast(date_created as time) from user_post
                       where username_user_post = ? ORDER BY date_created DESC
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in UserProfileController::userPost", error);
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

    async allUsernames(ctx) {
        console.log('all usernames called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT username FROM users
                        `;
            dbConnection.query({
                sql: query,
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in UserProfileController::usernames", error);
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

    async changeRank(ctx) {
        console.log("changeRank called");
        return new Promise((resolve, reject) => {
            const query = `UPDATE users
                            SET user_rank = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newRank, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changeRank", error);
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

module.exports = UserProfileController;