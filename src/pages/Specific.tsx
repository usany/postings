import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Steppers from 'src/muiComponents/Steppers';
import Button from '@mui/material/Button';

function Specific() {
  const {state} = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state.isLoggedIn) {
      navigate('/postings/')
    }
  })

  const onClick = () => {
    navigate(-1)
  }
  return (
    <div>
      <Steppers msgObj={state.msgObj}/>
      {state.msgObj.round === 1 && 
        <div className='flex justify-center'>빌리기</div>
      }
      {state.msgObj.round === 2 && 
        <div className='flex justify-center'>빌려주기</div>
      }
      <div className='flex justify-center'>요청 유저 이름: {state.msgObj.displayName}</div>
      <div className='flex justify-center'>포인트: {state.msgObj.point}</div>
      <div className='flex justify-center'>열람실의 위치: {state.msgObj.text.counting}</div>
      <div className='flex justify-center'>좌석의 위치: {state.msgObj.text.counter}</div>
      <div className='flex justify-center'>이 때부터: {state.msgObj.text.clock.year}.{state.msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clock.hour}:{state.msgObj.text.clock.minute}</div>
      <div className='flex justify-center'>이 때까지: {state.msgObj.text.clock.year}.{state.msgObj.text.clock.month}.{state.msgObj.text.clock.day} {state.msgObj.text.clocker.hour}:{state.msgObj.text.clocker.minute}</div>
      <div className='flex justify-center'>승낙 유저 이름: {state.msgObj.connectedName}</div>
      <div className='flex justify-center'>진행 단계: {state.msgObj.round}</div>
      <Btn msgObj={state.msgObj} isOwner={state.isOwner} userObj={state.userObj} num={state.num} value={state.value} />
      <div className='flex justify-center'>
        <Button variant='outlined' onClick={onClick}>뒤로 가기</Button>
      </div>
    </div>
  )
}

export default Specific
