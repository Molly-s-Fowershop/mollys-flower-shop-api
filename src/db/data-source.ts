import { DataSource } from 'typeorm';

const AppDataSource = new DataSource({
  type: 'postgres',
  entities: [__dirname + '/src/db/entities/**/*.entity{.ts,.js}'],
  url: 'postgresql://root:password@localhost:5432/mollys_flower_shop_db?schema=public',
  synchronize: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default AppDataSource;
