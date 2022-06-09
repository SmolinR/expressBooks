const request = require('supertest');

const { login, password } = require('../../testvariables');

module.exports = (app) => () => {
    it('POST: /auth/sign-up, 201', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Пользователь зарегестрирован');
            })
            .expect(201, done);
    });
    it('POST: /auth/sign-in, 201', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.token).toBe(res.body.token);
            })
            .expect(201, done);
    });
    it('POST: /auth/sign-in, 401', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.wrongLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Не авторизовано');
            })
            .expect(401, done);
    });
    it('DELETE: /auth/logout, 200', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .delete('/auth/logout')
            .set('Authorization', signToken.body.token)
            .expect((res) => {
                expect(res.body.message).toBe('Выход произошел успешно');
            })
            .expect(200);
    });
    it('DELETE: /auth/logout, 401', (done) => {
        request(app)
            .delete('/auth/logout')
            .set('Authorization', '')
            .expect((res) => {
                expect(res.body.message).toBe('Не авторизовано');
            })
            .expect(401, done);
    });
    it('POST: /auth/sign-up, 400, authorized, login min-length validation', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ login: login.shortLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" length must be at least 3 characters long');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-up, 400, authorized, password min-length validation', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.shortPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"password" length must be at least 3 characters long');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-up, 400, authorized, login requirement validation', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" is required');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-up, 400, authorized, password requirement validation', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"password" is required');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-up, 400, authorized, login fullness validation', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ login: login.emptyLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" is not allowed to be empty');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-up, 400, authorized, password fullness validation', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.emptyPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"password" is not allowed to be empty');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-up, 400, authorized, login max-length validation', (done) => {
        request(app)
            .post('/auth/sign-up')
            .send({ login: login.longLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" length must be less than or equal to 30 characters long');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-in, 400, authorized, login min-length validation', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.shortLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" length must be at least 3 characters long');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-in, 400, authorized, login min-length validation', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.shortPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"password" length must be at least 3 characters long');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-in, 400, authorized, login requirement validation', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" is required');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-in, 400, authorized, password requirement validation', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"password" is required');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-in, 400, authorized, login fullness validation', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.emptyLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" is not allowed to be empty');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-in, 400, authorized, password fullness validation', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.emptyPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"password" is not allowed to be empty');
            })
            .expect(400, done);
    });
    it('POST: /auth/sign-in, 400, authorized, login max-length validation', (done) => {
        request(app)
            .post('/auth/sign-in')
            .send({ login: login.longLogin, password: password.fullPassword })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"login" length must be less than or equal to 30 characters long');
            })
            .expect(400, done);
    });
};
