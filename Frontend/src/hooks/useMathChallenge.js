import { useState } from 'react';

const createChallenge = () => {
  const code = Math.floor(Math.random() * 0x10000)
    .toString(16)
    .padStart(4, '0')
    .toUpperCase();

  return { code };
};

export const useMathChallenge = () => {
  const [challenge, setChallenge] = useState(createChallenge);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const refresh = () => {
    setChallenge(createChallenge());
    setAnswer('');
    setError('');
  };

  const verify = () => {
    if (!answer.trim() || answer.trim().toUpperCase() !== challenge.code) {
      setChallenge(createChallenge());
      setAnswer('');
      setError('That code is not correct. Please enter the new hexadecimal code.');
      return false;
    }

    refresh();
    return true;
  };

  const updateAnswer = (value) => {
    setAnswer(value);
    if (error) setError('');
  };

  return {
    answer,
    code: challenge.code,
    error,
    refresh,
    updateAnswer,
    verify,
  };
};
