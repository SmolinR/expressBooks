const request = require('supertest');
const user = require('../util/test-user');

module.exports = (app) => () => {
  it('GET: /users/me, 401, unauthorized', (done) => {
    request(app)
      .get('/users/me')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('Не авторизировано');
      })
      .expect(401, done);
  });
  it('GET: /users/me, 200, authorized', async () => {
    const object = {
      _id: expect.any(String),
      login: user.login,
      password: user.password,
      isAdmin: false,
      __v: 0,
      token: expect.any(String),
      avarageRating: expect.any(Number),
    };
    await request(app)
      .get('/users/me')
      .set('Authorization', user.token)
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual(object);
      })
      .expect(200);
  });
  it('GET: /users, 200', async () => {
    await request(app)
      .get('/users')
      .set('Authorization', user.token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
  });
};
