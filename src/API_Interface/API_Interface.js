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

    async userInfo(username){
        return axiosAgent.get(`userprofile/${username}/username`);
    }

    async userPost(username){
        return axiosAgent.get(`userprofile/${username}/posts`);
    }

    async allUsers(){
        console.log("all users");
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

    async getHighScoreByGame(game, username){
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

    async getWordleHS(username){
        return axiosAgent.get(`high-scores/${username}/get-wordle`);
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

    async postNewHighScoreWPM(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wpm`);
    }

    async postNewHighScoreWordle(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wordle`);
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

    async postNewHighScoreWordleMin(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wordleMin`);
    }

    async postNewHighScoreWordleSec(score, username){
        return axiosAgent.get(`high-scores/${score}/${username}/score-wordleSec`);
    }
}