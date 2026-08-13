import assert from 'node:assert';
import request from 'supertest';
import app from '../../Backend/app.js';

describe('API CORS and Security Headers', () => {
  it('should respond with security headers from helmet', async () => {
    const res = await request(app).get('/api/user/login');
    assert.strictEqual(res.headers['x-content-type-options'], 'nosniff');
    assert.ok(res.headers['x-dns-prefetch-control']);
  });

  it('should allow configured frontend origin', async () => {
    const res = await request(app)
      .get('/api/user/login')
      .set('Origin', 'http://localhost:5173');

    assert.strictEqual(res.headers['access-control-allow-origin'], 'http://localhost:5173');
  });
});
