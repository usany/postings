import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Modes from 'src/Modes'

const onLogOutClick = () => auth.signOut();
function Navigation({ isLoggedIn, userObj, setUserObj, setValue, check, setCheck }) {
  const checkbox = (event) => {
    setCheck(false)
  }
  
  const logOut = (event) => {
    onLogOutClick()
    checkbox(event)
    setValue(1)
    setUserObj(null)
  }

  const navigation = []
  if (check) {
    navigation.push(
      'navigationChecked fixed top-0 bottom-0 left-0 z-10 w-2/3'
    )
  } else {
    navigation.push(
      'fixed top-0 bottom-0 overflow-hidden -left-full'
    )
  }

  return(
    <div>
      {isLoggedIn && 
      <nav 
        className={navigation[0]}
      >
        <Modes setCheck={setCheck}/>
        <h1 
        // className='nav-padding'
        >
          <Link to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
        </h1>
        <h1>
          <Link to='/postings/profile' onClick={(event) => checkbox(event)}>{userObj.displayName}의 프로필</Link>
        </h1>
        <h1>
          <Link to='/postings/ranking' onClick={(event) => checkbox(event)}>유저 랭킹</Link>
        </h1>
        <h1>
          <Link to="/postings/" onClick={(event) => {
            logOut(event)
          }}>로그아웃</Link>
        </h1>
      </nav>
      }
      {!isLoggedIn &&
        <nav 
          className={navigation[0]} 
        >
          <Modes setCheck={setCheck}/>
          <h1 
          // className='nav-padding'
          >
            <Link to='/postings/' onClick={(event) => checkbox(event)}>메인 페이지</Link>
          </h1>
          <h1>
            <Link to='/postings/' onClick={(event) => {
              checkbox(event)
              setValue(1)
            }}>로그인/회원가입</Link>
          </h1>
          <h1>
            <Link to="/postings/contact" onClick={(event) => checkbox(event)}>신고하기</Link>
          </h1>
        </nav>
      }
      </div>
    )
}

export default Navigation