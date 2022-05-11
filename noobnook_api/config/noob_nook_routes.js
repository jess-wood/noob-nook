const Authorize = require('../app/Middleware/Authorize.js');
const VerifyJWT = require('../app/Middleware/VerifyJWT.js');


/*
|--------------------------------------------------------------------------
| Default router
|--------------------------------------------------------------------------
|
| Default router is used to define any routes that don't belong to a
| controller. Also used as a parent container for the other routers.
|
*/
const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', function (ctx) {
    console.log('router.get(/)');
    return ctx.body = 'What is up noobs?';
});

/*
|--------------------------------------------------------------------------
| login router
|--------------------------------------------------------------------------
*/

// Login Route
const LoginController = new (require('../app/Controllers/LoginController.js'))();
const loginRouter = require('koa-router')({
    prefix: '/login'
});
loginRouter.get('/:username/:password', LoginController.authorizeUser, (err) => console.log("routers.js: loginRouter error:", err));
loginRouter.get('/:username/:pw/:email/:date/signUp', LoginController.userSignUp);
loginRouter.get('/:username/add-highscores/add-row', LoginController.userHighScores);



//User Profile Route
const UserProfileController = new (require('../app/Controllers/UserProfileController.js'))();
const userProfileRouter = require('koa-router')({
    prefix: '/userprofile'
});
userProfileRouter.get('/:username/username', UserProfileController.userData);
userProfileRouter.get('/:username/posts', UserProfileController.userPosts);
userProfileRouter.get('/all-users', UserProfileController.allUsernames);
userProfileRouter.get('/:newRank/:username/change-rank', UserProfileController.changeRank);



//Follow Route
const FollowController = new (require('../app/Controllers/FollowController.js'))();
const followRouter = require('koa-router')({
    prefix: '/follow'
});

followRouter.get('/:username/:userFollow/follow', FollowController.followUser);
followRouter.get('/:username/allFollowings', FollowController.allFollowings);
followRouter.get('/:username/:userUnfollow/unfollow', FollowController.unfollowUser);



//Post Route
const PostsController = new (require('../app/Controllers/PostsController.js'))();
const postsRouter = require('koa-router')({
    prefix: '/posts'
});

postsRouter.get('/:newContent/:date/:username/:oldContent/update-post', PostsController.updateUserPost);
postsRouter.get('/:username/:postContent/:date/new-post', PostsController.userPost);
postsRouter.get('/:username/:postContent/delete-post', PostsController.deleteUserPost);

//High Scores Route
const HighScoresController = new (require('../app/Controllers/HighScoresController.js'))();
const highScoresRouter = require('koa-router')({
    prefix: '/high-scores'
});

highScoresRouter.get('/:game/:username/get-score', HighScoresController.getHighScoreByGame);
highScoresRouter.get('/:username/get-lo', HighScoresController.getHighScoreLO);
highScoresRouter.get('/:username/get-tetris', HighScoresController.getHighScoreTetris);
highScoresRouter.get('/:username/get-space', HighScoresController.getHighScoreSpace);
highScoresRouter.get('/:username/get-wpm', HighScoresController.getHighScoreTyping);
highScoresRouter.get('/:username/get-wordle', HighScoresController.getHighScoreWordle);
highScoresRouter.get('/:username/get-wordleMinSec', HighScoresController.getHighScoreWordleMinSec);
highScoresRouter.get('/:username/get-snake', HighScoresController.getHighScoreSnake);
highScoresRouter.get('/:username/get-match', HighScoresController.getHighScoreMemory);
highScoresRouter.get('/:username/get-connect4', HighScoresController.getHighScoreConnect4);
highScoresRouter.get('/:score/:username/score-wordle', HighScoresController.postNewHighScoreWordle);
highScoresRouter.get('/:score/:username/score-space', HighScoresController.postNewHighScoreSpace);
highScoresRouter.get('/:score/:username/score-snake', HighScoresController.postNewHighScoreSnake);
highScoresRouter.get('/:score/:username/score-wpm', HighScoresController.postNewHighScoreTyping);
highScoresRouter.get('/:score/:username/score-match', HighScoresController.postNewHighScoreMatching)
highScoresRouter.get('/:score/:username/score-lo', HighScoresController.postNewHighScoreLO);
highScoresRouter.get('/:score/:username/score-tetris', HighScoresController.postNewHighScoreTetris);
highScoresRouter.get('/:score/:username/score-wordleMin', HighScoresController.postNewHighScoreWordleMin);
highScoresRouter.get('/:score/:username/score-wordleSec', HighScoresController.postNewHighScoreWordleSec);
highScoresRouter.get('/:score/:username/score-connect4', HighScoresController.postNewHighScoreConnect4);

const DashboardController = new (require('../app/Controllers/DashboardController.js'))();
const dashboardRouter = require('koa-router')({
    prefix: '/dashboard'
});

dashboardRouter.get('/:username/followed-users', DashboardController.followedUsers);
dashboardRouter.get('/:username/user-highscores', DashboardController.currentUserHighScores);
dashboardRouter.get('/:username/:followed_username/followed-posts', DashboardController.followedUsersPost);


//Settings Route
const SettingsController = new (require('../app/Controllers/SettingsController.js'))();
const settingsRouter = require('koa-router')({
    prefix: '/settings'
});
settingsRouter.get('/:username/username', SettingsController.userData);
settingsRouter.get('/:newEmail/:username/change-email', SettingsController.changeEmail);
settingsRouter.get('/:newlName/:username/change-lastName', SettingsController.changeLastName);
settingsRouter.get('/:newfName/:username/change-firstName', SettingsController.changeFirstName);
settingsRouter.get('/:newPW/:username/change-password', SettingsController.changeUserPassword);
settingsRouter.get('/:newUsername/:oldUsername/change-username', SettingsController.changeUsername);
settingsRouter.get('/:newUsername/:oldUsername/change-usernameHS', SettingsController.changeUsernameHS);
settingsRouter.get('/:newPic/:name/:username/change-profile-pic', SettingsController.changeProfilePic);

/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    userProfileRouter.routes(),
    followRouter.routes(),
    highScoresRouter.routes(),
    postsRouter.routes(),
    dashboardRouter.routes(),
    settingsRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
