import * as supertest from 'supertest';
import { app } from '../src/app';

describe('Express server', () => {
  it('should response the GET method', async (done) => {
    supertest(app)
      .get('/')
      .then((response) => {
        expect(response.status).toBe(200);
        expect(response.text).toEqual('Hello, VS Code!!!');
        done();
      })
  }),
    it('should response tasks the GET method', async (done) => {
      supertest(app)
        .get('/tasks')
        .then((response) => {
          expect(response.status).toBe(200);
          done();
        })
    }),
    it('should response the POST method', async (done) => {
      supertest(app)
        .post('/tasks')
        .then((response) => {
          expect(response.status).toBe(400);
          expect(response.text).toEqual('Parameter are invalid');
          done();
        })
    }),
    it('send the POST method', async (done) => {
      supertest(app)
        .post('/tasks')
        .send({
          "title": "メール返信",
          "category": "Work",
          "done": false
        })
        .then((response) => {
          expect(response.status).toBe(200);
          done();
        })
    })
})