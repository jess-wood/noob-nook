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

    async updateUserPost(ctx) {
        //function to update a user post
        console.log("update post called");
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_post
                        SET
                            post_content = ?, date_created = ?
                        WHERE username_user_post = ? AND post_content = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newContent, ctx.params.date, ctx.params.username, ctx.params.oldContent]
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

    async userPost(ctx) {
        //function to create a post for a given user
        return new Promise((resolve, reject) => {
            const query = `
                       INSERT INTO 
                        user_post
                        VALUES (?,?,?)
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username, ctx.params.postContent, ctx.params.date]
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

    async deleteUserPost(ctx) {
       //used to delete a users post, possible use: upon finishing a game delete post "user is playing..."
        console.log("in delete post");
        return new Promise((resolve, reject) => {
            const query = `
                       DELETE FROM user_post
                        WHERE
                            username_user_post = ? AND post_content = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username, ctx.params.postContent]
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