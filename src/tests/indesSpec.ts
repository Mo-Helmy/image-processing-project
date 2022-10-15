import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Test endpoint responses', () => {
  describe('main endpoint', () => {
    it('/api endpoint', async () => {
      const response = await request.get('/api');
      expect(response.status).toBe(200);
    });

    it('/api/images endpoint', async () => {
      const response = await request.get('/api/images');
      expect(response.status).toBe(200);
    });

    it('/api/invalid  invalid endpoint', async () => {
      const response = await request.get('/api/invalid');
      expect(response.status).toBe(404);
    });
  });

  describe('valid image queries', () => {
    it(' /api/images?filename=fjord (valid image name)', async () => {
      const response = await request.get('/api/images?filename=fjord');
      expect(response.status).toBe(200);
    });

    it('/api/images?filename=fjord&width=300&height=300 (valid image name and width and height)', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=300&height=300'
      );
      expect(response.status).toBe(200);
    });

    it('/api/images?filename=fjord&width=300 (valid image name and width only)', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=300'
      );
      expect(response.status).toBe(200);
    });
  });

  describe('invalid image queries', () => {
    it('/api/images?filename=invalid&width=300&height=300 (invalid image name and valid width and height)', async () => {
      const response = await request.get(
        '/api/images?filename=invalid&width=300&height=300'
      );
      expect(response.status).toBe(404);
    });

    it('/api/images?filename=fjord&width=0&height=300 (valid image name and invalid width and valid height)', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=0&height=300'
      );
      expect(response.status).toBe(404);
    });

    it('/api/images?filename=fjord&width=-50 (valid image name and invalid width only)', async () => {
      const response = await request.get(
        '/api/images?filename=fjord&width=-50'
      );
      expect(response.status).toBe(404);
    });
  });
});
