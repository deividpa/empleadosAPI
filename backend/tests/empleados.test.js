const request = require('supertest');
const app = require('../src/app');

describe('CRUD de Empleados', () => {
  let adminToken;
  let userToken;
  let empleadoId;

  // Registro y logueo tanto del admin como del usuario regular
  beforeAll(async () => {
    // admin
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

    adminToken = res.body.token;

    // empleado
    await request(app)
    .post('/api/auth/register')
    .send({
      username: 'user',
      password: 'userpassword',
      role: 'empleado'
    });

    const userRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'user',
        password: 'userpassword'
    });
    
    userToken = userRes.body.token;
  });

  test('Obtener lista de empleados (sin autorización)', async () => {
    const res = await request(app).get('/api/empleados');
    expect(res.statusCode).toBe(401);
  });

  test('Obtener lista de empleados (como administrador)', async () => {
    const res = await request(app)
      .get('/api/empleados')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });

  test('Crear un nuevo empleado (como administrador)', async () => {
    const res = await request(app)
      .post('/api/empleados')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nombre: 'EmpleadoTest',
        salario: 50000,
        fechaIngreso: new Date().toISOString()
      });
  
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('nombre', 'EmpleadoTest');

    empleadoId = res.body.id;
  });

  test('Eliminar un empleado (sin ser administrador)', async () => {
    const res = await request(app)
      .delete(`/api/empleados/${empleadoId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  test('Actualizar un empleado (sin ser administrador)', async () => {
    const res = await request(app)
      .put(`/api/empleados/${empleadoId}`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        nombre: 'Empleado Actualizado',
        salario: 55000
      });

    expect(res.statusCode).toBe(403);
  });

  test('Actualizar un empleado (como administrador)', async () => {
    const res = await request(app)
      .put(`/api/empleados/${empleadoId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        nombre: 'Empleado Actualizado por Admin',
        salario: 60000
      });
  
    expect(res.statusCode).toBe(200);
  
    expect(res.body).toHaveProperty('nombre', 'Empleado Actualizado por Admin');
    expect(res.body).toHaveProperty('salario', 60000);
  });

  test('Eliminar un empleado (como administrador)', async () => {
    const res = await request(app)
      .delete(`/api/empleados/${empleadoId}`)
      .set('Authorization', `Bearer ${adminToken}`);
  
    expect(res.statusCode).toBe(200);
  });
});
