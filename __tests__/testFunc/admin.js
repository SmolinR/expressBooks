const request = require('supertest');
const admin = require('../util/test-admin');
const user = require('../util/test-user');
const { id } = require('../util/testvariables');

module.exports = (app) => () => {
  it('PATCH: /admin/make-admin, 200', async () => {
    await request(app)
      .patch('/admin/make-admin')
      .set('Authorization', admin.token)
      .send({ id: user._id })
      .expect((res) => {
        expect(res.body.message).toBe('Администратор успешно назначен');
      })
      .expect(200);
  });
  it('PATCH: /admin/delete-admin, 200', async () => {
    await request(app)
      .patch('/admin/delete-admin')
      .set('Authorization', admin.token)
      .send({ id: user._id })
      .expect((res) => {
        expect(res.body.message).toBe('Администратор успешно снят');
      })
      .expect(200);
  });
  it('PATCH: /admin/make-admin, 404', (done) => {
    request(app)
      .patch('/admin/make-admin')
      .set('Authorization', admin.token)
      .send({ id: '126d5fd88d1a42d1c3a705ab' })
      .expect((res) => {
        expect(res.body.message).toBe('Пользователь не найден');
      })
      .expect(404, done);
  });
  it('PATCH: /admin/delete-admin, 404', (done) => {
    request(app)
      .patch('/admin/delete-admin')
      .set('Authorization', admin.token)
      .send({ id: '126d5fd88d1a42d1c3a705ab' })
      .expect((res) => {
        expect(res.body.message).toBe('Пользователь не найден');
      })
      .expect(404, done);
  });
  it('PATCH: /admin/make-admin, 400, id max-length validation', (done) => {
    request(app)
      .patch('/admin/make-admin')
      .set('Authorization', admin.token)
      .send({ id: id.longId })
      .expect((res) => {
        expect(res.body.message).toBe('"id" length must be less than or equal to 24 characters long');
      })
      .expect(400, done);
  });
  it('PATCH: /admin/make-admin, 400, id fullness validation', (done) => {
    request(app)
      .patch('/admin/make-admin')
      .set('Authorization', admin.token)
      .send({ id: id.emptyId })
      .expect((res) => {
        expect(res.body.message).toBe('"id" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('PATCH: /admin/make-admin, 400, id requirement validation', (done) => {
    request(app)
      .patch('/admin/make-admin')
      .set('Authorization', admin.token)
      .expect((res) => {
        expect(res.body.message).toBe('"id" is required');
      })
      .expect(400, done);
  });
  it('PATCH: /admin/delete-admin, 400, id max-length validation', (done) => {
    request(app)
      .patch('/admin/delete-admin')
      .set('Authorization', admin.token)
      .send({ id: id.longId })
      .expect((res) => {
        expect(res.body.message).toBe('"id" length must be less than or equal to 24 characters long');
      })
      .expect(400, done);
  });
  it('PATCH: /admin/delete-admin, 400, id fullness validation', (done) => {
    request(app)
      .patch('/admin/delete-admin')
      .set('Authorization', admin.token)
      .send({ id: id.emptyId })
      .expect((res) => {
        expect(res.body.message).toBe('"id" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('PATCH: /admin/delete-admin, 400, id requirement validation', (done) => {
    request(app)
      .patch('/admin/delete-admin')
      .set('Authorization', admin.token)
      .expect((res) => {
        expect(res.body.message).toBe('"id" is required');
      })
      .expect(400, done);
  });
};
