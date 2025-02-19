import { faker } from '@faker-js/faker';

export function generateRandomUser(): any {
    return {
        name: faker.person.fullName(),
        job: faker.helpers.arrayElement(['Developer', 'Engineer', 'Manager', 'Designer'])
    };
}