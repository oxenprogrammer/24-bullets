/**
 * @jest-environment jsdom
 */

import fetchMock from 'jest-fetch-mock';
import { getAllScores, postScore } from '../api/leaderboard.service';

fetchMock.enableMocks();

describe('LeaderBoard API', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  describe('Post Score', () => {
    it('should save a user score', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({ json: () => Promise.resolve('Leaderboard score created correctly.') }));
      await expect(postScore('foo', 10)).resolves.toEqual('Leaderboard score created correctly.');
    });

    it('should not post empty user scores', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('API is Down')));
      await expect(postScore('', '')).resolves.toEqual('API is Down');
    });
  });

  describe('Get All Scores', () => {
    it('should be defined', async () => {
      fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 24, user: 'emma' }] }));
      const response = await getAllScores();
      expect(response).toBeDefined();
    });

    it('should return a string type', async () => {
      fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 24, user: 'emma' }] }));
      const response = await getAllScores();
      expect(typeof response[0].user).toEqual('string');
    });

    it('should return a number type', async () => {
      fetch.mockResponseOnce(JSON.stringify({ result: [{ score: 24, user: 'emma' }] }));
      const response = await getAllScores();
      expect(typeof response[0].score).toEqual('number');
    });
  });
});
