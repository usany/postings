import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from 'src/pages/Home'
import Profile from 'src/pages/Profile'
import Ranking from 'src/pages/Ranking'
import Specific from 'src/pages/Specific'
import Navigation from 'src/navigate/Navigation'
import Navigations from 'src/navigate/Navigations'
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

function Router({ isLoggedIn, userObj, setUserObj, newAccount, setNewAccount }) {
    const [counter, setCounter] = useState([]);
    const [value, setValue] = useState(2);
    // const [side, setSide] = useState('flex flex-col');
    // const [sideNavigation, setSideNavigation] = useState('border border-sky-500	rounded-t fixed bottom-0 start-0 end-0');
    const [check, setCheck] = useState(false)
    const [scroll, setScroll] = useState(0)
    const [sideNavigation, setSideNavigation] = useState(
        {
            display: false,
            scrollLocation: 0
        }
    )

    const ref = useRef(null)
    let scrolling = 0
    useEffect(() => {
        if (!check) {
            // while (scrolling === 0) {
            // console.log(scroll)
            setTimeout(() => window.scrollTo({
                top: scroll,
                behavior: "smooth"
            }), 5);
            // setTimeout(() => document.querySelector('#navigationSelectorOne').classList.add('fixed', 'top-0', 'z-20', 'bg-light-1'), 500);
            // setTimeout(() => document.querySelector('#navigationSelectorTwo').classList.add('fixed', 'top-0', 'z-10', 'bg-light-1'), 500);
            // scrolling = window.scrollY
            // }
            // setTimeout(() => window.scrollTo({top: scroll}), 1);
            // window.scrollTo({top: 100})
            // ref.current.scrollIntoView({ behavior: 'smooth' })
        }
    })
    const sides = []
    if (check === false) {
        sides.push(
            'flex flex-col location'
        )
        sides.push(
            'border border-sky-500 rounded-t fixed bottom-0 start-0 end-0'
        )
        // console.log(
        //     document.getElementsByClassName('location')[0]
        // )
        // document.getElementsByClassName('location')[0].style.top=`-${prevScrollPos}px`
    } else {
        sides.push(
            'fixed left-2/3 w-full flex flex-col location'
        )
        sides.push(
            'fixed left-2/3 w-full border border-sky-500 rounded-t bottom-0 end-0'
        )
    }

    // keep track of previous scroll position
    let prevScrollPos = window.scrollY;
    window.addEventListener('scroll', function () {
        // current scroll position
        const currentScrollPos = window.scrollY;

        if (prevScrollPos >= currentScrollPos) {
            // user has scrolled up
            document.querySelector('#navigationSelectorOne').classList.add('fixed', 'top-0', 'z-20', 'bg-light-1')
            document.querySelector('#navigationSelectorTwo').classList.add('fixed', 'top-0', 'z-10', 'bg-light-1')
            document.querySelector('#contentSelector').classList.add('pagings')
        } else {
            // user has scrolled down
            // console.log('prev')
            // console.log(prevScrollPos)
            // console.log('current')
            // console.log(currentScrollPos)
            document.querySelector('#navigationSelectorOne').classList.remove('fixed', 'top-0', 'z-20', 'bg-light-1')
            document.querySelector('#navigationSelectorTwo').classList.remove('fixed', 'top-0', 'z-10', 'bg-light-1')
            document.querySelector('#contentSelector').classList.remove('pagings')
        }

        // update previous scroll position
        prevScrollPos = currentScrollPos;
    });

    return (
        <BrowserRouter>
            <div className={sides[0] + ' location'}>
                <div className='flex flex-row'>
                    <ClickAwayListener onClickAway={() => {
                        setCheck(false)
                        // setScroll(prevScrollPos)
                        // console.log(
                        //     document.getElementsByClassName('location')[0].style.top
                        // )
                        // prevScrollPos = -document.getElementsByClassName('location')[0].style.top
                        // document.getElementsByClassName('location')[0].style.top=`-${prevScrollPos}px`
                    }}>
                        <div id='navigationSelectorOne' className='w-10 pt-5'>
                            <Navigation isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} setValue={setValue} check={check} setCheck={setCheck} />
                            {userObj ?
                                <Avatar alt={userObj.displayName} sx={{ bgcolor: blue[500] }} src='./src' onClick={() => {
                                    setCheck(!check)
                                    setScroll(prevScrollPos)
                                    // console.log(prevScrollPos)
                                    // console.log(
                                    //     document.getElementsByClassName('location')[0].style.top
                                    // )
                                    document.getElementsByClassName('location')[0].style.top = `-${prevScrollPos}px`
                                    // document.querySelector('#navigationSelectorOne').classList.add('fixed', 'top-0', 'z-20', 'bg-light-1')
                                    // document.querySelector('#navigationSelectorTwo').classList.add('fixed', 'top-0', 'z-10', 'bg-light-1')                                
                                    // console.log(
                                    //     document.getElementsByClassName('location')[0].style.top
                                    // )
                                }} />
                                :
                                <Avatar sx={{ bgcolor: blue[500] }} onClick={() => setCheck(!check)} />
                            }
                        </div>
                    </ClickAwayListener>
                    <div id='navigationSelectorTwo' className='w-full h-15'></div>
                </div>
                <div id='contentSelector'>
                    <Routes>
                        {
                            isLoggedIn ? (
                                <Route>
                                    <Route path='/postings/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/postings/profile' Component={() => <Profile isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/postings/ranking' Component={() => <Ranking isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    {/* <Route path='/posting/sign' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount}/>}/> */}
                                </Route>
                            ) : (
                                <Route>
                                    <Route path='/postings/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{ uid: null }} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />} />
                                    {/* <Route path='/posting/sign' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{uid: null}} value={1} newAccount={newAccount} setNewAccount={setNewAccount}/>}/> */}
                                </Route>
                            )
                        }
                    </Routes>
                </div>
                <Navigations sides={sides[1]} counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} />
            </div>
        </BrowserRouter>
    )
}

export default Router