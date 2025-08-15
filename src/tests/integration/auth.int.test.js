require('../utils/setupTestDb');
const InitTestServer = require('../utils/initTestServer');
const {PrismaClient} = require('../../../generated/prisma');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();
const client = InitTestServer().GetClient();

describe('Auth Integration', () => {
  describe('POST /api/v1/auth/register', () => {
    const regPath = '/api/v1/auth/register';

    it('should register user and return token', async () => {
      const res = await client
        .post(regPath)
        .send({ email: 'test@example.com', password: 'password' });

      expect(res.status).toBe(201);
      expect(res.body.token).toBeDefined();
    });
    it('should return 409 (ConflictError) if email exists', async () => {
      await prisma.user.create({
        data: { email: 'exists@example.com', password: 'hashedpassword'},
      });

      const res = await client
        .post(regPath)
        .send({ email: 'exists@example.com', password: 'password'});

      expect(res.status).toBe(409);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toMatch(/already exists/i);
    });
    it('should return 400 (BadRequestError) if bad data', async () => {
      const res = await client
        .post(regPath)
        .send({ email: 'some_invalid_mail', password: 'short' });

      expect(res.status).toBe(400);
      expect(res.body.error).toBe(true);
      expect(res.body.message).toMatch(/Invalid email format/i);
      expect(res.body.message).toMatch(/Password must contain at least 6 characters/i);
    });
  });

  describe('POST /api/v1/auth/login', () => {
    const logPath = '/api/v1/auth/login';

    beforeEach(async () => {
      const hashedPass = await bcrypt.hash('password', 10);
      await prisma.user.create({
        data: { email: 'test@example.com', password: hashedPass },
      });
    });

    it('should login and return a token', async () => {
      const res = await client
        .post(logPath)
        .send({ email: 'test@example.com', password: 'password' });

      expect(res.status).toBe(200);
      expect(res.body.token).toBeDefined();
    });
    it('should return 404 (NotFoundError) if email not found', async () => {
      const res = await client
        .post(logPath)
        .send({ email: 'notfound@example.com', password: 'password' });

      expect(res.status).toBe(404);
      expect(res.body.message).toMatch(/not found/i);
    });
    it('should return 400 (BadRequestError) if bad data', async () => {
      const res = await client
        .post(logPath)
        .send({ password: 'password' });

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Email is required/i);
    });
    it('should return 400 (BadRequestError) if invalid password', async () => {
      const res = await client
        .post(logPath)
        .send({ email: 'test@example.com', password: 'invalidPassword'});

      expect(res.status).toBe(400);
      expect(res.body.message).toMatch(/Invalid password/i);
    });
  });
});