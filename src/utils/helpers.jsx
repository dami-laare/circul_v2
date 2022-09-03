import api from '../api';

export const getTopCreators = async () => {
  const res = await api.get('/creators?filter=top');

  return res.data.creators;
};

export const search = async (query, page = 1) => {
  const res = await api.get(
    `/creators?filter=search&searchQuery=${query}&page=${page}`,
  );
  return res.data.creators;
};
