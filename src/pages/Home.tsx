import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
// import Navigations from 'src/navigate/Navigations'
// import Avatars from 'src/muiComponents/Avatars'
// import { dbservice } from 'src/baseApi/serverbase'
// import Navigation from 'src/navigate/Navigation'
import { SwipeableViews } from "src/navigate/SwipeableViews";

function Home({ displayName, isLoggedIn, userObj, value, newAccount, setNewAccount, setValue, counter, setCounter, tmpCounter, bottomNavigation, setBottomNavigation }) {
    // const [style, setStyle] = useState<React.CSSProperties>({});
    // const [childStyle, setChildStyle] = useState<React.CSSProperties>({});
    // const [points, setPoints] = useState<number>(0)
    // const checking = () => {
    //     setCheck(!check)
    // }
    
    // useEffect(() => {
    //     onSnapshot(query(doc(dbservice, `members/${userObj.uid}`)), (snapshot) => {
    //         if (isLoggedIn) {
    //             const number = snapshot.data().points
    //             setPoints(number)
    //         }
    //     })
    // }, [])
    // console.log(value)
    useEffect(() => {
        if (bottomNavigation === 5) {
            setBottomNavigation(1)
        }
    })    
    return (
        <div>
            {isLoggedIn && 
            <div>
                {/* <div className='flex justify-center'>좋은 날씨네요 {userObj.displayName} 님</div>
                {isLoggedIn && <div className='flex justify-center'>내 포인트: {points}</div>} */}
                {bottomNavigation === 1 && 
                    <Menu displayName={displayName} isLoggedIn={isLoggedIn} userObj={userObj} counter={counter} setCounter={setCounter} setValue={setValue} tmpCounter={tmpCounter} />
                }
                {[0].indexOf(bottomNavigation) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={value}
                        onIndexChange={setValue}
                        num={1}
                        // initial={[0, 4]}
                        // setInitial={setInitial}
                    >
                        <div>
                            <Add displayName={displayName} userObj={userObj} valuing={0}/>
                        </div>
                        <div>
                            <Add displayName={displayName} userObj={userObj} valuing={1}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
                {[2].indexOf(bottomNavigation) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={value}
                        onIndexChange={setValue}
                        num={1}
                        // initial={[1, 3]}
                    >
                        <div>
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                        <div>
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={3} setValue={setValue} counter={counter} setCounter={setCounter}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
            </div>
            }
            {!isLoggedIn &&
                <>
                    {bottomNavigation === 0 &&
                        <Notice displayName={displayName} isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue}/>
                    }
                    {bottomNavigation === 1 &&
                        <Auth newAccount={newAccount} setNewAccount={setNewAccount} userObj={userObj} valuing={value} setValue={setValue}/>
                    }
                    {bottomNavigation === 2 &&
                        <Notice displayName={displayName} isLoggedIn={isLoggedIn} userObj={userObj} valuing={4} setValue={setValue}/>
                    }
                </>
            }
        </div>
    )
}

export default Home