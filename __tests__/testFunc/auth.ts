import request from 'supertest';
import { IPeople } from '../interfaces/people.interfaces';

import { login, password } from '../util/testvariables';

export = (app: Express.Application, people: IPeople) => () => {
  it('POST: /auth/sign-up, 201', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ login: login.full, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('Пользователь зарегестрирован');
      })
      .expect(201, done);
  });
  it('POST: /auth/sign-in, 201', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.full, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.token).toBe(res.body.token);
      })
      .expect(201, done);
  });
  it('POST: /auth/sign-in, 401', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.wrong, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('Не авторизовано');
      })
      .expect(401, done);
  });
  it('DELETE: /auth/logout, 200', async () => {
    await request(app)
      .delete('/auth/logout')
      .set('Authorization', people.user.token)
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
      .send({ login: login.short, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" length must be at least 3 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, password min-length validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ login: login.full, password: password.short })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" length must be at least 3 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, login requirement validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, password requirement validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ login: login.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, login fullness validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ login: login.empty, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, password fullness validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ login: login.full, password: password.empty })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, login max-length validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ login: login.long, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" length must be less than or equal to 30 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, login min-length validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.short, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" length must be at least 3 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, login min-length validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.full, password: password.short })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" length must be at least 3 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, login requirement validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, password requirement validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, login fullness validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.empty, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, password fullness validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.full, password: password.empty })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, login max-length validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ login: login.long, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" length must be less than or equal to 30 characters long');
      })
      .expect(400, done);
  });
};
