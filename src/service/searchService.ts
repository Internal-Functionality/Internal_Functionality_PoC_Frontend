export interface SearchRequest {
  userName: string;
  userTypes: string;
  search: string;
  typeOfService: string;
  scope: number;
  searchFound: number;
}

export interface SearchResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface Job {
  _id: string;
  title: string;
  description: string;
  fixerId: string;
  requesterId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  userType: string;
  createdAt: string;
  updatedAt: string;
}

export interface JobsResponse {
  success: boolean;
  message?: string;
  data?: Job[];
}

export interface UsersResponse {
  success: boolean;
  message?: string;
  data?: User[];
}

const API_BASE_URL = "http://localhost:3001";

export const searchService = {
  async saveSearch(searchData: SearchRequest): Promise<SearchResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Error saving search:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },

  async getAllJobs(): Promise<JobsResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Error fetching jobs:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },

  async getAllUsers(): Promise<UsersResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      console.error("Error fetching users:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
};
