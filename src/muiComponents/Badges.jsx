import { useState, useEffect } from 'react'
import BeachAccess from '@mui/icons-material/BeachAccess'
import Badge from '@mui/material/Badge';

function Badges({ counter }) {
    const [counterLength, setCounterLength] = useState(0)
    // useEffect(() => {
    //     setCounterLength(counter.length)
    //     console.log(counter)
    // })
    // console.log(counter.length)
    return (
        <Badge badgeContent={counter.length} color="primary">
            <BeachAccess/>
        </Badge>
    )
}

export default Badges
