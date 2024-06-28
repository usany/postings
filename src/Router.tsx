import { useState } from 'react'
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
    
    const sides = []
    if (check === false) {
        sides.push(
            'flex flex-col page'
        )
        sides.push(
            'border border-sky-500 rounded-t fixed bottom-0 start-0 end-0'
        ) 
    } else {
        sides.push(
            'naving flex flex-col page'
        )
        sides.push(
            'naving border border-sky-500 rounded-t bottom-0 end-0'
        ) 
    }
    // keep track of previous scroll position
let prevScrollPos = window.scrollY;

window.addEventListener('scroll', function() {
  // current scroll position
  const currentScrollPos = window.scrollY;

  if (prevScrollPos >= currentScrollPos) {
    // user has scrolled up
    // document.getElementsByClassName('pt-5 navbar')[0].add('border border-sky-500');
    document.querySelector('.navbar').classList.add('show')
    // document.querySelector('.page').classList.add('show')
    // document.querySelector('.navbar').classList.add('fixed')
    // document.querySelector('.navbar').classList.add('z-10')
    // console.log(document.querySelector('.navbar'))
  } else {
    // user has scrolled down
    // document.getElementsByClassName('pt-5 navbar')[0].remove('border border-sky-500');
    document.querySelector('.navbar').classList.remove('show')
    // document.querySelector('.page').classList.remove('show')
    // document.querySelector('.navbar').classList.remove('fixed')
    // document.querySelector('.navbar').classList.remove('z-10')
    // console.log(document.querySelector('.navbar'))
  }

  // update previous scroll position
  prevScrollPos = currentScrollPos;
});

    return (
        <BrowserRouter>
                <div className={sides[0]}>
                    <ClickAwayListener onClickAway={() => setCheck(false)}>
                        <div>
                            <Navigation isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} setValue={setValue} check={check} setCheck={setCheck}/>
                            <div
                                className='pt-5 navbar' 
                                // onClick={() => setCheck(!check)}
                            >
                                {userObj ? 
                                    <Avatar alt={userObj.displayName} sx={{ bgcolor: blue[500] }} src='./src' onClick={() => setCheck(!check)} />
                                :
                                    <Avatar sx={{ bgcolor: blue[500] }} onClick={() => setCheck(!check)} />
                                }
                            </div>
                        </div>
                    </ClickAwayListener>
                    <Routes>
                        {
                            isLoggedIn ? (
                                <Route>
                                    <Route path='/postings/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />}/>
                                    <Route path='/postings/profile' Component={() => <Profile isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                                    <Route path='/postings/ranking' Component={() => <Ranking isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                                    <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                                    {/* <Route path='/posting/sign' Component={() => <Home isLoggedIn={isLoggedIn} userObj={userObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount}/>}/> */}
                                </Route>
                            ) : (
                                <Route>
                                    <Route path='/postings/' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{uid: null}} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck} />}/>
                                    <Route path='/postings/specific' Component={() => <Specific isLoggedIn={isLoggedIn} userObj={userObj} setUserObj={setUserObj} value={value} newAccount={newAccount} setNewAccount={setNewAccount} setValue={setValue} counter={counter} setCounter={setCounter} check={check} setCheck={setCheck}/>}/>
                                    {/* <Route path='/posting/sign' Component={() => <Home isLoggedIn={isLoggedIn} userObj={{uid: null}} value={1} newAccount={newAccount} setNewAccount={setNewAccount}/>}/> */}
                                </Route>
                            )
                        }
                    </Routes>
                    <Navigations sides={sides[1]} counter={counter} isLoggedIn={isLoggedIn} value={value} setValue={setValue} />
                </div>
        </BrowserRouter>
    )
}

export default Router