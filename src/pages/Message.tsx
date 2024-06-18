import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Btn from 'src/pages/Btn';
import Avatars from 'src/muiComponents/Avatars';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import { BrowserRouter, Routes, Route, useNavigate, Link } from 'react-router-dom'
import Papers from 'src/muiComponents/Papers';
import Cards from 'src/muiComponents/Cards';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { blue } from '@mui/material/colors';

function Message({ msgObj, isOwner, userObj, isLoggedIn, counter, setCounter, setValue }) {
  const [num, setNum] = useState(null)
  const [points, setPoints] = useState(null)

  useEffect(() => {
    onSnapshot(query(doc(dbservice, `members/${msgObj.creatorId}`)), (snapshot) => {
        const number = snapshot.data().points
        setNum(number)
      }
    )
  }, [])
  useEffect(() => {
    if (msgObj.connectedId !== null) {
      onSnapshot(query(doc(dbservice, `members/${msgObj.connectedId}`)), (snapshot) => {
        const element = snapshot.data().points
        setPoints(element)
      })
    }
  })
  
  return (
    <div className='flex flex-col justify-center p-5'>
      <Cards msgObj={msgObj} isOwner={isOwner} userObj={userObj} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
      {/* <Papers action={'빌리기'} summary={
        <div>
          <div className='d-flex justify-content-center'>
          <Avatars altName={msgObj.displayName} />
            <FastRewindIcon />
          <Avatars />
        </div>
        <div className='d-flex justify-content-center'>{msgObj.text.counting} {msgObj.text.counter}</div>
        <div className='d-flex justify-content-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute}</div>
        <div className='d-flex justify-content-center'>~</div>
        <div className='d-flex justify-content-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute}</div>
        </div>
      }/> */}
      {/* <Btn msgObj={msgObj} isOwner={isOwner} userObj={userObj} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} /> */}
      {/* <Link 
        to='/postings/specific' 
        className='border border-primary btn rounded'
        state = {{
          msgObj: msgObj,
          isOwner: isOwner,
          isLoggedIn: isLoggedIn,
          num: num,
          value: points,
        }}
      >
        {msgObj.text.choose == 1 &&
          <div className='flex justify-center'>빌리기</div>
        }
        {msgObj.text.choose == 2 &&
          <div className='flex justify-content-center'>빌려주기</div>
        }
        <div className='d-flex justify-content-center'>
          <Avatars altName={msgObj.displayName} />
          <FastRewindIcon />
          <Avatars />
        </div>
        <div className='d-flex justify-content-center'>{msgObj.text.counting} {msgObj.text.counter}</div>
        <div className='d-flex justify-content-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute}</div>
        <div className='d-flex justify-content-center'>~</div>
        <div className='d-flex justify-content-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute}</div>
      </Link> */}
      {/* <Btn msgObj={msgObj} isOwner={isOwner} userObj={userObj} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} /> */}
    </div>
  )
}

export default Message
