const request = require('supertest');
const { categoryTitle } = require('../util/testvariables');

module.exports = (app, people) => () => {
  it('GET: /categories, 200', (done) => {
    request(app)
      .get('/categories')
      .set('Authorization', people.admin.token)
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
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.full, icon: 'icon' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body).toEqual(object);
      })
      .expect(201, done);
  });
  it('POST: /categories, 400, admin permissions validation', async () => {
    await request(app)
      .post('/categories')
      .set('Authorization', people.user.token)
      .send({ title: categoryTitle.short, icon: 'icon' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('Вы не имеете прав для совершения запроса');
      })
      .expect(403);
  });
  it('POST: /categories, 400, title min-length validation', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.short, icon: 'icon' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"title" length must be at least 3 characters long');
      })
      .expect(400, done);
  });
  it('POST: /categories, 400, title max-length validation', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.long, icon: 'icon' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"title" length must be less than or equal to 30 characters long');
      })
      .expect(400, done);
  });
  it('POST: /categories, 400, title max-length validation', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.long, icon: 'icon' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"title" length must be less than or equal to 30 characters long');
      })
      .expect(400, done);
  });
  it('POST: /categories, 400, title fullness validation', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.empty, icon: 'icon' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"title" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /categories, 400, title requirement validation', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', people.admin.token)
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
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.underscore, icon: 'icon' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"title" must only contain alpha-numeric characters');
      })
      .expect(400, done);
  });
  it('POST: /categories, 400, icon fullness validation', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.full, icon: '' })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"icon" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /categories, 400, icon requirement validation', (done) => {
    request(app)
      .post('/categories')
      .set('Authorization', people.admin.token)
      .send({ title: categoryTitle.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"icon" is required');
      })
      .expect(400, done);
  });
};
