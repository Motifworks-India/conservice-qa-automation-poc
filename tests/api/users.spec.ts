import { test, expect } from '@playwright/test';
import { ApiClient } from '../../src/api/apiClient';
import { UserService } from '../../src/api/services/usersService';
import { generateRandomUser } from '../../src/api/api-utils/user-data';


const client = new ApiClient('https://reqres.in');
client.authenticateWithCredentials("/test", "test", "test");
const userService = new UserService(client);

test('Create a new user and verify the response', async () => {

  const userData = generateRandomUser();

  const newUser = await userService.createUser(userData, 201);
  expect(newUser.id).toBeDefined();
  expect(newUser.createdAt).toBeDefined();
  expect(newUser.name).toBe(userData.name);
  expect(newUser.job).toBe(userData.job);

  console.log('New User:', newUser);
});

test('Get user details by ID and verify the response', async () => {
  const userData = {
    name: 'Jane Doe',
    job: 'Engineer'
  };

  const newUser = await userService.createUser(userData, 201);
  expect(newUser.id).toBeDefined();
  expect(newUser.createdAt).toBeDefined();
  expect(newUser.name).toBe(userData.name);
  expect(newUser.job).toBe(userData.job);

  const userId = newUser.id.toString();
  const userDetails = await userService.getUserDetails(userId, 200);
  expect(userDetails.id).toBeDefined();
  expect(userDetails.name).toBe(userData.name);
  expect(userDetails.job).toBe(userData.job);

  console.log('User Details:', userDetails);
});