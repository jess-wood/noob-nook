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
        return axiosAgent.get(`follow/${username}/${userFollow}`);
    }
}