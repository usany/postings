import { useState, useEffect } from 'react'
import Menu from 'src/pages/Menu'
import Notice from 'src/pages/Notice'
import Auth from 'src/pages/Auth'
import Add from 'src/pages/Add'
import { SwipeableViews } from "src/navigate/SwipeableViews";
// import { dbservice } from 'src/baseApi/serverbase'
// import Avatars from 'src/muiComponents/Avatars'
// import Navigation from 'src/navigate/Navigation'
// import Navigations from 'src/navigate/Navigations'

function Home({ isLoggedIn, userObj, value, newAccount, setNewAccount, setValue, counter, setCounter }) {
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
    
    useEffect(() => {
        if (value >= 5) {
            setValue(2)
        } 
    })
    
    return (
        <div>
            {isLoggedIn && 
            <div>
                {/* <div className='flex justify-center'>좋은 날씨네요 {userObj.displayName} 님</div>
                {isLoggedIn && <div className='flex justify-center'>내 포인트: {points}</div>} */}
                {value === 2 && 
                    <Menu isLoggedIn={isLoggedIn} userObj={userObj} counter={counter} setCounter={setCounter} setValue={setValue} />
                }
                {[0, 4].indexOf(value) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={value}
                        onIndexChange={setValue}
                        num={1}
                        // initial={[0, 4]}
                        // setInitial={setInitial}
                    >
                        <div>
                            <Add userObj={userObj} valuing={0} setValue={setValue}/>
                        </div>
                        <div>
                            <Add userObj={userObj} valuing={1} setValue={setValue}/>
                        </div>
                    </SwipeableViews>
                    </div>
                }
                {[1, 3].indexOf(value) !== -1 && 
                    <div>
                    <SwipeableViews
                        index={value-1}
                        onIndexChange={setValue}
                        num={2}
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
                <div>
                    {[0, 2].indexOf(value) !== -1 && <div>
                    <SwipeableViews
                        index={value}
                        onIndexChange={setValue}
                        num={0}
                        // initial={[1, 3]}
                    >
                        <div>
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue}/>
                        </div>
                        <div>
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={4} setValue={setValue}/>
                        </div>
                        {/* {value === 0 &&
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={1} setValue={setValue}/>
                        }
                        {value === 2 &&
                            <Notice isLoggedIn={isLoggedIn} userObj={userObj} valuing={4} setValue={setValue}/>
                        } */}
                    </SwipeableViews>
                    </div>}
                    {value === 1 &&
                        <Auth newAccount={newAccount} setNewAccount={setNewAccount} userObj={userObj} valuing={value}/>
                    }
                </div>
            }
        </div>
    )
}

export default Home