import { Sequelize } from 'sequelize-typescript'
import { User } from '../src/user/user.model'
import * as dotenv from 'dotenv'

dotenv.config()

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [User],
});

async function seed() {
  await sequelize.sync({ force: true });

  const users = [];
  for (let i = 0; i < 1000000; i++) {
    users.push({
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      age: Math.floor(Math.random() * 100),
      gender: i % 2 === 0 ? 'Male' : 'Female',
      hasProblems: Math.random() > 0.5,
    });

    if (users.length === 10000) {
      await User.bulkCreate(users);
      users.length = 0;
    }
  }

  if (users.length > 0) {
    await User.bulkCreate(users);
  }

  await sequelize.close();
}

seed().catch((error) => console.error(error));
