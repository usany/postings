import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
import Chip from '@mui/material/Chip';

function Cards({ 
  msgObj,
  isOwner,
  userObj,
  isLoggedIn,
  num,
  points,
  setValue,
  counter,
  setCounter
}) {
  return (
    <Card 
      // sx={{width: 200}}
    >
      <CardActionArea>
        <Link 
          to='/postings/specific'
          state = {{
            msgObj: msgObj,
            isOwner: isOwner,
            isLoggedIn: isLoggedIn,
            num: num,
            points: points,
            uid: userObj.uid,
            displayName: userObj.displayName
          }}
        >
        <CardMedia
          sx={{ height: 140 }}
          image='src/assets/pwa-512x512.png'
        />
        <CardContent>
            <div className='flex justify-center'>
              {msgObj.text.choose === 1 && <Chip label='빌리기' />}
              {msgObj.text.choose === 2 && <Chip label='빌려주기' />}
              {isOwner && 
                <Chip label='내가 작성함' />
              }
            </div>
            <div className='flex flex-col justify-center'>
                <div className='flex justify-center'>{msgObj.text.count} {msgObj.text.counter} {msgObj.text.counting !== '' && msgObj.text.counting}</div>
                <div className='flex justify-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute} 부터</div>
                <div className='flex justify-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute} 까지</div>
            </div>
        </CardContent>
        </Link>
        <CardActions className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={isOwner} userObj={userObj} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
        </CardActions>
      </CardActionArea>
    </Card>
  );
}

export default Cards