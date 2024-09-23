import { useEffect } from 'react';
import { auth, onSocialClick, dbservice, storage, messaging } from 'src/baseApi/serverbase'
import { getToken, onMessage } from "firebase/messaging";

const Notification = () => {
  
    useEffect(() => {
            
        const requestPermission = async () => {
            try {
                const token = await getToken(messaging, { vapidKey: 'BOZVNIa04HdKkM847Pn294EGxwSDB2S9pJoY5n_Suc8mlV3-KST0p-DpVIVBr9BB4xB3zi8cvIUsS7eJONVhaaABC6ZRwx8Ke48uprRA17AlLOqJ8HCMIwIVYLy32evgnACjpf0aH5yxHhkvEe5D8I73kjn69E2jF-bnMLeRbbzRRE' });
                if (token) {
                    console.log('Token generated:', token);
                      // fetch('/save-token', {
                      //     method: 'POST',
                      //     headers: {
                      //         'Content-Type': 'application/json',
                      //     },
                      //     body: JSON.stringify({ token }),
                      // });
                } else {
                    console.log('No registration token available.');
                }
            } catch (err) {
                console.error('Error getting token:', err);
            }
        };

        requestPermission();
    }, []);
    // useEffect(() => {
    //     const unsubscribe = onMessage(messaging, (payload) => {
    //         console.log('Message received. ', payload);
    //         // Customize notification display here
    //     });
    
    //     return () => {
    //         unsubscribe();
    //     };
    // }, []);
    

    return <div>Practice</div>;
};

export default Notification;
