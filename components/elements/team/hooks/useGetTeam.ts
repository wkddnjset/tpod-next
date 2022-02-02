import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import Router from 'next/router';

const useGetTeam = async (team?: string) => {
  const db = getFirestore();

  const docRef = query(collection(db, 'team'), where('name', '==', team));
  const result = await getDocs(docRef);

  if (result.size > 0) {
    const teamDocs = result.docs[0];
    const roomRef = collection(db, `team/${teamDocs.id}/room`);
    const roomResult = await getDocs(roomRef);

    const rooms: any = [];
    roomResult.forEach((r) => {
      rooms.push({ uid: r.id, ...r.data() });
    });
    return {
      uid: teamDocs.id,
      ...teamDocs.data(),
      rooms,
    };
  } else {
    alert('팀이 삭제되었거나 찾을 수 없습니다.');
    Router.replace('/');
    return null;
  }
};

export default useGetTeam;
