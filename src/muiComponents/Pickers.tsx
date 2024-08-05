import { useState, useEffect } from 'react'
// import Lottie from 'react-lottie'
// import rain from './assets/Animation.json'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';

function Pickers({ onChange, label }) {
    // console.log(value.gmt)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateTimePicker']}>
                <DateTimePicker label={label} onChange={onChange} />
                {/* {value.gmt === undefined && 
                    <DateTimePicker label={label} onChange={onChange} value={dayjs(value.gmt)}/>
                }
                {value.gmt !== undefined && 
                    <DateTimePicker label={label} onChange={onChange} value={dayjs()}/>
                } */}
            </DemoContainer>
        </LocalizationProvider>
        // <div className='flex justify-center'>
        // </div>
    )
}

export default Pickers
