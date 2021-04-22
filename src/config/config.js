import dotenv from 'dotenv';
dotenv.config();

export const dbUrl = process.env.mongodbUrl;
export const secret = process.env.appSecret;