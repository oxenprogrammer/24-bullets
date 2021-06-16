const ID = 'y2FGzCGdshNCynrV2EsW';
const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api';

const getAllScores = async () => {
  try {
    const response = await fetch(`${url}/games/${ID}/scores`);
    const json = await response.json();
    return json.result;
  } catch (error) {
    return error.message;
  }
};

const postScore = async (name, score) => {
  const params = {};
  params.user = name || 'Anonymous';
  params.score = score;
  try {
    const response = await fetch(`${url}/games/${ID}/scores/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    return response.json();
  } catch (error) {
    return error.message;
  }
};

export { getAllScores, postScore };