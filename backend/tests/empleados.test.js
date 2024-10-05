const request = require('supertest');
const app = require('../src/app');

describe('CRUD de Empleados', () => {
  let token;

  beforeAll(async () => {
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'admin',
        password: 'adminpassword',
        role: 'admin'
      });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'adminpassword'
      });

    token = res.body.token;
  });

  test('Obtener lista de empleados (sin autorización)', async () => {
    const res = await request(app).get('/api/empleados');
    expect(res.statusCode).toBe(401);
  });

  test('Obtener lista de empleados (con autorización)', async () => {
    const res = await request(app)
      .get('/api/empleados')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  test('Crear un nuevo empleado', async () => {
    const res = await request(app)
      .post('/api/empleados')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nombre: 'Empleado Prueba',
        puesto: 'Developer'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('nombre', 'Empleado Prueba');
  });
});
