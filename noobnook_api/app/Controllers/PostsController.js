const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
//const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class PostsController {
    constructor() {
        console.log('Constructor of UserProfileController is called.');
    }

    async allFollowings(ctx) {
        console.log('allFollowings called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT username_follower FROM users_followers
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in FollowController::allFollowings", error);
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

    async followUser(ctx) {
        console.log('followUser called.');
        return new Promise((resolve, reject) => {
            const query = `
                       INSERT INTO 
                        users_followers
                        VALUES (?,?)
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username, ctx.params.userFollow]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in FollowController::followUser", error);
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

    async unfollowUser(ctx) {
        console.log('unfollowUser called.');
        return new Promise((resolve, reject) => {
            const query = `
                       DELETE FROM users_followers
                        WHERE
                            username = ? AND username_follower = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username, ctx.params.userUnfollow]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in FollowController::unfollowUser", error);
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

module.exports = PostsController;