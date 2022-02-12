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
    uid: result.id,
    ...result.data(),
    reservation: reservation,
  };
  return data;
};

export default useGetRoom;
