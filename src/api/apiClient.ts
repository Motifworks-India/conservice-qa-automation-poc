import { APIRequestContext, request, Page } from '@playwright/test';

class ApiClient {
  private apiContext: APIRequestContext | null = null;
  private defaultHeaders: { [key: string]: string } = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  async authenticateWithPageContext(page: Page): Promise<void> {
    this.apiContext = page.context().request;
  }

  async authenticateWithCredentials(tokenURL: string, username: string, password: string ): Promise<void> {
     this.apiContext = await request.newContext();
    // const response = await this.apiContext.post(tokenURL, {
    //   data: JSON.stringify({ username, password }),
    //   headers: this.defaultHeaders
    // });
    // if (!response.ok()) throw new Error(`Authentication failed: ${await response.text()}`);
    // const token = (await response.json()).token;
    // this.defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  async get<T>(endpoint: string, options: { headers?: { [key: string]: string }, queryParams?: { [key: string]: any }, expectedStatus?: number } = {}): Promise<T> {
    return this.request<T>('get', endpoint, options);
  }

  async post<T>(endpoint: string, options: { data: any, headers?: { [key: string]: string }, expectedStatus?: number } = { data: {} }): Promise<T> {
    return this.request<T>('post', endpoint, options);
  }

  async put<T>(endpoint: string, options: { data: any, headers?: { [key: string]: string }, expectedStatus?: number } = { data: {} }): Promise<T> {
    return this.request<T>('put', endpoint, options);
  }

  async delete<T>(endpoint: string, options: { headers?: { [key: string]: string }, expectedStatus?: number } = {}): Promise<T> {
    return this.request<T>('delete', endpoint, options);
  }

  private async request<T>(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, options: any): Promise<T> {
    if (!this.apiContext) throw new Error('API context is not initialized.');

    const mergedHeaders = { ...this.defaultHeaders, ...options.headers };
    const requestOptions = {
      headers: mergedHeaders,
      data: options.data || undefined,
      query: options.queryParams || undefined
    };
    const response = await this.apiContext[method](`${this.baseURL}${endpoint}`, requestOptions);
    const expectedStatus = options.expectedStatus;
    if (expectedStatus) {
      if (response.status() !== expectedStatus) {
        throw new Error(`Expected status ${expectedStatus}, but got ${response.status()}: ${await response.text()}`);
      }
    } else {
      if (!response.ok()) {
        throw new Error(`Expected a successful response (2xx), but got ${response.status()}: ${await response.text()}`);
      }
    }

    return await response.json() as T;
  }
}

export { ApiClient };