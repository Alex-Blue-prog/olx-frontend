import Cookies from "js-cookie";
import qs from "qs";
// const BASEAPI = "http://alunos.b7web.com.br:501";
const BASEAPI = "http://localhost:5000";

const apiFetchGet = async (endpoint, body = []) => {
    
    if(!body.token) {
        let token = Cookies.get("token");
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`);

    const json = await res.json();

    if(json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
}

const apiFetchPost = async (endpoint, body) => {

    if(!body.token) {
        let token = Cookies.get("token");
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI + endpoint, {
        method: "POST",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();

    if(json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
}

const apiFetchPut = async (endpoint, body) => {

    if(!body.token) {
        let token = Cookies.get("token");
        if(token) {
            body.token = token;
        }
    }

    const res = await fetch(BASEAPI + endpoint, {
        method: "PUT",
        headers:{
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });

    const json = await res.json();

    if(json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
}

const apiFetchFile = async (endpoint, body) => {
    if(!body.token) {
        let token = Cookies.get("token");
        if(token) {
            body.append("token", token);
        }
    }

    const res = await fetch(BASEAPI + endpoint, {
        method: "POST",
        body: body
    });

    const json = await res.json();

    if(json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
}

const apiFetchDelete = async (endpoint, body = []) => {
    if(!body.token) {
        let token = Cookies.get("token");
        if(token) {
            body.token = token;
        }
    }

    console.log(body);

    const res = await fetch(`${BASEAPI + endpoint}?${qs.stringify(body)}`, {
        method: "DELETE"
    });

    const json = await res.json();

    if(json.notallowed) {
        window.location.href = "/signin";
        return;
    }

    return json;
}

//API 
const OlxAPI = {
    login: async(email, password) => {
        const json = await apiFetchPost("/user/signin", {email, password});
        return json;
    },
    register: async (name, email, password, stateLoc) => {
        const json = await apiFetchPost("/user/signup", {name, email, password, state:stateLoc});
        return json;
    },
    getStates: async() => {
        const json = await apiFetchGet("/states");
        return json.states;
    },
    getCategories: async () => {
        const json = await apiFetchGet("/categories");
        return json.categories;
    },
    getAds: async (options) => {
        const json = await apiFetchGet("/ad/list", options);
        return json;
    },
    getAd: async (id, other = false) => {
        const json = await apiFetchGet("/ad/"+id,{other});
        return json;
    },
    addAd: async (fData) => {
        const json = await apiFetchFile("/ad/add", fData);
        return json;
    },
    getUser: async () => {
        const json = await apiFetchGet("/user/me");
        return json;
    },
    updateUser: async (userInfo) => {
        const json = await apiFetchPut("/user/me", userInfo);
        return json;
    },
    updateAd: async (adInfo, id) => {
        const json = await apiFetchFile("/ad/" +id, adInfo);
        return json;
    },
    deleteAd: async (id) => {
        const json = await apiFetchDelete("/ad/" + id);
        return json;
    }
}

const API = () => OlxAPI;

export default API;