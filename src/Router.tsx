import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Profile from 'src/pages/Profile'
import Ranking from 'src/pages/Ranking'
import Specific from 'src/pages/Specific'
import Contact from 'src/pages/Contact'
import Notification from 'src/pages/Notification'
import Header from 'src/navigate/Header'
import Navigation from 'src/navigate/Navigation'
import Navigations from 'src/navigate/Navigations'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
// import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import ToggleTabs from 'src/muiComponents/Tabs'
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import Snackbars from 'src/muiComponents/Snackbars'
import {supabase} from 'src/baseApi/base';

const tmpCounter = []
const Router = ({ isLoggedIn, userObj, setUserObj, newAccount, setNewAccount, setMode } :{
    isLoggedIn: boolean,
    userObj: object,
    setUserObj: () => void,
    newAccount: boolean,
    setNewAccount: () => void,
    setMode: () => void
}) => {
    const [counter, setCounter] = useState<Array<object>>([]);
    const [value, setValue] = useState<number>(0);
    const [bottomNavigation, setBottomNavigation] = useState<number>(1);
    const [check, setCheck] = useState<boolean>(false)
    const [scroll, setScroll] = useState<number>(0)
    const [profileColor, setProfileColor] = useState('#2196f3')
    const [displayName, setDisplayName] = useState('')

    // const tmpCounter = []
    useEffect(() => {
        if (!check) {
            setTimeout(() => window.scrollTo({
                top: scroll,
                behavior: "smooth"
            }), 15);
            // setTimeout(() => document.querySelector('#navigationSelectorOne').classList.add('fixed', 'top-0', 'z-20', 'bg-light-1'), 500);
            // setTimeout(() => document.querySelector('#navigationSelectorTwo').classList.add('fixed', 'top-0', 'z-10', 'bg-light-1'), 500);
            // scrolling = window.scrollY
            // }
            // setTimeout(() => window.scrollTo({top: scroll}), 1);
            // window.scrollTo({top: 100})
            // ref.current.scrollIntoView({ behavior: 'smooth' })
        }
    })
    useEffect(() => {
        const checkUsername = async () => {
          const values = (await supabase
            .from('practices')
            .select()
            .eq('id', userObj.id)).data?.map((element) => element.username)[0]
            setDisplayName(
              values
            )
        }
        if (userObj) {
          checkUsername()
        }
      }, [userObj])
    const sides = []
    if (check === false) {
        // sides.push(
        //     'flex flex-col'
        // )
        // sides.push(
        //     'border border-sky-500 rounded-t fixed bottom-0 start-0 end-0'
        // )
    } else {
        sides.push(
            'fixed'
        )
        // sides.push(
        //     'fixed border border-sky-500 rounded-t bottom-0 start-0 end-0'
        // )
    }

    // keep track of previous scroll position
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', function () {
        // current scroll position
        const currentScrollPos = window.scrollY;
        if (prevScrollPos >= currentScrollPos) {
            // user has scrolled up
            document.querySelector('#navigationSelectorOne')?.classList.add('fixed', 'top-0', 'z-20', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#navigationSelectorTwo')?.classList.add('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#contentSelector')?.classList.add('pt-16')
        } else {
            // user has scrolled down
            document.querySelector('#navigationSelectorOne')?.classList.remove('fixed', 'top-0', 'z-20', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#navigationSelectorTwo')?.classList.remove('fixed', 'top-0', 'z-10', 'bg-light-3', 'dark:bg-dark-3')
            document.querySelector('#contentSelector')?.classList.remove('pt-16')
        }
        // update previous scroll position
        prevScrollPos = currentScrollPos;
    });
    console.log(isLoggedIn)
    // useEffect(() => {
    //     if (check) {
    //         document.getElementsByClassName('location')[0].style.top = `-${prevScrollPos}px`
    //     }
    // })
    return (
        <BrowserRouter>
            <div className={sides[0] + ' flex flex-col location'}>
                <Notification />
                <Header
                    bottomNavigation={bottomNavigation}
                    setBottomNavigation={setBottomNavigation}
                    scroll={scroll}
                    setScroll={setScroll} 
                    isLoggedIn={isLoggedIn} 
                    userObj={userObj} 
                    setUserObj={setUserObj} 
                    setValue={setValue} 
                    check={check} setCheck={setCheck} setMode={setMode} prevScrollPos={prevScrollPos} value={value}
                    profileColor={profileColor}
                    displayName={displayName}
                />
                <div 
                    id='contentSelector'
                >
                    <Routes>
                        {
                            isLoggedIn ? (
                                <Route>
                                    <Route path='/postings/' Component={() => <Home displayName={displayName} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} tmpCounter={tmpCounter} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} />} />
                                    <Route path='/postings/profile' Component={() => <Profile displayName={displayName} setDisplayName={setDisplayName} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} setBottomNavigation={setBottomNavigation} setProfileColor={setProfileColor}/>} />
                                    <Route path='/postings/ranking' Component={() => <Ranking isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} setBottomNavigation={setBottomNavigation} />} />
                                    <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/postings/contact' Component={() => <Contact displayName={displayName} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                </Route>
                            ) : (
                                <Route>
                                    <Route path='/postings/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{ uid: null }} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} />} />
                                    <Route path='/postings/profile' Component={() => <Profile displayName={displayName} setDisplayName={setDisplayName} isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} setBottomNavigation={setBottomNavigation} setProfileColor={setProfileColor}/>} />
                                    <Route path='/postings/ranking' Component={() => <Ranking isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} setBottomNavigation={setBottomNavigation} />} />
                                    <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    {/* <Route path='/postings/contact' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} /> */}
                                </Route>
                            )
                        }
                    </Routes>
                </div>
                <Navigations bottomNavigation={bottomNavigation} setBottomNavigation={setBottomNavigation} scroll={scroll} setScroll={setScroll} sides={sides[1]} counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} tmpCounter={tmpCounter}/>
            </div>
        </BrowserRouter>
    )
}

export default Router