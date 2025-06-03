const API_BASE_URL = import.meta.env.VITE_API_URL

const getAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    const oidcContext = JSON.parse(sessionStorage.getItem(oidcKey) || "{}");
    const accessToken = oidcContext?.access_token;
    return accessToken;
};

export const deleteAccessToken = () => {
    const sessionStoragKeys = Object.keys(sessionStorage);
    const oidcKey = sessionStoragKeys.find(key => key.startsWith("oidc.user:https://cognito-idp."));
    sessionStorage.removeItem(oidcKey);
}

export const fetchJobs = async () => {
    // alert(`API_BASE_URL: ${API_BASE_URL}`)
    const response = await fetch(`${API_BASE_URL}/job`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
        },
    });
    return response.json();
};

export const getJob = async (id) => {
    const response = await fetch(`${API_BASE_URL}/job/${id}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        },
    );
    return response.json();
};

export const createJob = async (job) => {
    const response = await fetch(`${API_BASE_URL}/job`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(job),
    });
    return response.json();
};

export const updateJob = async (id, job) => {
    const response = await fetch(`${API_BASE_URL}/job/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
        body: JSON.stringify(job),
    });
    return response.json();
};

export const deleteJob = async (id) => {
    const response = await fetch(`${API_BASE_URL}/job/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`
        },
    });
    return response.json();
};

// const API_BASE_URL = import.meta.env.VITE_API_URL

// export const fetchJobs = async () => {
//     // alert(`API_BASE_URL: ${API_BASE_URL}`)
//     const response = await fetch(`${API_BASE_URL}/job`);
//     return response.json();
// };

// export const getJob = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/job/${id}`);
//     return response.json();
// };

// export const createJob = async (job) => {
//     const response = await fetch(`${API_BASE_URL}/job`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(job),
//     });
//     return response.json();
// };

// export const updateJob = async (id, job) => {
//     const response = await fetch(`${API_BASE_URL}/job/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(job),
//     });
//     return response.json();
// };

// export const deleteJob = async (id) => {
//     const response = await fetch(`${API_BASE_URL}/job/${id}`, {
//         method: "DELETE",
//     });
//     return response.json();
// };