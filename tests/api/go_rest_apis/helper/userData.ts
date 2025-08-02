import { faker } from '@faker-js/faker';

export function generateRandomUser() {
  const genders = ['male', 'female'];
  const statuses = ['active', 'inactive'];

  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    gender: genders[Math.floor(Math.random() * genders.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
  };
}
