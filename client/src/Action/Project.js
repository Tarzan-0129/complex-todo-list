import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getProjects = async () => {
    
    const config = {
        method: 'get',
        url: `${API_URL}/projects`,
    };

    const response = await axios(config);
    return response.data;
};

export const createProject = async (project,IsNew) => {
    const config = {
        method: 'post',
        url: `${API_URL}/projects`,
        data: {
            ...project,
            IsNew
        }
    };
    const response = await axios(config);
    return response.data;
};

export const deleteProject = async (projectIds) => {
    for (const id of projectIds) {
      
      await axios.delete(`${API_URL}/projects/${id}`);
    }
};
  