const request = require('supertest');

const {
    login, password, title, authorId, id,
} = require('../../testvariables');

module.exports = (app) => () => {
    it('GET: /books, 200, authorized', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const sign = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .get('/books')
            .set('Authorization', sign.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual([]);
            })
            .expect(200);
    });
    it('GET: /books, 401, unauthorized', (done) => {
        request(app)
            .get('/books')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Не авторизировано');
            })
            .expect(401, done);
    });
    it('GET: /books/users=true, 200, authorized', async () => {
        const object = [{
            _id: expect.any(String),
            title: 'ruhatestbook',
            authorId: {
                _id: expect.any(String),
                login: 'ruhatest',
                password: '123',
                isAdmin: false,
                __v: 0,
                token: expect.any(String),
                avarageRating: expect.any(Number),
            },
            rating: expect.any(Number),
            comment: expect.any(Array),
            __v: 0,
        }];
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .set('Authorization', signToken.body.token)
            .send({ title: title.fullTitle, authorId: signId.body._id });
        await request(app)
            .get('/books')
            .query('users=true')
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual(object);
            })
            .expect(200);
    });
    it('GET: /books/authorId=existed id, 200, authorized', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .get('/books')
            .query({ authorId: signId.body._id })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect(200);
    });
    it('GET: /books/:id/comments, 200, authorized', async () => {
        const object = [{
            text: 'ruhatestcommentget',
            date: expect.any(String),
            commentator: expect.any(String),
        }];
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .set('Authorization', signToken.body.token)
            .send({ title: title.fullTitle, authorId: signId.body._id });
        const gtBooks = await request(app)
            .get('/books')
            .set('Authorization', signToken.body.token)
            .query({ authorId: signId.body._id });
        await request(app)
            .post(`/books/${gtBooks.body[0]._id}/comments`)
            .set('Authorization', signToken.body.token)
            .send({ text: 'ruhatestcommentget' });
        await request(app)
            .get(`/books/${gtBooks.body[0]._id}/comments`)
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual(object);
            })
            .expect(200);
    });
    it('GET: /books/:id/comments, 404, authorized', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .get(`/books/${id.wrongBookId}/comments`)
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Книга не найдена');
            })
            .expect(404);
    });
    it('GET: /books/:id, 200, authorized', async () => {
        const object = {
            _id: expect.any(String),
            title: 'ruhatestbook',
            authorId: expect.any(String),
            rating: expect.any(Number),
            comment: expect.any(Array),
            __v: 0,
        };
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .set('Authorization', signToken.body.token)
            .send({ title: title.fullTitle, authorId: signId.body._id });
        const gtBook = await request(app)
            .get('/books')
            .set('Authorization', signToken.body.token)
            .query({ authorId: signId.body._id });
        await request(app)
            .get(`/books/${gtBook.body[2]._id}`)
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual(object);
            })
            .expect(200);
    });
    it('GET: /books/:id, 404, authorized', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .get('/books/126d66cb1a8971592c3b1226')
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Книга не найдена');
            })
            .expect(404);
    });
    it('POST: /books/:id/comments, 201, authorized', async () => {
        const object = [{
            text: 'ruhatestcommentpost',
            date: expect.any(String),
            commentator: expect.any(String),
        }];
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .set('Authorization', signToken.body.token)
            .send({ title: title.fullTitle, authorId: signId.body._id });
        const gtBooks = await request(app)
            .get('/books')
            .set('Authorization', signToken.body.token)
            .query({ authorId: signId.body._id });
        await request(app)
            .post(`/books/${gtBooks.body[1]._id}/comments`)
            .set('Authorization', signToken.body.token)
            .send({ text: 'ruhatestcommentpost' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body).toEqual(object);
            })
            .expect(201);
    });
    it('POST: /books/:id/comments, 404, authorized', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .post(`/books/${id.wrongBookId}/comments`)
            .set('Authorization', signToken.body.token)
            .send({ text: 'ruhatestcommentpost' })
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Книга не найдена');
            })
            .expect(404);
    });
    it('POST: /books, 404, authorized, author doesn`t exist', async () => {
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .post('/books')
            .send({ title: title.fullTitle, authorId: '12c1f2d6a719713552185189' })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('Такого автора не существует');
            })
            .expect(404);
    });
    it('POST: /books, 400, authorized, title min-length validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .send({ title: title.shortTitle, authorId: signId.body._id })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" length must be at least 3 characters long');
            })
            .expect(400);
    });
    it('POST: /books, 400, authorized, title requirement validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .send({ title: title.emptyTitle, authorId: signId.body._id })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" is not allowed to be empty');
            })
            .expect(400);
    });
    it('POST: /books, 400, authorized, title fullness validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .send({ authorId: signId.body._id })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" is required');
            })
            .expect(400);
    });
    it('POST: /books, 400, authorized, title max-length validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .send({ title: title.longTitle, authorId: signId.body._id })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" length must be less than or equal to 30 characters long');
            })
            .expect(400);
    });
    it('POST: /books, 400, authorized, title alphaum validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signId = await request(app)
            .get('/users/me')
            .set('Authorization', signToken.body.token);
        await request(app)
            .post('/books')
            .send({ title: title.underscoreTitle, authorId: signId.body._id })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"title" must only contain alpha-numeric characters');
            })
            .expect(400);
    });
    it('POST: /books, 400, authorized, authorId max-length validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .post('/books')
            .send({ title: title.fullTitle, authorId: authorId.longhAuthorId })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"authorId" length must be less than or equal to 24 characters long');
            })
            .expect(400);
    });
    it('POST: /books, 400, authorized, authorId fullness validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .post('/books')
            .send({ title: title.fullTitle, authorId: authorId.emptyAuthorId })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"authorId" is not allowed to be empty');
            })
            .expect(400);
    });
    it('POST: /books, 400, authorized, authorId requirement validation', async () => {
        await request(app)
            .post('/auth/sign-up')
            .send({ login: login.fullLogin, password: password.fullPassword });
        const signToken = await request(app)
            .post('/auth/sign-in')
            .send({ login: login.fullLogin, password: password.fullPassword });
        await request(app)
            .post('/books')
            .send({ title: title.fullTitle })
            .set('Authorization', signToken.body.token)
            .expect('Content-Type', /json/)
            .expect((res) => {
                expect(res.body.message).toBe('"authorId" is required');
            })
            .expect(400);
    });
};
