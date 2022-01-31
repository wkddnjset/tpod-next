export const StorageGetUser = async () => {
  try {
    const user = await localStorage.getItem('@user');
    console.log('user : ', user);
    return user ? JSON.parse(user) : '';
  } catch (error) {
    // Error retrieving data
    console.log('error : ', error);
    return '';
  }
};

export const StorageSetUser = async (user: any) => {
  const data = user;
  console.log(JSON.stringify(data));
  await localStorage.setItem('@user', JSON.stringify(data));
  return true;
};

export const StorageClearUser = async () => {
  await localStorage.removeItem('@user');
};
