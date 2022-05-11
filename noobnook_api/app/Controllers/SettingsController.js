const dbConnection = require('../../database/mySQLconnect');
const dateFormat = require('dateformat');

function now() {
    return dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
}

class SettingsController {
    constructor() {
        console.log('Constructor of Settings called')
    }

    // Pull User Data
    async userData(ctx) {
        console.log('userData called.');
        return new Promise((resolve, reject) => {
            const query = `
                       SELECT *, DATE_FORMAT(dateJoined, '%m/%d/%Y') FROM users u, user_highscores h 
                       WHERE u.username = h.username AND u.username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::userData", error);
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

    async changeEmail(ctx) {
        console.log("changeEmail called");
        return new Promise((resolve, reject) => {
            const query = `UPDATE users
                            SET user_email = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newEmail, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changeEmail", error);
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

    async changeLastName(ctx) {
        console.log("changeLastName called");
        return new Promise((resolve, reject) => {
            const query = `UPDATE users 
                            SET user_lName = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newlName, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changeLastName", error);
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

    async changeFirstName(ctx) {
        console.log("changeFirstName called");
        return new Promise((resolve, reject) => {
            const query = `UPDATE users 
                            SET user_fName = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newfName, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changeFirstName", error);
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

    async changeUsername(ctx) {
        console.log("changeUsernames called ");

        return new Promise((resolve, reject) => {
            const query = `UPDATE users 
                            SET username = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newUsername, ctx.params.oldUsername]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changeUsername", error);
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

    async changeUsernameHS(ctx) {
        console.log("changeUsernames called ");

        return new Promise((resolve, reject) => {
            const query = `UPDATE user_highscores
                            SET username = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newUsername, ctx.params.oldUsername]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changeUsername", error);
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

    async changeUserPassword(ctx) {
        console.log("changePassword called");

        return new Promise((resolve, reject) => {
            const query = `UPDATE users
                            SET user_password = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.newPW, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changePassword", error);
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

    // Reset all scores to 0
    async resetAllScores(ctx){
        console.log('resetAllScores called.');
        return new Promise((resolve, reject) => {
            const query = `
                       UPDATE user_highscores
                        SET
                            HS_matching = 0,
                            HS_2048 = 0,
                            HS_LightsOut = 0,
                            HS_Tetris = 0,
                            HS_Wordle = '0m0s',
                            HS_Snake = 0,
                            HS_Checkers = 0,
                            HS_Connect4 = 0,
                            HS_Pong = 0,
                            HS_Typing = 0,
                            HS_SpaceGame = 0,
                            HS_WordleMinInt = 0,
                            HS_WordleSecInt = 0
                        WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::resetAllScores", error);
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

    // Delete User's Profile
    async deleteUserProfile(ctx){
        console.log('deleteUserProfile called.');
        return new Promise((resolve, reject) => {
            const query = `
                       DELETE FROM users
                       WHERE username = ?
                        `;
            dbConnection.query({
                sql: query,
                values: [ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::deleteUserProfile", error);
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

    async changeProfilePic(ctx) {
        const url = 'https://res.cloudinary.com/noobnook/image/upload/' + ctx.params.newPic + '/' + ctx.params.name;
        return new Promise((resolve, reject) => {
            const query = `UPDATE users
                            SET user_ProfilePic = ?
                            where username = ?
                            `;
            dbConnection.query({
                sql: query,
                values: [url, ctx.params.username]
            }, (error, tuples) => {
                if (error) {
                    console.log("Connection error in SettingsController::changePic", error);
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

module.exports = SettingsController;
