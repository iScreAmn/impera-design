export const submitQuestion = async (payload) => {
  const response = await fetch('/api/question/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || 'Ошибка отправки вопроса');
  }

  return data;
};
