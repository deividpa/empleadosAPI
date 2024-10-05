const request = require('supertest');
const app = require('../src/app');

describe('CRUD de Solicitudes', () => {
  let adminToken;
  let userToken;
  let empleadoId;
  let solicitudId;

  beforeAll(async () => {
    // Registro y logueo de usuario "admin"
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'admin',
        password: 'adminpassword',
        role: 'admin',
      });

    const adminRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: 'adminpassword',
    });

    adminToken = adminRes.body.token;

    // Creo un empleado para asociar a la solicitud
    const empleadoRes = await request(app)
    .post('/api/empleados')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      fechaIngreso: new Date(),
      nombre: 'Empleado Test',
      salario: 50000
    });

    // Obtengo el ID del empleado creado
    empleadoId = empleadoRes.body.id;

    // Registro y login de usuario "empleado"
    await request(app)
      .post('/api/auth/register')
      .send({
        username: 'user',
        password: 'userpassword',
        role: 'empleado',
      });

    const userRes = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'user',
        password: 'userpassword',
      });

    userToken = userRes.body.token;
  });

  test('Crear una nueva solicitud (como admin)', async () => {
    const res = await request(app)
      .post('/api/solicitudes')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        codigo: 'S001',
        descripcion: 'Solicitud de prueba',
        resumen: 'Resumen de prueba',
        empleadoId,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('codigo', 'S001');
    solicitudId = res.body.id;
  });

  test('Obtener lista de solicitudes (como usuario autenticado)', async () => {
    const res = await request(app)
      .get('/api/solicitudes')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Obtener una solicitud por ID (como usuario autenticado)', async () => {
    const res = await request(app)
      .get(`/api/solicitudes/${solicitudId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('codigo', 'S001');
  });

  test('Actualizar una solicitud (como admin)', async () => {
    const res = await request(app)
      .put(`/api/solicitudes/${solicitudId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        descripcion: 'Descripción actualizada',
        resumen: 'Resumen actualizado',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('descripcion', 'Descripción actualizada');
  });

  test('Eliminar una solicitud (sin ser admin)', async () => {
    const res = await request(app)
      .delete(`/api/solicitudes/${solicitudId}`)
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(403);
  });

  test('Eliminar una solicitud (como admin)', async () => {
    const res = await request(app)
      .delete(`/api/solicitudes/${solicitudId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message', 'Solicitud eliminada con éxito');
  });
});