import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Btn from 'src/pages/Btn';
// import FastRewindIcon from '@mui/icons-material/FastRewind';
// import Avatar from '@mui/material/Avatar';
// import { blue } from '@mui/material/colors';

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
            <Typography className='flex justify-center' 
              // gutterBottom 
              variant="h5">
              {msgObj.text.choose === 1 && '빌리기'}
              {msgObj.text.choose === 2 && '빌려주기'}
            </Typography>
            {isOwner && 
              <div>내가 작성함</div>
            }
            <Typography className='flex justify-center' variant="body2" color="text.secondary">
              <div>
                {/* <div className='flex justify-center'>
                  <Avatar alt={msgObj.displayName} sx={{ bgcolor: blue[500] }} src='./src' />
                    <FastRewindIcon />
                  <Avatar sx={{ bgcolor: blue[500] }} src='./src'/>
                </div> */}
                <div className='flex justify-center'>{msgObj.text.counting} {msgObj.text.counter}</div>
                <div className='flex justify-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clock.hour}:{msgObj.text.clock.minute} 부터</div>
                {/* <div className='flex justify-center'>~</div> */}
                <div className='flex justify-center'>{msgObj.text.clock.year}.{msgObj.text.clock.month}.{msgObj.text.clock.day} {msgObj.text.clocker.hour}:{msgObj.text.clocker.minute} 까지</div>
              </div>
            </Typography>
        </CardContent>
        <CardActions className='flex justify-center'>
          <Btn msgObj={msgObj} isOwner={isOwner} userObj={userObj} isLoggedIn={isLoggedIn} num={num} points={points} setValue={setValue} counter={counter} setCounter={setCounter} />
        </CardActions>
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default Cards