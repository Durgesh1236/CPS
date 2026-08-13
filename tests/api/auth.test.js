import assert from 'node:assert';
import request from 'supertest';
import app from '../../Backend/app.js';

describe('API Authentication', () => {
  it('should reject protected endpoint without auth', async () => {
    const res = await request(app).get('/api/user/me');
    assert.strictEqual(res.status, 403);
    assert.ok(res.body.message.toLowerCase().includes('login'));
  });
});
