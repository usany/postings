import { useState, useEffect } from 'react'
// import Lottie from 'react-lottie'
// import rain from './assets/Animation.json'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const settingSeats = (number) => {
    return (
        Array(number).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
    )
}
// const roomOne = Array(181).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomFocus = Array(46).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomTwo = Array(315).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomThree = Array(156).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
// const roomFour = Array(149).fill().map((value, index) => <MenuItem key={index+1} value={index+1}>{index+1}</MenuItem>)
const location = {
    one : settingSeats(181),
    focus : settingSeats(46),
    two : settingSeats(315),
    three : settingSeats(156),
    four : settingSeats(149),
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
    ].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    cw : [
        '매점(B1)', 
        '글로벌존(B1)'
    ].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    p : ['매점(1F)'].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    g : ['카페(B2)', '열람실(B2)'].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    k : ['카페'].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    m : ['복사실'].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    e : ['1열(5F)', '2열(6F)'].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    c : ['1층 로비'].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
    j : ['1층'].map((value, index) => <MenuItem key={index+1} value={index+1}>{value}</MenuItem>),
}
function Selects({ count, changeBuilding, changeRoom, changeSeat }) {
    // const [location, setLocation] = useState('')
    // const handleChange = (event) => {
    //     setLocation(event.target.value)
    // }
    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel 
                    // id="demo-simple-select-standard-label"
                >위치가 어디인가요</InputLabel>
                <Select
                    // labelId="demo-simple-select-standard-label"
                    // id="demo-simple-select-standard"
                    // value={location}
                    onChange={changeRoom}
                    // label="Age"
                >
                    <MenuItem value={'one'}>one</MenuItem>
                    <MenuItem value={'focus'}>focus</MenuItem>
                    <MenuItem value={'two'}>two</MenuItem>
                    <MenuItem value={'three'}>three</MenuItem>
                    <MenuItem value={'four'}>four</MenuItem>
                    <MenuItem value={'중도'}>중도</MenuItem>
                    <MenuItem value={'청운'}>청운</MenuItem>
                    <MenuItem value={'푸른솔'}>푸른솔</MenuItem>
                    <MenuItem value={'간호이과대'}>간호이과대</MenuItem>
                    <MenuItem value={'경영대'}>경영대</MenuItem>
                    <MenuItem value={'문과대'}>문과대</MenuItem>
                    <MenuItem value={'의과대'}>의과대</MenuItem>
                    <MenuItem value={'치과병원'}>치과병원</MenuItem>
                </Select>
            </FormControl>
            {count !== '' &&
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel 
                    // id="demo-simple-select-standard-label1"
                    >
                        {count} 어디인가요
                    </InputLabel>
                    <Select
                        // labelId="demo-simple-select-standard-label1"
                        // id="demo-simple-select-standard"
                        // value={location}
                        onChange={changeSeat}
                        // label="Age"
                    >
                        {/* <option value={0} disabled>{count} 어딘가요</option> */}
                        {count == 'one' && location.one}
                        {count == 'focus' && location.focus}
                        {count == 'two' && location.two}
                        {count == 'three' && location.three}
                        {count == 'four' && location.four}
                        {count == '중도' && location.cl}
                        {count == '청운' && location.cw}
                        {count == '푸른솔' && location.p}
                        {count == '간호이과대' && location.g}
                        {count == '경영대' && location.k}
                        {count == '문과대' && location.m}
                        {count == '의과대' && location.e}
                        {count == '치과병원' && location.c}
                        {/* {count == '정문 노란 지붕' && location.j} */}
                    </Select>
                </FormControl>
            }
        </div>

    )
}

export default Selects
