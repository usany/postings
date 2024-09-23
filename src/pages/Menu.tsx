import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Message from 'src/pages/Message'
import {supabase} from 'src/baseApi/base';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

// let tmpCounter = []
function Menu({ displayName, isLoggedIn, userObj, counter, setCounter, setValue, tmpCounter }) {
    const [messages, setMessages] = useState<Array<object>>([]);
    // const [choose, setChoose] = useState(true);
    useEffect(() => {
        let refresh = false
        const pullToRefresh = document.querySelector('.pull-to-refresh');
        let touchstartY = 0;
        document.addEventListener('touchstart', e => {
          touchstartY = e.touches[0].clientY;
        });
        document.addEventListener('touchmove', e => {
          const touchY = e.touches[0].clientY;
          const touchDiff = touchY - touchstartY;
          if (touchDiff > 0 && window.scrollY === 0) {
            if (touchDiff > 500) {
                pullToRefresh.classList.add('visible');
                refresh = true
            } 
            else {
                pullToRefresh.classList.remove('visible');
                refresh = false
            }
            // e.preventDefault();
            // refresh = true
            // if (touchDiff > 0) {
            //     refresh = true
            // }
            // if (touchDiff <= 0) {
            //     refresh = false
            // }
          }
        });
        document.addEventListener('touchend', e => {
            if (refresh) {
                if (pullToRefresh.classList.contains('visible')) {
                    pullToRefresh.classList.remove('visible');
                    window.location.reload();
                }
            }
        });
    })
    
    // useEffect(() => {
    // onSnapshot(query(collection(dbservice, 'num'), orderBy('creatorClock', 'desc')), (snapshot) => {
    //     const newArray = snapshot.docs.map((document) => {
    //         return ({
    //             id: document.id,
    //             ...document.data(),
    //         })
    //     });
    //     setMessages(newArray)
    // })
    // }, [])
    useEffect(() => {
    const newArray = async () => {
        const {data, error} = await supabase.from('cards').select()
        setMessages(data)
    }
    setInterval(() => {
        newArray()
    }, 1000)
    }, [])
    
    const onCounting = (msg) => {
        // setCounter([
        //     ...counter,
        //     msg.id
        // ])
        tmpCounter.push(msg.id)
    }
    
    // const onClick = () => {
    //     setChoose(true)
    // }

    useEffect(() => {
        setCounter(tmpCounter)
    })
  
    return (
        <div className='flex justify-center flex-col pb-5'>
            {/* <div className='flex justify-center border border-sky-500'>
                내 상태
            </div> */}
            <div className="pull-to-refresh">
                {/* <span>Loading</span> */}
                <Box sx={{ width: '100%' }}>
                    <LinearProgress />
                </Box>
            </div>
            <div className='flex justify-start text-2xl p-5'>
                내 상태
            </div>
            <div>
                <div className='flex justify-center'>
                    <div className='w-6/12 flex flex-col border border-sky-500 rounded'>
                        <div className='flex justify-center'>등록 카드</div>
                        <div className='flex justify-center flex-wrap'>
                            {messages.map((msg) => {
                                if(msg.creatorid === userObj.id) {
                                    if(msg.round !== 4) {
                                        if (counter.indexOf(msg.id) === -1) {
                                            onCounting(msg)
                                        }
                                        return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorid === userObj.id} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter} setValue={setValue} displayName={displayName} />)
                                    }
                                }
                            })}
                        </div>
                    </div>
                    <div className='w-6/12 flex flex-col border border-sky-500 rounded'>
                        <div className='flex justify-center'>승낙 카드</div>
                            <div className='flex justify-center flex-wrap'>
                                {messages.map((msg) => {
                                    if(msg.connectedid === userObj.id) {
                                        if (msg.round !== 4) {
                                            if (counter.indexOf(msg.id) === -1) {
                                                onCounting(msg)
                                            }
                                            return(<Message key={msg.id} msgObj={msg} isOwner={msg.creatorid === userObj.id} userObj={userObj} isLoggedIn={isLoggedIn} counter={counter} setCounter={setCounter} setValue={setValue} displayName={displayName} />)
                                        }
                                    }
                                })}
                            </div>
                    </div>
                </div>
            </div>
            {/* <Avatar sx={{ bgcolor: blue[500] }} alt="Remy Sharp" src="./assets/groups.png" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Travis Howard" src="/static/images/avatar/2.jpg" />
            <Avatar sx={{ bgcolor: blue[500] }} alt="Cindy Baker" src="/static/images/avatar/3.jpg" /> */}
        </div>  
    )
}

export default Menu
