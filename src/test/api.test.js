/**
 * @jest-environment jsdom
 */

import { getAllscores, postScore } from '../api/leaderboard.service';

describe('LeaderBoard API', () => {
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve('Resolve'),
  }));

  beforeEach(() => {
    fetch.mockClear();
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
});
