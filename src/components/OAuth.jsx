import {useLocation, useNavigate} from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {db} from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'
import { toast } from 'react-toastify';

function OAuth() {

    const navigate= useNavigate();
    const location= useLocation();

    const onGoogleClick = async ()=>{

       try {
        const auth= getAuth();
        const provider= new GoogleAuthProvider();
        const result= await signInWithPopup(auth, provider);
        const user= result.user;

        // check for the user 
        const docRef= doc(db, 'users', user.uid);
        const docSnap= await getDoc(docRef);

            // if user doesnt exist then creat new User
        if(!docSnap.exists()){

            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                timeStamp: serverTimestamp()
            })
        }
        
        navigate('/');

       } catch (error) {
           toast.error('Could not Authorize with Google !')
       }


    }

    return (
        <div className='socialLogin'>
          <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with </p>
          <button className='socialIconDiv' onClick={onGoogleClick}>
            <img src={googleIcon} alt='google' width='100%'/>
          </button>
        </div>
      )

}

export default OAuth;
