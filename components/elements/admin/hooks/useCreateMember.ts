import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, addDoc } from 'firebase/firestore';

import { MemberProps } from '../_fragments/Modal/CreateMember';
import crypto from 'crypto-js';

const useCreateMember = async (data: MemberProps) => {
  const auth = await getAuth();
  return new Promise(function (resolve, reject) {
    onAuthStateChanged(auth, async (user) => {
      const db = getFirestore();

      if (user) {
        // 중복확인
        const memberRef = collection(db, `team/${user.uid}/member`);
        const q = query(memberRef, where('username', '==', data.username));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          reject({ name: 'username', value: { type: 'manual', message: '이미 사용중인 아이디 입니다.' } });
          return;
        }
        // 유저 생성
        const secretKey = process.env.NEXT_PUBLIC_PASSWORD_SECRET;
        const hasedPassword = crypto.HmacSHA256(data.password, String(secretKey));
        const docRef = await addDoc(collection(db, `team/${user.uid}/member`), {
          name: data.name,
          username: data.username,
          password: hasedPassword.toString(),
          created: new Date(),
        });
        console.log('docRef : ', docRef.id);
        resolve('생성 완료');
      } else {
        reject({ name: 'user', value: { type: 'manual', message: '계정을 찾을 수 없습니다.' } });
      }
    });
  });
};

export default useCreateMember;
