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

    // Update contents of the User's Profile
    async updateUserProfile(ctx){

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

    async addUserProfilePicture(ctx){
        const express = require("express");
        const multer = require("multer");
        const cors = require("cors");

        const app = express();


        app.use(cors());
        app.use(express.static("../../../src/Pages/UserProfile/"));


        var storage = multer.diskStorage({

            destination: "../../../src/Pages/UserProfile/UsersPictures",
            filename: function (req, file, cb) {
                cb(null, Date.now() + '-' +file.originalname )
            }
        })



        var upload = multer({ storage: storage }).array('file');


        app.post('/upload',function(req, res) {

            upload(req, res, function (err) {
                if (err instanceof multer.MulterError) {
                    return res.status(500).json(err)
                } else if (err) {
                    return res.status(500).json(err)
                }
                return res.status(200).send(req.file)

            })

        });
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
