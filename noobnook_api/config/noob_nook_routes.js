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
console.log("under loginRouter");


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

followRouter.get('/:username/:userFollow', FollowController.followUser);

/**
 * Register all of the controllers into the default controller.
 */
router.use(
    '',
    loginRouter.routes(),
    userProfileRouter.routes(),
    followRouter.routes()
);

module.exports = function (app) {
    app.use(router.routes());
    app.use(router.allowedMethods());
};