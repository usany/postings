import { useState } from 'react'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Chip from '@mui/material/Chip';
import staticImg from 'src/assets/pwa-512x512.png';
// import { Fragment } from 'react/jsx-runtime';

function Cards({ 
  msgObj,
  isOwner,
  userObj,
  isLoggedIn,
  num,
  points,
  setValue,
  counter,
  setCounter,
  messages,
  setMessages,
  displayName
}) {
  // const [specific, setSpecific] = useState(false)
  const shadowColorArray = [
    'lightblue', 
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen', 
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightsteelblue', 
    'lightyellow'
  ]
  let shadowColor;
  // console.log(/[a-z]/.exec(/[a-z]/))
  // if (/[a-z]/.exec(String(msgObj.id[0]).toLowerCase()) === String(msgObj.id[0]).toLowerCase()) {
  //   shadowColor = 'green';
  // }  
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const letters = alpha.map((x) => String.fromCharCode(x));
  // const nums = Array.from(Array(10), (e, i) => i);
  const numbers = Array.from({ length: 10 }, (e, i) => `${i}`)
  const mergedArray = letters.concat(numbers)
  shadowColor = shadowColorArray[msgObj?.id%shadowColorArray.length];
  const from = JSON.parse(msgObj?.fromclock)
  const to = JSON.parse(msgObj?.toclock)
  
  return (
    <div className='p-5 max-w-60 min-w-20'>
      <Card
        sx={{
          boxShadow: `1.9px 1.9px 1.9px 1.9px ${shadowColor}`
        }}
      >
        <CardActionArea 
          // onClick={() => setSpecific({
          //   msgObj: msgObj,
          //   isOwner: isOwner,
          //   num: num,
          //   points: points
          // })}
        >
          <Link 
            to='/postings/specific'
            state = {{
              msgObj: msgObj,
              isOwner: isOwner,
              num: num,
              points: points
              // isLoggedIn: isLoggedIn,
              // uid: userObj.uid,
              // displayName: userObj.displayName,
              // setValue: setValue
              // setCounter: setCounter
            }}
          >
          <CardMedia
            sx={{ height: 140 }}
            image={staticImg}
          />
          <CardContent>
            <div className='flex justify-center'>
              {msgObj?.action === '0' && <Chip label='빌리기' />}
              {msgObj?.action === '1' && <Chip label='빌려주기' />}
              {isOwner && 
                <Chip label='내가 작성함' />
              }
            </div>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-center'>{msgObj?.locationone} {msgObj?.locationtwo} {msgObj?.locationthree !== '' && msgObj?.locationthree}</div>
                <div className='flex justify-center'>{from?.year}.{from?.month}.{from?.day} {from?.hour}:{from?.minute} 부터</div>
                <div className='flex justify-center'>{to?.year}.{to?.month}.{to?.day} {to?.hour}:{to?.minute} 까지</div>
            </div>
          </CardContent>
          </Link>
        </CardActionArea>
        <CardActions className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={isOwner} uid={userObj.id} displayName={displayName} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} messages={messages} setMessages={setMessages}/>
        </CardActions>
      </Card>
    </div>
  );
}

export default Cards