import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PriorityHighOutlinedIcon from '@mui/icons-material/PriorityHighOutlined';

import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { useTheme } from '@emotion/react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useMediaQuery } from '@mui/material';

import { Register } from '../../../Api/Auth/Register';



export default function SignUp() {
  const [isDifferent, setIsDifferent] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [emailMessage, setEmailMessage] = useState('')
  const [alert, setAlert] = useState({ show: false, message: '', success: false });

  const navigate = useNavigate()
  const isXSmallScreen = useMediaQuery('(max-width: 599px)');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (data.get("name") == '') {
      setNameError(true)
    }
    else if (data.get("email") == '') {
      setEmailError(true)
      setEmailMessage('Please provide Valid Email')
    }
    else if ((data.get("password") !== data.get("Cpassword"))) {
      setIsDifferent(true)
    }
    else {
      setNameError(false)
      setEmailError(false)
      setIsDifferent(false)
      const User =
      {
        username: data.get('name'),
        email: data.get('email'),
        password: data.get('password')
      }
      const res = await Register(User)

      if (res.success) {
        console.log(res);
        setAlert({
          show: true,
          message: res.message,
          success: true,
        });


        setTimeout(() => {
          navigate('/SignIn')
        }, 2000);
        
      }
      else {
        setEmailError(true)
        setEmailMessage(res.message)
        setAlert({
          show: true,
          message: res.message,
          success: false,
        });

        setTimeout(() => {
          setAlert({ show: false, message: '', success: false });
        }, 5000);
      }

    }

  }


  const theme = useTheme()

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowCPassword = () => {
    setShowCPassword(!showCPassword);
  };

  const handleMouseDownCPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container component="main"
      sx={{
        backgroundColor: {
          xs: '#fff'
        }
      }}>




      <Grid item xs={12} sm={6} md={6}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
          mx: 3,
          my: 4
        }}>
          <Typography
            sx={{
              fontWeight: 'bolder',
              color: theme.palette.secondary.main,

            }}
            variant="h4"
          >
            BMI Supply
          </Typography>
        </Box>

      </Grid>
      <Grid item xs={12}>
        <Box

        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <Typography sx={{
              fontWeight: 'bolder', mb: '3%',
              mt: { xs: '5%', md: '0%' }
            }} variant="h5">
              Register
            </Typography>
            <LockOutlinedIcon />
          </Box>
          <Box component="form" noValidate onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <TextField
              required
              variant='standard'
              id="name"
              placeholder="Name"
              name="name"
              autoComplete="name"
              margin='normal'
              size="small"
              sx={{

                width: '40%'
              }}
              autoFocus
            />
            {nameError && (
              <p style={{ color: 'red' }}>
                Please provide Valid Name
              </p>
            )}
            <TextField
              required
              variant='standard'
              id="email"
              placeholder="Email Address"
              name="email"

              margin='normal'
              size="small"
              sx={{

                width: '40%'
              }}
              autoFocus
            />
            {emailError && (
              <p style={{ color: 'red' }}>
                {emailMessage}
              </p>
            )}
            <TextField
              required
              variant='standard'
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"

              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{

                width: '40%'
              }}
            />
            <TextField
              required
              variant='standard'
              name="Cpassword"
              placeholder="Confirm Password"
              type={showCPassword ? 'text' : 'password'}
              id="Cpassword"
              autoComplete="current-password"
              margin='normal'
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowCPassword}
                      onMouseDown={handleMouseDownCPassword}
                      edge="end"
                    >
                      {showCPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{

                width: '40%'
              }}
            />
            {isDifferent && (
              <p style={{ color: 'red' }}>
                Password and Confirm Password Should be same
              </p>
            )}
            <Button
              type="submit"


              sx={{
                mt: 3, mb: 2,
                backgroundColor: theme.palette.secondary.main,
                border: '1 solid #178582', borderRadius: 2,
                color: '#fff',
                width: '40%',
                "&:hover": {
                  color: '#000',
                  backgroundColor: '#0da39f'

                }
              }}
            >
              Sign Up
            </Button>

            <Box sx={{ display: 'flex', alignSelf: 'center' }}>
              <Link href="/SignIn" variant="body2">
                {"Already have an account? Login"}
              </Link>
            </Box>

            <Box sx={{ alignSelf: 'center', mt: '5.7%' }}>
              <Typography variant="body2" color="text.secondary"  >
                {`© BMI Supply`},All rights Reserved

              </Typography>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          zIndex: 999,
          display: alert.show ? 'block' : 'none',
        }}
      >
        <Paper
          sx={{
            backgroundColor: alert.success ? '#179c0e' : '#ff5050',
            color: '#fff',
            padding: '16px',
            borderRadius: '8px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',

          }}>
            <PriorityHighOutlinedIcon color='#fff' />
            <Typography variant="body1"> {alert.message}
            </Typography>
          </Box>

        </Paper>
      </Box>
    </Grid>
  );
}