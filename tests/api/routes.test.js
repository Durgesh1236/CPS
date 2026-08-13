import assert from 'node:assert';
import request from 'supertest';
import app from '../../Backend/app.js';

const publicRoutes = [
  '/api/user/login',
  '/api/user/register',
];

describe('API route discovery sanity', () => {
  for (const path of publicRoutes) {
    it(`should respond on public route ${path}`, async () => {
      const res = await request(app).get(path);
      assert.ok([200, 404, 405].includes(res.status));
    });
  }
});
