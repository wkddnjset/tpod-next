import Router from 'next/router';

import { getFirestore, doc, getDoc, collection, getDocs } from 'firebase/firestore';

import { StorageGetUser } from 'utils/Storage';

const useGetRoom = async (roomId: string) => {
  const db = getFirestore();

  const user = await StorageGetUser();

  if (!user) {
    alert('잘못된 접근 입니다.');
    Router.replace('/');
    return;
  }

  const docRef = doc(db, `team/${user.teamId}/room`, roomId);
  const result = await getDoc(docRef);

  const reservationRef = collection(db, `team/${user.teamId}/room/${roomId}/reservation`);
  const reservations = await getDocs(reservationRef);

  const reservation: any = [];
  reservations.forEach((r: any) => {
    reservation.push({ uid: r.id, ...r.data() });
  });
  const data = {
    ...result.data(),
    reservation: reservation,
  };
  return data;
  //   if (result.size > 0) {
  //     const teamDocs = result.docs[0];
  //     const roomRef = collection(db, `team/${teamDocs.id}/room`);
  //     const roomResult = await getDocs(roomRef);

  //     const rooms: any = [];
  //     roomResult.forEach((r) => {
  //       rooms.push({ uid: r.id, ...r.data() });
  //     });
  //     return {
  //       uid: teamDocs.id,
  //       ...teamDocs.data(),
  //       rooms,
  //     };
  //   } else {
  //     alert('팀이 삭제되었거나 찾을 수 없습니다.');
  //     Router.replace('/');
  //     return null;
  //   }
};

export default useGetRoom;
