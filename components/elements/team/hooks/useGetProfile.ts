import { getFirestore, query, collection, where, getDocs } from 'firebase/firestore';
import Router from 'next/router';
import { StorageSetUser } from 'utils/Storage';

const useGetProfile = async (team: string, username: string, password: string) => {
  const db = getFirestore();
  const teamRef = collection(db, 'team');
  const teamQ = query(teamRef, where('name', '==', team));
  const teamQuerySnapshot = await getDocs(teamQ);
  if (teamQuerySnapshot.size > 0) {
    const teamId = teamQuerySnapshot.docs[0].id;
    const memberRef = collection(db, `team/${teamId}/member`);

    const q = query(memberRef, where('username', '==', username), where('password', '==', password));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      const user = querySnapshot.docs[0].data();
      const userData: any = {
        uid: querySnapshot.docs[0].id,
        teamId: teamId,
        ...user,
      };
      delete userData.password;
      StorageSetUser(userData).then(() => {
        const team = Router.router?.query?.team;
        Router.push(`/${team}`);
      });
    }
  }
  return null;
};

export default useGetProfile;
