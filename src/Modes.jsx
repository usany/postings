import { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';

const currentTheme = localStorage.getItem("theme");

const onClick = (choose, setChoose) => {
    document.body.classList.toggle("dark-theme")
    if (choose === 'light') {
        setChoose('dark')
    } else {
        setChoose('light')
    }
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark";
    }
    // if (document.getElementsByClassName("flex")) {
    //     const array = Array.from(document.getElementsByClassName("flex"))
    //     array.map((msg) => {
    //         msg.className=`${document.getElementsByClassName("flex").className} dark-theme`
    //     })
    // }
    localStorage.setItem("theme", theme);
}

const Button = ({colorMode, choose, setChoose}) => {
    const theme = useTheme();

    return (
        <button className='mode' onClick={() => onClick(choose, setChoose)}>
            {theme.palette.choose} mode
            <IconButton color="inherit">
                {theme.palette.choose === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}                    
            </IconButton>
        </button>
    )
}

function Modes({setCheck}) {
    const [choose, setChoose] = useState('light');
    const colorMode = {
        toggleColorMode: choose,
    }
    const theme = createTheme({
        palette: {
          choose,
        },
    })
    
    return (
        <button onClick={() => {
            setCheck(false)
        }}>
            <ThemeProvider theme={theme}>
                <Button colorMode={colorMode} choose={choose} setChoose={setChoose}/>
            </ThemeProvider>
        </button>  
    )
}

export default Modes
