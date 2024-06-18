import { useState, useEffect } from 'react'
import { auth, onSocialClick, dbservice, storage } from 'src/baseApi/serverbase'
import { collection, query, where, orderBy, addDoc, getDocs, doc, onSnapshot, deleteDoc, updateDoc } from 'firebase/firestore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';

function Ranking({ isLoggedIn, userObj, setUserObj, value, setValue, side, setSide, sideNavigation, setSideNavigation, check, setCheck, counter }) {
  const [rank, setRank] = useState([])

  useEffect(() => {
    onSnapshot(query(collection(dbservice, 'members'), orderBy('points', 'desc')), (snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
        }));
        setRank(newArray)
    })
  }, [])

  return (
    <div className='flex flex-col pb-20'>
      <div>
          유저 랭킹 / 유저 이름 / 포인트 
      </div>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          {rank.map((element) => {
                return(
                    <div>
                      <ListItem alignItems="flex-start">
                        {rank.indexOf(element)+1}
                        <ListItemAvatar>
                          <Avatar alt={element.displayName} sx={{ bgcolor: blue[500] }} src="./src" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={element.displayName}
                          secondary={
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {element.points}
                              </Typography>
                          }
                        />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </div>
                )
          })}
        </List>
    </div>  
  )
}

export default Ranking
