import Router from 'next/router';

import { getFirestore, collection, doc, addDoc } from 'firebase/firestore';

import { StorageGetUser } from 'utils/Storage';

const useCreateReservation = async (data: any) => {
  const user = await StorageGetUser();
  return new Promise(function (resolve, reject) {
    const db = getFirestore();
    if (!user) {
      alert('잘못된 접근 입니다.');
      Router.replace('/');
      return;
    } else {
      // 예약 생성
      const memberRef = doc(db, `team/${user.teamId}/member`, user.uid);
      const params = {
        title: data.title,
        start: data.start,
        end: data.end,
        date: new Date(data.date.format('YYYY-MM-DD')),
        member: memberRef,
      };
      addDoc(collection(db, `team/${user.teamId}/room/${data.roomId}/reservation`), params)
        .then(async () => {
          resolve('생성완료');
        })
        .catch((err) => {
          reject(err);
        });
    }
  });
};

export default useCreateReservation;
