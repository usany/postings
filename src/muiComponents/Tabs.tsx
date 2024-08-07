import { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function ToggleTabs({ num, valuing, setValuing }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (num === 0) {
      if(newValue === 1) {
        setValuing(2)
      } else {
        setValuing(0)
      }
    }
    if (num === 1) {
      if(newValue === 1) {
        setValuing(4)
      } else {
        setValuing(0)
      }
    }
    if (num === 2) {
      if(newValue === 1) {
        setValuing(3)
      } else {
        setValuing(1)
      }
    }
  };
  useEffect(() => {
    if (valuing === 1) {
      setValue(0)
    }
  })
  useEffect(() => {
    if (valuing === 3) {
      setValue(1)
    }
  })
  useEffect(() => {
    if (valuing === 0) {
      setValue(0)
    }
  })
  useEffect(() => {
    if (valuing === 4) {
      setValue(1)
    }
  })
  useEffect(() => {
    if (num === 0 && valuing === 2) {
      setValue(1)
    }
  })
  let color
  if (localStorage.theme === 'light') {
    color = '#cbd5df'
  } else {
    color = '#1a202c'
  }

  return (
    <div>
        <Tabs
          sx={{ bgcolor: `${color}`, width: 500}}
          // textColor="secondary"
          // indicatorColor="secondary"
          value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="빌리기" {...a11yProps(0)} />
          <Tab label="빌려주기" {...a11yProps(1)} />
          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
        </Tabs>
    </div>
  );
}