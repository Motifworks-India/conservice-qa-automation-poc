import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from 'axios';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  }

  async authenticateWithCredentials(username: string, password: string, tokenEndpoint: string): Promise<void> {
    try {
      const response = await this.axiosInstance.post(tokenEndpoint, {
        username,
        password
      });
      const token = response.data.token;
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Authentication failed: ${error.response?.status} - ${error.response?.data}`);
      } else {
        throw new Error(`Authentication failed: ${error}`);
      }
    }
  }

  async get(endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
    return this.request('get' as Method, endpoint, config);
  }

  async post(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.request('post' as Method, endpoint, { ...config, data });
  }

  async put(endpoint: string, data: any, config: AxiosRequestConfig = {}): Promise<any> {
    return this.request('put' as Method, endpoint, { ...config, data });
  }

  async delete(endpoint: string, config: AxiosRequestConfig = {}): Promise<any> {
    return this.request('delete' as Method, endpoint, config);
  }

  private async request(method: Method, endpoint: string, config: AxiosRequestConfig): Promise<any> {
    try {
      const response: AxiosResponse = await this.axiosInstance.request({
        method,
        url: endpoint,
        ...config
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.response?.status} - ${error.response?.data}`);
      } else {
        throw new Error(`Request failed: ${error}`);
      }
    }
  }
}

export { ApiClient };