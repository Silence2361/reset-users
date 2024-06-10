import { Sequelize } from 'sequelize-typescript';
import { User } from '../user/user.model';

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase',
  models: [User],
});

async function seed() {
  await sequelize.sync({ force: true });

  for (let i = 0; i < 1000000; i++) {
    await User.create({
      firstName: `FirstName${i}`,
      lastName: `LastName${i}`,
      age: Math.floor(Math.random() * 100),
      gender: i % 2 === 0 ? 'Male' : 'Female',
      hasProblems: Math.random() > 0.5,
    });
  }

  await sequelize.close();
}

seed().catch((error) => console.error(error));
