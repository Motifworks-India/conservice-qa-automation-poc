
export interface User {
    id?: number; 
    name: string;
    job: string;
    createdAt?: string; 
  }
  
  export interface CreateUserResponse {
    id: number;
    createdAt: string;
    name: string;
    job: string;
  }
  
  export interface GetUserResponse {
    id: number;
    name: string;
    job: string;
  }
  
  export interface UpdateUserResponse {
    id: number;
    createdAt: string;
    name: string;
    job: string;
  }