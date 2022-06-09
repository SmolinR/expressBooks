const request = require('supertest');

const { login, password } = require('../../testvariables');

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
            login: login.fullLogin,
            password: password.fullPassword,
            isAdmin: false,
            __v: 0,
            token: expect.any(String),
            avarageRating: expect.any(Number),
        };
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const sign = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .get('/users/me')
            .set('Authorization', sign.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual(object);
            })
            .expect(200);
    });
    it('GET: /users, 200', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const sign = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .get('/users')
            .set('Authorization', sign.body.token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    });
};
