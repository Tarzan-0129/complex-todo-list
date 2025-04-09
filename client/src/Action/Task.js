import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const getTasksForProject = async (projectId) => {
  const config = {
    method: 'get',
    url: `${API_URL}/projects/${projectId}`,
  };

  const response = await axios(config);
  return response.data.tasks; 
};

export const createTask = async (task) => {
  const config = {
    method: 'post',
    url: `${API_URL}/tasks`,
    data: task, 
  };

  const response = await axios(config);
  return response.data; 
};

export const deleteTask = async (taskId) => {
  const config = {
    method: 'delete',
    url: `${API_URL}/tasks/${taskId}`,
  };
  await axios(config); 
};

export const updateTaskStatus = async (taskId, status) => {
  
  try {
      const response = await axios.patch(`${API_URL}/tasks/${taskId}/status`, {
          status: status, 
      });
      return response.data
  } catch (error) {
      console.error('Error updating task status:', error.response ? error.response.data : error.message);
  }
};
