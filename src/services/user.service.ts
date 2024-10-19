import axios from 'axios';

/**
 * Fetch users from the API
 *
 * @param limit number | min 1 | max 10
 * @param pagination number
 * @returns Collection of users | Array<Record<string, any>>
 */
const fetchUsers = async (limit = 10, pagination = 0) => {
  const results = await axios.get('https://jsonplaceholder.typicode.com/users');
  const { data } = results;

  if (limit < 1 || limit > 100) {
    throw new Error('Limit must be between 1 and 100');
  } else if (pagination < 0 || pagination > 10) {
    throw new Error('Pagination must be between 0 and 10');
  }

  const users = data.slice(pagination, limit);

  return users;
};

export default fetchUsers;
