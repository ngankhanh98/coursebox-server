import { registerAs } from '@nestjs/config';

export const localMySql = registerAs('localMySql', () => ({
  type: 'mysql',
  host: process.env.L_MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.L_MYSQL_USERNAME,
  password: process.env.L_MYSQL_PASSWORD,
  database: process.env.L_MYSQL_DATABASE,
}));

export const remoteMySql = registerAs('remoteMySql', () => ({
  type: 'mysql',
  host: process.env.R_MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT, 10),
  username: process.env.R_MYSQL_USERNAME,
  password: process.env.R_MYSQL_PASSWORD,
  database: process.env.R_MYSQL_DATABASE,
}));
