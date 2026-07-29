import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

export const login = async(email, password) => {
    try {
        return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        throw error;
    }
};