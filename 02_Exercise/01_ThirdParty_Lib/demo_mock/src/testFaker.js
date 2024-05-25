import faker from 'faker';

export default {
  name: faker.name.findName(),
  email: faker.internet.email(),
  avatar: faker.image.avatar(),
  address: faker.address.streetAddress(),
  city: faker.address.city(),
  state: faker.address.state(),
  zipCode: faker.address.zipCode(),
  phone: faker.phone.phoneNumber(),
};
