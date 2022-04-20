const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');
//const buildStudentViewFromCourses = require('../Schema/buildStudentViewFromCourses');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class UserProfileController {
    constructor() {
        console.log('Constructor of UserProfileController is called.');
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


}

module.exports = UserProfileController;