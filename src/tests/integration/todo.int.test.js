const InitTestServer = require('../utils/initTestServer');

const client = InitTestServer().GetClient();

async function registerAndLogin() {
  const email = 'test@example.com';
  const password = 'password'

  await client.post('/api/v1/auth/register').send({ email, password });
  const loginRes = await client.post('/api/v1/auth/login').send({ email, password });
  return loginRes.body.token;
}

describe('Todo Integration', () => {
  const baseUrl = '/api/v1/todos';
  let token;

  beforeEach(async () => {
    token = await registerAndLogin();
  });

  describe('GET /api/v1/todos', () => {
    it('should return all user\'s todos (empty)', async () => {
      const res = await client
        .get(baseUrl)
        .set('Authorization', `Bearer ${token}`);

      expect(res.status).toBe(200);
      expect(res.body.data).toEqual([]);
    });
  });

  describe('GET /api/v1/todos/:todo_id', () => {
    it('should return user\'s todo by id', async () => {
      const createRes = await client
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'some todo'});

      const todoId = createRes.body.id;

      const getRes = await client
        .get(baseUrl + '/' + todoId)
        .set('Authorization', `Bearer ${token}`);

      expect(getRes.status).toBe(200);
      expect(getRes.body.id).toBe(todoId);
    });
  });

  describe('POST /api/v1/todos', () => {
    it('should return created todo', async () => {
      const res = await client
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'created todo'});

      expect(res.status).toBe(201);
      expect(res.body.title).toBe('created todo');
      expect(res.body.completed).toBe(false);
    });
  });

  describe('PATCH /api/v1/todos/:todo_id', () => {
    it('should return updated todo', async () => {
      const createRes = await client
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'old todo' });

      const todoId = createRes.body.id;

      const updateRes = await client
        .patch(baseUrl + '/' + todoId)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'new title', completed: true });

      expect(updateRes.status).toBe(200);
      expect(updateRes.body.title).toBe('new title');
      expect(updateRes.body.completed).toBe(true);
    });
  });

  describe('DELETE /api/v1/todos/:todo_id', () => {
    it('should return deleted todo', async () => {
      const createRes = await client
        .post(baseUrl)
        .set('Authorization', `Bearer ${token}`)
        .send({ title: 'some todo' });

      const todoId = createRes.body.id;

      const deleteRes = await client
        .delete(baseUrl + '/' + todoId)
        .set('Authorization', `Bearer ${token}`)

      expect(deleteRes.status).toBe(200);
      expect(deleteRes.body.id).toBe(todoId);
    })
  });
});