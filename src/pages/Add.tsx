import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import Lotties from 'src/lottiesAnimation/Lotties'
import Pickers from 'src/muiComponents/Pickers'
import Selects from 'src/muiComponents/Selects'
import Button from '@mui/material/Button';

function Add({ userObj, valuing }) {
//   const [choose, setChoose] = useState(0);
  const [count, setCount] = useState('');
  const [counter, setCounter] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [process, setProcess] = useState(false)
  const value: number[] = [0, 0]

//   const roomList = ['one', 'two', 'three', 'four', 'focus']
  const changeBuilding = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setCount(value);
  }
  const changeRoom = (event) => {
    event.preventDefault()
    const {
        target: {value},
    } = event;
    setCount(value);
  }
  const changeSeat = (event) => {
      event.preventDefault()
      const {
          target: {value},
      } = event;
      setCounter(value);
  }

  const submit = async (event) => {
      event.preventDefault()
      if(count !== 0 && counter !== 0 && from !== '' && to !== '') {
        if (from.gmt > to.gmt) {
            alert('시간을 확인해주세요')
        } else if (from.gmt < Date.now()) {
            alert('시간을 확인해주세요')    
        } else if (to.gmt < Date.now()) {
            alert('시간을 확인해주세요')    
        }
        else {
            console.log(to.year-from.year)
            console.log(to.month-from.month)
            console.log(to.day-from.day)
            console.log(to.hour-from.hour)
            console.log(to.minute-from.minute)

            if (to.year-from.year > 0) {
                value[0] = (to.year-from.year)*366*24*60
            } else if (to.month-from.month > 0) {
                value[0] = (to.month-from.month)*31*24*60
            } else if (to.day-from.day > 0) {
                value[0] = (to.day-from.day)*24*60
            } else if (to.hour-from.hour > 0) {
                value[0] = (to.hour-from.hour)*60
            } else if (to.minute-from.minute > 0) {
                value[0] = to.minute-from.minute
            }
            if (valuing === 0) {
                value[1] = 1
            } else {
                value[1] = 2
            }
            setProcess(true)
            await addDoc(collection(dbservice, 'num'), {
            point: value[0],
            displayName: userObj.displayName,
            text: {choose: value[1], 
                // count: count, 
                // counting: roomList[count-1],  
                counting: count,
                counter: counter, clock: from, clocker: to},
            round: 1,
            creatorClock: Date.now(),
            creatorId: userObj.uid,
            connectedId: null,
            connectedName: null,
            })
            // setChoose(0)
            setCount('')
            setCounter(0)
            setProcess(false)
        }
      } else {
          alert('내용을 입력해 주세요')
      }
    //   console.log(process)
  }

  const onChangeFrom = (event) => {
    setFrom({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
  }
  const onChangeTo = (event) => {
    setTo({gmt: event.$d, year: event.$y, month: event.$M+1, day:event.$D, hour: event.$H, minute: event.$m})
}   
  const roomOne = Array(181).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomFocus = Array(46).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomTwo = Array(315).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomThree = Array(156).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const roomFour = Array(149).fill().map((value, index) => <option key={index+1} value={index+1}>{index+1}</option>)
  const location = {
    cl : [
        '1열(1F)', 
        '2열(2F)', 
        '3열(2F)', 
        '4열(4F)', 
        '1층 책상', 
        '1층 세미나실', 
        '1층 집중열', 
        '매점(2F)', 
        '카페(1F)', 
        '중앙자료실 책상(3F)', 
        '참고열람실 책상(4F)', 
        '정기간행물 책상(4F)'
    ].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    cw : [
        '매점(B1)', 
        '글로벌존(B1)'
    ].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    p : ['매점(1F)'].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    g : ['카페(B2)', '열람실(B2)'].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    k : ['카페'].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    m : ['복사실'].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    e : ['1열(5F)', '2열(6F)'].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    c : ['1층 로비'].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
    j : ['1층'].map((value, index) => <option key={index+1} value={index+1}>{value}</option>),
}

  return (
    <div className='flex flex-col'>
        <div>
            {valuing === 0 &&
                <div className='flex justify-center border border-sky-500'>
                    빌릴래요
                </div>
            }
            {valuing === 3 &&
                <div className='flex justify-center border border-sky-500'>
                    빌려줄래요
                </div>
            }
        </div>
        {valuing !== null &&
            <div>
                {!process && 
                <div>
                    {/* <div className='flex justify-center'>위치가 어디인가요</div> */}
                    <div className='flex justify-center'>
                        <select className='dark:bg-black rounded border border-sky-500' form='selection' defaultValue={0} onChange={changeRoom}>
                            <option value={0} disabled>열람실을 알려주세요</option>
                            <option value={'one'}>one</option>
                            <option value={'focus'}>focus</option>
                            <option value={'two'}>two</option>
                            <option value={'three'}>three</option>
                            <option value={'four'}>four</option>
                            <option value={'중도'}>중도</option>
                            <option value={'청운'}>청운</option>
                            <option value={'푸른솔'}>푸른솔</option>
                            <option value={'간호이과대'}>간호이과대</option>
                            <option value={'경영대'}>경영대</option>
                            <option value={'문과대'}>문과대</option>
                            <option value={'의과대'}>의과대</option>
                            <option value={'치과병원'}>치과병원</option>
                        </select>
                        <Selects count={count} changeBuilding={changeBuilding} changeRoom={changeRoom} changeSeat={changeSeat}/>
                        {count !== '' && 
                            <select className='rounded border border-sky-500' form='selection' defaultValue={0} onChange={changeSeat}>  
                                {/* <option value={0} disabled>좌석을 알려주세요</option> */}
                                <option value={0} disabled>{count} 어딘가요</option>
                                {count == 'one' && roomOne}
                                {count == 'focus' && roomFocus}
                                {count == 'two' && roomTwo}
                                {count == 'three' && roomThree}
                                {count == 'four' && roomFour}
                                {count == '중도' && location.cl}
                                {count == '청운' && location.cw}
                                {count == '푸른솔' && location.p}
                                {count == '간호이과대' && location.g}
                                {count == '경영대' && location.k}
                                {count == '문과대' && location.m}
                                {count == '의과대' && location.e}
                                {count == '치과병원' && location.c}
                            </select>
                        }
                    </div>
                    <div>언제부터 언제까지인가요</div>
                    <div className='flex justify-center'>
                        <Pickers onChange={onChangeFrom} label={"이 때부터"} />
                        <Pickers onChange={onChangeTo} label={"이 때까지"} />
                    </div>
                    <div className='flex justify-center'>
                        <form id='selection' onSubmit={submit}>
                            <Button variant='outlined' form='selection' type='submit'>등록하기</Button>
                        </form>
                    </div>
                </div>
                }
                {process &&
                    <div>
                        <div>등록 중입니다</div>
                        <Lotties />
                    </div>
                }
            </div>
        }
    </div>  
  )
}

export default Add
