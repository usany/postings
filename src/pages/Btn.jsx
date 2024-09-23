import { useState } from 'react'
import { dbservice } from 'src/baseApi/serverbase'
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import Dialogs from 'src/muiComponents/Dialogs';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import {supabase} from 'src/baseApi/base';

function Btn({ msgObj, isOwner, uid, displayName, isLoggedIn, num, points, setValue, counter, setCounter, messages, setMessages }) {
  const [move, setMove] = useState(false)

  // const onDeleteClick = () => {
  //   const data = doc(dbservice, `num/${msgObj.id}`)
  //   deleteDoc(data)
  // }

  // const onClicking = (action) => {
  //   const data = doc(dbservice, `num/${msgObj.id}`)
  //   if (action === 'delete') {
  //     deleteDoc(data)
  //     const [msgObj, ...newCounter] = counter
  //     setCounter([
  //       ...newCounter
  //     ])
  //   } else if (action === 'confirm return') {
  //     updateDoc(data, {round: 5});
  //     const point = doc(dbservice, `members/${msgObj.creatorId}`)
  //     const connectedPoint = doc(dbservice, `members/${msgObj.connectedId}`)

  //     if (msgObj.text.choose == 1) {
  //       updateDoc(point, {points: num-msgObj.point});
  //       updateDoc(connectedPoint, {points: points+msgObj.point});
  //     } else {
  //       updateDoc(point, {points: num+msgObj.point});
  //       updateDoc(connectedPoint, {points: points-msgObj.point});
  //     }
  //   } else if (action === 'confirm') {
  //     updateDoc(data, {round: 3});
  //   } else if (action === 'returning') {
  //     updateDoc(data, {round: 4});
  //   } else if (action === 'supporting') {
  //     if (isLoggedIn) { 
  //       updateDoc(data, {round: 2, connectedId: uid, connectedName: displayName});
  //     } else {
  //       setMove(true)
  //     }
  //   } else if (action === 'stop supporting') {
  //     if (isLoggedIn) { 
  //       updateDoc(data, {round: 1, connectedId: null, connectedName: null});
  //     }
  //   }
  // }
  const onClick = async (action) => {
    // const data = doc(dbservice, `num/${msgObj.id}`)
    // const {data, error} = await supabase.from('cards').select().eq('id', msgObj.id)
    // console.log(data)
    if (action === 'delete') {
      // deleteDoc(data)
      await supabase.from('cards').delete().eq('id', msgObj.id)
      // const [msgObj, ...newCounter] = counter
      // setCounter([
      //   ...newCounter
      // ])
    } else if (action === 'confirm return') {
      // updateDoc(data, {round: 5});
      // const point = doc(dbservice, `members/${msgObj.creatorId}`)
      // const connectedPoint = doc(dbservice, `members/${msgObj.connectedId}`)
      await supabase.from('cards').update({round: 4}).eq('id', msgObj.id)
      // const point = await supabase.from('practices').select('points').eq('id', msgObj.creatorid)
      // const connectedPoint = await supabase.from('practices').select('points').eq('id', msgObj.connectedId)
      if (msgObj.action == '0') {
        console.log(num)
        console.log(msgObj.points)
        console.log(points)
        // updateDoc(point, {points: num-msgObj.point});
        // updateDoc(connectedPoint, {points: points+msgObj.point});
        await supabase.from('practices').update({points: num-msgObj.points}).eq('id', msgObj.creatorid)
        await supabase.from('practices').update({points: points+msgObj.points}).eq('id', msgObj.connectedid)
      } else {
        // updateDoc(point, {points: num+msgObj.point});
        // updateDoc(connectedPoint, {points: points-msgObj.point});
        console.log(num)
        console.log(msgObj.points)
        console.log(points)
        await supabase.from('practices').update({points: num+msgObj.points}).eq('id', msgObj.creatorid)
        await supabase.from('practices').update({points: points-msgObj.points}).eq('id', msgObj.connectedid)
      }
    } else if (action === 'confirm') {
      // updateDoc(data, {round: 3});
      await supabase.from('cards').update({round: 2}).eq('id', msgObj.id)
    } else if (action === 'returning') {
      // updateDoc(data, {round: 4});
      await supabase.from('cards').update({round: 3}).eq('id', msgObj.id)
    } else if (action === 'supporting') {
      if (isLoggedIn) { 
        console.log(num)
        // updateDoc(data, {round: 2, connectedId: uid, connectedName: displayName});
        await supabase.from('cards').update({round: 1, connectedid: uid, connectedusername: displayName}).eq('id', msgObj.id)
      } else {
        setMove(true)
      }
    } else if (action === 'stop supporting') {
      if (isLoggedIn) { 
        // updateDoc(data, {round: 1, connectedId: null, connectedName: null});
        await supabase.from('cards').update({round: 0, connectedid: null, connectedusername: null}).eq('id', msgObj.id)
      }
    }
  }
  const handleClose = () => {
    setMove(false);
  };

  return (
    <>
      {isOwner &&
        <>
          {msgObj.round === 0 && 
            <div className='flex flex-col justify-center'>
              <Button variant='outlined' onClick={() => onClick('delete') } endIcon={<DeleteIcon />}>지우기</Button>
            </div>
          }
          {msgObj.round === 1 &&
            <Button variant='outlined' onClick={() => {
              return (
                onClick('confirm')
              )
            }}
            endIcon={<SendIcon />}>승낙 메시지 확인</Button>
          }
          {msgObj.round === 2 &&
            <div className='flex justify-center'>
              {msgObj.action == '0' && 
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('returning')
                )
                }}
                endIcon={<SendIcon />}>반납하기</Button>
              }
              {msgObj.action == '1' && 
              <Button variant='outlined' disabled>{displayName} 님이 빌리는 중</Button>}
            </div>
          }
          {msgObj.round === 3 &&
            <div className='flex justify-center'>
              {msgObj.action == '0' && 
              <Button variant='outlined' disabled>주인에게 확인 중</Button>}
              {msgObj.action == '1' && 
              <Button variant='outlined' 
              onClick={() => onClick('confirm return')} 
              endIcon={<SendIcon />}>반납 완료 확인</Button>}
            </div>
          }
        </>
      }
      {!isOwner &&
        <div>
          {msgObj.round === 0 &&
            <div className='flex justify-center'>
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('supporting')
                )
              }}
              endIcon={<SendIcon />}>승낙하기</Button>
              <Dialogs move={move} handleClose={handleClose} setValue={setValue}/>
            </div>
          }
          {msgObj.round === 1 &&
            <div className='flex flex-col justify-center'>
              <Button variant='contained' 
                disabled
              >승낙 메시지 전송 완료</Button>
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('stop supporting')
                )
              }}
              endIcon={<SendIcon />}>취소</Button>
            </div>
          }
          {msgObj.round === 2 &&
            <div className='flex justify-center'>
              {msgObj.action == '0' && 
              <Button variant='outlined' disabled>{msgObj.creatorusername} 님이 빌리는 중</Button>}
              {msgObj.action == '1' && 
              <Button variant='outlined' onClick={() => {
                return (
                  onClick('returning')
                )
                }}
              endIcon={<SendIcon />}>반납하기</Button>
              }
            </div>
          }
          {msgObj.round === 3 &&
            <div className='flex justify-center'>
              {msgObj.action == '0' && 
              <Button variant='outlined' onClick={() => onClick('confirm return')} endIcon={<SendIcon />}>반납 완료 확인</Button>}
              {msgObj.action == '1' && 
              <Button variant='outlined' disabled>주인에게 확인 중</Button>}
            </div>
          }
        </div>  
      }
    </>
  )
}

export default Btn
