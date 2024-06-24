import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import 'src/navigate/Navigation.css'
import Modes from 'src/Modes'

const onLogOutClick = () => auth.signOut();
function Navigation({ isLoggedIn, userObj, setUserObj, setValue, check, setCheck }) {
  const checkbox = (event) => {
    setCheck(false)
    // document.getElementById('nav-control').checked = false
    // document.getElementsByClassName('navigation')[0].style.left = '-100%'
  }

  // const handleClick = (event) => {
  //   if(document.getElementsByClassName('navigation')[0].style.left === '-100%') {
  //     document.getElementsByClassName('navigation')[0].style.left = ''
  //   } else if (document.getElementsByClassName('navigation')[0].style.left === '0') {
  //     document.getElementById('nav-control').checked = false
  //     document.getElementsByClassName('navigation')[0].style.left = '-100%'
  //   }
  // };
  
  // let offsetX
  // let offsetSide
  // const add = (event) => {
  //   offsetX = event.clientX-event.target.getBoundingClientRect().left
  //   offsetSide = event.clientX-event.target.getBoundingClientRect().right
  //   // console.log(offsetX)
  //   // console.log(offsetSide)
  //   event.target.addEventListener('pointermove', move)
  //   event.target.addEventListener('touchmove', move)
  // }
  // const remove = (event) => {
  //   event.target.removeEventListener('pointermove', move)
  //   event.target.removeEventListener('touchmove', move)
  //   // event.target.style.left = '-100%'
  //   if (event.pageX-offsetX < 0) {
  //     event.target.style.left = '-100%'
  //   }
  //   checkbox(event)
  // }
  // const move = (event) => {
  //   const el = event.target
  //   if (event.pageX-offsetX < 0) {
  //     el.style.left = `${event.pageX-offsetX}px`
  //     document.getElementsByClassName('naving')[0].style.left=`${event.pageX-offsetSide}px`
  //     document.getElementsByClassName('naving')[1].style.left=`${event.pageX-offsetSide}px`
  //   }    
  //   event.target.style.left = '-100%'
  // }
  
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
      'fixed top-0 bottom-0 overflow-hidden navigation'
  //     position: fixed;
  // top: 0;
  // bottom: 0;
  // left: -100%;
  // overflow: hidden;
    )
  }

  // var active = false;
  //   var currentX;
  //   var currentY;
  //   var initialX;
  //   var initialY;
  //   var xOffset = 0;
  //   var yOffset = 0;
  
  //   function dragStart(e) {
  //     if (e.type === "touchstart") {
  //       initialX = e.touches[0].clientX - xOffset;
  //       initialY = e.touches[0].clientY - yOffset;
  //     } else {
  //       initialX = e.clientX - xOffset;
  //       initialY = e.clientY - yOffset;
  //     }

  //     // if (e.target === dragItem) {
  //     //   active = true;
  //     // }
  //   }

  //   function dragEnd(e) {
  //     initialX = currentX;
  //     initialY = currentY;
  //     console.log(e)
  //     if (e.pageX-offsetX < 0) {
  //       e.target.style.left = '-100%'
  //     }
  //     checkbox(event)
  //   }

  //   function drag(e) {
  //       e.preventDefault();
      
  //       if (e.type === "touchmove") {
  //         currentX = e.touches[0].clientX - initialX;
  //         currentY = e.touches[0].clientY - initialY;
  //       } else {
  //         currentX = e.clientX - initialX;
  //         currentY = e.clientY - initialY;
  //       }

  //       xOffset = currentX;
  //       yOffset = currentY;

  //       // setTranslate(currentX, currentY, dragItem);
  //       const el = e.target
  //         el.style.left = `${e.pageX-xOffset}px`
  //         console.log(document.getElementsByClassName('naving')[0])
  //         document.getElementsByClassName('naving')[0].style.left=`${e.pageX-xOffset}px`
  //         document.getElementsByClassName('naving')[1].style.left=`${e.pageX-xOffset}px`
  //   }

  //   function setTranslate(xPos, yPos, el) {
  //     el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
  //   }

  return(
    // <ClickAwayListener onClickAway={() => setCheck(false)}>
      <div>
        {isLoggedIn && 
        <nav 
          className={navigation[0]}
          // onTouchStart={(event) => add(event, 'touch')}
          // onTouchMove={(event) => add(event)}
          // onTouchEnd={(event) => remove(event)}
          // onPointerDown={(event) => add(event)} 
          // onPointerUp={(event) => remove(event)}
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
            // onTouchEnd={(event) => remove(event)}
            // onPointerDown={(event) => add(event)} 
            // onPointerUp={(event) => remove(event)}
          >
            {/* <h5 
            className='nav-padding' 
            onClick={() => setCheck(false)}
            > */}
            <Modes setCheck={setCheck}/>
            {/* </h5> */}
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
      // </ClickAwayListener>
    )
}

export default Navigation