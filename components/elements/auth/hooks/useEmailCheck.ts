import { getFirestore, collection, query, getDocs, where } from 'firebase/firestore';

const useEmailCheck = async (email: string) => {
  const db = getFirestore();
  const docRef = query(collection(db, 'user'), where('email', '==', email));
  const result = await getDocs(docRef);

  return result.size > 0 ? result.docs[0].data() : null;
};

export default useEmailCheck;
