import { useState, useEffect } from 'react'
import { doc, onSnapshot, query } from 'firebase/firestore';
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import Navigations from 'src/navigate/Navigations'
import Avatars from 'src/muiComponents/Avatars'
import { dbservice } from 'src/baseApi/serverbase'
import Navigation from 'src/navigate/Navigation'

function Home({ isLoggedIn, userObj, setUserObj, value, newAccount, setNewAccount, side, setSide, sideNavigation, setSideNavigation, setValue, check, setCheck, counter, setCounter}) {
    const [num, setNum] = useState(null)
    const checking = () => {
        setCheck(!check)
    }
    
    useEffect(() => {
        onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
            if (isLoggedIn) {
                const number = snapshot.data().points
                setNum(number)
            }
        })
    }, [])
    
    return (
        <div>
            <div>
                {/* <div onClick={checking}>
                    {userObj &&
                        <Avatars altName={userObj.displayName}/>
                    }
                    {!userObj &&
                        <Avatars />
                    }
                </div> */}
                {isLoggedIn && 
                    <>
                        <div className='flex justify-center'>좋은 날씨네요 {userObj.displayName} 님</div>
                        {isLoggedIn && <div className='flex justify-center'>내 포인트: {num}</div>}
                        {value === 0 && 
                            <Add isLoggedIn={isLoggedIn} userObj={userObj} valuing={value}/>
                        }
                        {value === 1 &&
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={value} setValue={setValue}/>
                        }
                        {value === 2 && <Menu isLoggedIn={isLoggedIn} userObj={userObj} counter={counter} setCounter={setCounter} setValue={setValue} />}
                        {value === 3 && 
                            <Add isLoggedIn={isLoggedIn} userObj={userObj} valuing={value}/>
                        }
                        {value === 4 &&
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={value} setValue={setValue}/>
                        }
                    </>
                }
                {!isLoggedIn &&
                    <>
                        {value === 0 &&
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue}/>
                        }
                        {value === 1 &&
                            <Auth newAccount={newAccount} setNewAccount={setNewAccount} userObj={userObj} valuing={value}/>
                        }
                        {value === 2 &&
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={4} setValue={setValue}/>
                        }
                    </>
                }
            </div>
        </div>

    )
}

export default Home