const request = require('supertest');
const app = require('../src/app');
const prisma = require('../src/config/prismaClient');

describe('Autenticación', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Registrar un nuevo usuario', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        password: 'testpassword',
        role: 'user'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Usuario registrado correctamente');
  });

  test('Iniciar sesión con usuario registrado', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'testuser',
        password: 'testpassword'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});