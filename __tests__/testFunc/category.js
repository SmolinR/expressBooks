const request = require('supertest');
const admin = require('../util/test-admin');
const { login, password, categoryTitle } = require('../../testvariables');

module.exports = (app) => () => {
    it('GET: /categories, 200', (done) => {
        request(app)
            .get('/categories')
            .set('Authorization', admin.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual([]);
            })
            .expect(200, done);
    });
    it('POST: /categories, 201', (done) => {
        const object = {
            title: 'ruhatestcategory',
            icon: expect.any(String),
            _id: expect.any(String),
            __v: 0,
        };
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.fullTitle, icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual(object);
            })
            .expect(201, done);
    });
    it('POST: /categories, 400, admin permissions validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .post('/categories')
            .set('Authorization', signToken.body.token)
            .send({ title: categoryTitle.shortTitle, icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Вы не имеете прав для совершения запроса');
            })
            .expect(403);
    });
    it('POST: /categories, 400, title min-length validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.shortTitle, icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" length must be at least 3 characters long');
            })
            .expect(400, done);
    });
    it('POST: /categories, 400, title max-length validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.longTitle, icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" length must be less than or equal to 30 characters long');
            })
            .expect(400, done);
    });
    it('POST: /categories, 400, title max-length validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.longTitle, icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" length must be less than or equal to 30 characters long');
            })
            .expect(400, done);
    });
    it('POST: /categories, 400, title fullness validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.emptyTitle, icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" is not allowed to be empty');
            })
            .expect(400, done);
    });
    it('POST: /categories, 400, title requirement validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" is required');
            })
            .expect(400, done);
    });
    it('POST: /categories, 400, title alphaum validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.underscoreTitle, icon: 'icon' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" must only contain alpha-numeric characters');
            })
            .expect(400, done);
    });
    it('POST: /categories, 400, icon fullness validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.fullTitle, icon: '' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"icon" is not allowed to be empty');
            })
            .expect(400, done);
    });
    it('POST: /categories, 400, icon requirement validation', (done) => {
        request(app)
            .post('/categories')
            .set('Authorization', admin.token)
            .send({ title: categoryTitle.fullTitle })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"icon" is required');
            })
            .expect(400, done);
    });
};
