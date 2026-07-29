import { auth, db } from '../api/firebase';
import { doc, getDoc, collection, getDocs, query, where, orderBy } from 'firebase/firestore';

export const fetchUserData = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return null;

    try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            return userDocSnap.data();
        }
        return null;
    } catch (error) {
        console.error("유저 정보 불러오기 에러:", error);
        throw error;
    }
};

export const fetchProductsBySchool = async (school) => {
    try {
        const rentQuery = query(
            collection(db, 'posts'),
            where('school', '==', school),
            where('type', '==', 'RENT'),
            orderBy('createdAt', 'desc')
        );

        const saleQuery = query(
            collection(db, 'posts'),
            where('school', '==', school),
            where('type', '==', 'SELL'),
            orderBy('createdAt', 'desc')
        );

        const [rentSnapshot, saleSnapshot] = await Promise.all([
            getDocs(rentQuery),
            getDocs(saleQuery)
        ]);

        const rentProducts = rentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const saleProducts = saleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        return { rentProducts, saleProducts };
    } catch (error) {
        console.error("게시물 쿼리 에러:", error);
        throw error;
    }
};