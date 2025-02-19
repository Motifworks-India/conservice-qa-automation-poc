import { ApiClient } from 'api/apiClient';
import { endpoints } from '../../../config/api/endpointConfig';
import { User, CreateUserResponse, GetUserResponse, UpdateUserResponse } from '../types/users';

class UserService {
  private endpoint: any;

  constructor(private client: ApiClient) {
    this.endpoint = endpoints.api.users;
  }


  async createUser(userData: User, expectedStatus?: number): Promise<CreateUserResponse> {
    const endpoint = this.endpoint.create;
    const options = {
      expectedStatus: expectedStatus,
      data: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await this.client.post<CreateUserResponse>(endpoint, options);
    return response;
  }


  async getUserDetails(userId: string, expectedStatus?: number): Promise<GetUserResponse> {
    const endpoint = this.endpoint.details.replace('{id}', userId);
    const options = {
      expectedStatus: expectedStatus
    };

    const response = await this.client.get<GetUserResponse>(endpoint, options);
    return response;
  }


  async updateUser(userId: string, userData: User, expectedStatus?: number): Promise<UpdateUserResponse> {
    const endpoint = this.endpoint.update.replace('{id}', userId);
    const options = {
      expectedStatus: expectedStatus,
      data: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const response = await this.client.put<UpdateUserResponse>(endpoint, options);
    return response;
  }


  async deleteUser(userId: string, expectedStatus?: number): Promise<any> {
    const endpoint = this.endpoint.delete.replace('{id}', userId);
    const options = {
      expectedStatus: expectedStatus
    };

    const response = await this.client.delete(endpoint, options);
    return response;
  }
}

export { UserService };