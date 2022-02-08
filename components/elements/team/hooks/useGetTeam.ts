import { getFirestore, query, collection, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { StorageGetUser, StorageClearUser } from 'utils/Storage';
import Router from 'next/router';

const useGetTeam = async (team?: string) => {
  const db = getFirestore();

  const docRef = query(collection(db, 'team'), where('slug', '==', team));
  const result = await getDocs(docRef);
  console.log('result : ', result.size);
  if (result.size > 0) {
    const teamDocs = result.docs[0];
    // 유저 체크
    const user = await StorageGetUser();
    const docRef = doc(db, `team/${teamDocs.id}/member`, user.uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      StorageClearUser();
      Router.reload();
      return false;
    }
    // 회의실 데이터 불러오기
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
