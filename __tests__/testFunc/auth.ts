import request from 'supertest';
import nodemailer from 'nodemailer';
import { Express } from 'express';
import { IPeople } from '../interfaces/people.interfaces';
import Users from '../../api/user/model';

import {
  email, login, password, token,
} from '../util/testvariables';

export = (app: Express.Application, people: IPeople) => () => {
  it('POST: /auth/sign-up, 201', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, login: login.full, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('User was registered');
      })
      .expect(201, done);
  });
  it('POST: /auth/sign-in, 201', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ email: email.full, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.token).toBe(res.body.token);
      })
      .expect(201, done);
  });
  it('POST: /auth/sign-in, 401', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ email: email.wrong, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('Unauthorized');
      })
      .expect(401, done);
  });
  it('DELETE: /auth/logout, 200', async () => {
    await request(app)
      .delete('/auth/logout')
      .set('Authorization', people.user.token)
      .expect((res) => {
        expect(res.body.message).toBe('Logout was successful');
      })
      .expect(200);
  });
  it('DELETE: /auth/logout, 401', (done) => {
    request(app)
      .delete('/auth/logout')
      .set('Authorization', '')
      .expect((res) => {
        expect(res.body.message).toBe('Unauthorized');
      })
      .expect(401, done);
  });
  it('POST: /auth/forgot-password, 200', (done) => {
    jest.spyOn(nodemailer, 'createTransport').mockImplementationOnce(() => ({ sendMail: (options: any, callback: any) => callback() } as any));
    request(app)
      .post('/auth/forgot-password')
      .send({ email: email.full })
      .expect((res) => {
        expect(res.body.message).toBe('Email has been sent!');
      })
      .expect(200, done);
  });
  it('POST: /auth/reset-password, 200', (done) => {
    jest.spyOn(Users, 'findOne').mockImplementationOnce(() => ({ ...people.user, save: () => null } as any));
    request(app)
      .post('/auth/reset-password')
      .send({ resetToken: token.full, newPassword: '123' })
      .expect((res) => {
        expect(res.body.message).toBe('Password change successful');
      })
      .expect(200, done);
  });
  it('POST: /auth/forgot-password, 404', (done) => {
    request(app)
      .post('/auth/forgot-password')
      .send({ email: email.wrong })
      .expect((res) => {
        expect(res.body.message).toBe('User not found!');
      })
      .expect(404, done);
  });
  it('POST: /auth/forgot-password, 400, email type validation', (done) => {
    request(app)
      .post('/auth/forgot-password')
      .send({ email: email.noValid })
      .expect((res) => {
        expect(res.body.message).toBe('"email" must be a valid email');
      })
      .expect(400, done);
  });
  it('POST: /auth/forgot-password, 400, email fullness validation', (done) => {
    request(app)
      .post('/auth/forgot-password')
      .send({ email: email.empty })
      .expect((res) => {
        expect(res.body.message).toBe('"email" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/forgot-password, 400, email requirement validation', (done) => {
    request(app)
      .post('/auth/forgot-password')
      .expect((res) => {
        expect(res.body.message).toBe('"email" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, email fullness validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.empty, login: login.short, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"email" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, email requirement validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ login: login.short, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"email" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, login min-length validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, login: login.short, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" length must be at least 3 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, password min-length validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, login: login.full, password: password.short })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" length must be at least 3 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, login requirement validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, password requirement validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, login: login.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, login fullness validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, login: login.empty, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, password fullness validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, login: login.full, password: password.empty })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-up, 400, authorized, login max-length validation', (done) => {
    request(app)
      .post('/auth/sign-up')
      .send({ email: email.full, login: login.long, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"login" length must be less than or equal to 30 characters long');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, email fullness validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ email: email.empty, password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"email" is not allowed to be empty');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, email requirement validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ password: password.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"email" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, password requirement validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ email: email.full })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is required');
      })
      .expect(400, done);
  });
  it('POST: /auth/sign-in, 400, authorized, password fullness validation', (done) => {
    request(app)
      .post('/auth/sign-in')
      .send({ email: email.full, password: password.empty })
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.message).toBe('"password" is not allowed to be empty');
      })
      .expect(400, done);
  });
};
