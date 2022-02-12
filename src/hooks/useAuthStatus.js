import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const useAuthStatus = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted= useRef(true);
    useEffect(() => {
      if(isMounted){
        const auth= getAuth();
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setLoggedIn(true)
                setCheckingStatus(false);
            } else{
              setCheckingStatus(false);
            }
        })
      }

      return ()=> {
          isMounted.current= false;
      }
    }, [isMounted]);
    
  return {loggedIn, checkingStatus};
};
