import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Course } from './entity/Course.js';
import { Author } from './entity/Author.js';
import 'dotenv/config';

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const db = process.env.DB;
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;

const AppDataSource = new DataSource({
    type: 'postgres',
    host: dbHost,
    port: Number(dbPort),
    username: dbUser,
    password: dbPassword,
    database: db,
    entities: [Author, Course],
    synchronize: true,
    logging: false,
});

export default AppDataSource;
