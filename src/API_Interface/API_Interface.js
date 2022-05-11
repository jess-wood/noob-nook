import axios from 'axios';

const AxiosConfigured = () => {
    // Indicate to the API that all requests for this app are AJAX
    axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    // Set the baseURL for all requests to the API domain instead of the current domain
    // axios.defaults.baseURL = `http://localhost:8443/api/v1`;
    axios.defaults.baseURL = `http://localhost:8443/api/v1`;


    // Allow the browser to send cookies to the API domain (which include auth_token)
    axios.defaults.withCredentials = true;


//    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrf_token;

    return axios;
};


const axiosAgent = AxiosConfigured();

export default class APIInterface {

    async getUserInfo(username, password) {
        console.log("getUserInfo in API_interface called");
        return axiosAgent.get(`login/${username}/${password}`)
            .then(userInfo => userInfo.data)
            .catch(error => (
                {
                    error,
                    user: undefined
                }));
    }

    async getUserSignUp(username, password, email, date){
        return axiosAgent.get(`login/${username}/${password}/${email}/${date}/signUp`);
    }

    async createHSRow(username){
        return axiosAgent.get(`login/${username}/add-highscores/add-row`);
    }

    async userInfo(username){
        return axiosAgent.get(`userprofile/${username}/username`);
    }

    async userPost(username){
        return axiosAgent.get(`userprofile/${username}/posts`);
    }

    async allUsers(){
        return axiosAgent.get(`userprofile/all-users`);
    }

    async followUser(username, userFollow){
        return axiosAgent.get(`follow/${username}/${userFollow}/follow`);
    }

    async unfollowUser(username, userUnfollow){
        return axiosAgent.get(`follow/${username}/${userUnfollow}/unfollow`);
    }

    async allUserFollowings(username){
        return axiosAgent.get(`follow/${username}/allFollowings`);
    }

    async changeUserRank(newRank, username){
        return axiosAgent(`userprofile/${newRank}/${username}/change-rank`);
    }

    async getHighScoreByGame(game, username){ //does not work, must manually make for each game
        return axiosAgent.get(`high-scores/${game}/${username}/get-score`);
    }

    async getLOHS(username){
        return axiosAgent.get(`high-scores/${username}/get-lo`);
    }

    async getTetrisHS(username){
        return axiosAgent.get(`high-scores/${username}/get-tetris`);
    }

    async getSpaceHS(username){
        return axiosAgent.get(`high-scores/${username}/get-space`);
    }

    async getWordleMinSec(username){
        return axiosAgent.get(`high-scores/${username}/get-wordleMinSec`)
    }

    async getTypingHS(username){
        return axiosAgent.get(`high-scores/${username}/get-wpm`);
    }

    async getSnakeHS(username){
        return axiosAgent.get(`high-scores/${username}/get-snake`);
    }

    async get2048HS(username) {
        return axiosAgent.get(`high-scores/${username}/get-2048`);

    }
    
    async getMemoryHS(username){
        return axiosAgent.get(`high-scores/${username}/get-match`);
    }

    async getConnect4HS(username){
        return axiosAgent.get(`high-scores/${username}/get-connect4`);
    }
    
    async getPongHS(username){
        return axiosAgent.get(`high-scores/${username}/get-pong`);
    }

    async postNewHighScoreWPM(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wpm`);
    }

    async postNewHighScoreWordle(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wordle`);
    }

    async postNewHighScoreMemory(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-match`);
    }

    async postNewHighScoreSpace(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-space`);
    }

    async postNewHighScoreTetris(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-tetris`);
    }

    async postNewHighScoreSnake(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-snake`);
    }

    async postNewHighScoreLO(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-lo`);
    }

    async postNewHighScore2048(score, username){
        return axiosAgent.get(`high-scores/${score+1}/${username}/score-2048`);
    }
    
    async postNewHighScoreWordleMin(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wordleMin`);
    }

    async postNewHighScoreWordleSec(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wordleSec`);
    }

    async postNewHighScoreConnect4(score, username){
        return axiosAgent.get(`high-scores/${score+1}/${username}/score-connect4`);
    }
    
    async postNewHighScorePong(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-pong`);
    }

    async postNewGameStatus(username, content, date){
        return axiosAgent.get(`posts/${username}/${content}/${date}/new-post`);
    }

    async updateUserPost(oldContent, date, username, newContent){
        return axiosAgent.get(`posts/${newContent}/${date}/${username}/${oldContent}/update-post`);
    }

    async deleteUserPost(username, postContent){
        return axiosAgent.get(`posts/${username}/${postContent}/delete-post`);
    }

    async followedUser(username){
        return axiosAgent.get(`dashboard/${username}/followed-users`);
    }

    async userHighScores(username){
        return axiosAgent.get(`dashboard/${username}/user-highscores`);
    }

    async usersFollowedPosts(username, followed_username){
        return axiosAgent.get(`dashboard/${username}/${followed_username}/followed-posts`);
    }

    async changeUserProfilePic(newPic, username){
        return axiosAgent.get(`settings/v${newPic}/${username}/change-profile-pic`);
    }

    async changeUsername(newUsername, username){
        return axiosAgent.get(`settings/${newUsername}/${username}/change-username`);
    }

    async changeUserfName(fName, username){
        return axiosAgent.get(`settings/${fName}/${username}/change-firstName`);
    }

    async changeUserlName(lName, username){
        return axiosAgent.get(`settings/${lName}/${username}/change-lastName`);
    }

    async changeUserEmail(email, username){
        return axiosAgent.get(`settings/${email}/${username}/change-email`);
    }

    async changeUserPW(password, username){
        return axiosAgent.get(`settings/${password}/${username}/change-password`);
    }

    async changeUsernameHS(newUsername, username){
        return axiosAgent.get(`settings/${newUsername}/${username}/change-usernameHS`);
    }

    async resetHighScores(username){
        return axiosAgent.get(`settings/${username}/reset-scores`);
    }

    async deleteProfile(username) {
        return axiosAgent.get(`settings/${username}/delete-profile`);
    }
}
