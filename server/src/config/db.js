const { Pool } = require('pg');
const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

const testConnection = async (callback) => {
  try {
    await prisma.$connect();
    console.log('Database connected successfully');
    if (callback) callback(true);
  } catch (error) {
    console.error('Database connection failed:', error.message);
    if (callback) callback(false);
  }
};

module.exports = { prisma, pool, testConnection };
