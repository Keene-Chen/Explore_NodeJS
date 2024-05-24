let faker = require('faker')

let name = faker.name.findName()
let email = faker.internet.email()
let address = faker.address.cityName()

console.log(name+"\n",address,email);