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



//User Profile Route
const UserProfileController = new (require('../app/Controllers/UserProfileController.js'))();
const userProfileRouter = require('koa-router')({
    prefix: '/userprofile'
});
userProfileRouter.get('/:username/username', UserProfileController.userData);
userProfileRouter.get('/:username/posts', UserProfileController.userPosts);
userProfileRouter.get('/all-users', UserProfileController.allUsernames);



//Follow Route
const FollowController = new (require('../app/Controllers/FollowController.js'))();
const followRouter = require('koa-router')({
    prefix: '/follow'
});

followRouter.get('/:username/:userFollow/follow', FollowController.followUser);
followRouter.get('/:username/allFollowings', FollowController.allFollowings);
followRouter.get('/:username/:userUnfollow/unfollow', FollowController.unfollowUser);



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
highScoresRouter.get('/:score/:username/score-wordle', HighScoresController.postNewHighScoreWordle);
highScoresRouter.get('/:score/:username/score-space', HighScoresController.postNewHighScoreSpace);
highScoresRouter.get('/:score/:username/score-snake', HighScoresController.postNewHighScoreSnake);
highScoresRouter.get('/:score/:username/score-wpm', HighScoresController.postNewHighScoreTyping);
highScoresRouter.get('/:score/:username/score-lo', HighScoresController.postNewHighScoreLO);
highScoresRouter.get('/:score/:username/score-tetris', HighScoresController.postNewHighScoreTetris);
highScoresRouter.get('/:score/:username/score-wordleMin', HighScoresController.postNewHighScoreWordleMin);
highScoresRouter.get('/:score/:username/score-wordleSec', HighScoresController.postNewHighScoreWordleSec);


/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    userProfileRouter.routes(),
    followRouter.routes(),
    highScoresRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};