import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../config/firebase';

export default async function registerWithEmailAndPasword() {
    try {
        // Your code here
        const provider = new GoogleAuthProvider();

        const userCredential = await signInWithPopup(auth, provider);
        const user = userCredential.user;
        const idToken = await user.getIdToken(); // Fetch ID token
        console.log('ID Token:', idToken);
        console.log(user);
    } catch (error) {
        console.error('Error:', error);
    }
}
