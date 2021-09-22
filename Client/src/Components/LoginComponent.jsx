import React, { useState } from "react";
import "../Css/login.css";
import avatar from "../Images/avatar.svg";
import axios from "axios";
import {
  EnvelopeFill,
  LockFill,
  Google,
  Linkedin,
  Facebook,
  EyeSlashFill,
  EyeFill,
} from "react-bootstrap-icons";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Paper,
  Typography,
  Container
}from '@material-ui/core';
import { useHistory } from "react-router";
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider  } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4),
    backgroundColor: 'white',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: { 
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginComponent() {
  const classes = useStyles();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const[error,setError] = useState("");
  const[showPwd,setVisibility] = useState(false);

  let history = useHistory();

  const emailHandler = (event) => {
    setUserData({
      ...userData,
      email: event.target.value,
    });
  };

  const passwordHandler = (event) => {
    setUserData({
      ...userData,
      password: event.target.value,
    });
  };

  const toggleVisibility = ()=>{
    showPwd?setVisibility(false):setVisibility(true);
    
  }
  const handleSubmit = async (event) => {
    event.preventDefault(); 
    console.log(userData);
    axios
      .post("http://localhost:5000/login", userData)
      .then(({data}) => {
        if(data === "success"){
          history.push('/');
        }
        else{
          setError(data.message);
        }
      })
      .catch((err) => { 
        console.log(err);
      });
  };
  return (
    // <div className="form-container text-center m-auto">
    //   <div className="title my-3">
    //     <img src={avatar} alt="avatar" />
    //   </div>
    //   <div className="error-msg">
    //     {error}
    //   </div>
    //   <div className="input-container">
    //     <form className="d-flex flex-column align-items-center">
    //       <div className="form-group my-2">
    //         <div className="input-icon">
    //           <span>
    //             <EnvelopeFill />
    //           </span>
    //         </div>
    //         <div className="input-control">
    //           <input
    //             type="email"
    //             name="email"
    //             id="email"
    //             placeholder="email"
    //             onChange={emailHandler}
    //           ></input>
    //         </div>
    //       </div>
    //       <div className="form-group my-2">
    //         <div className="input-icon">
    //           <span>
    //             <LockFill />
    //           </span>
    //         </div>
    //         <div className="input-control">
    //           <input
    //             type={showPwd?"text":"password"}
    //             name="password"
    //             id="password"
    //             placeholder="password"
    //             onChange={passwordHandler}
    //           ></input>
    //         </div>
    //         <div className="eye-icon">
    //           <span onClick={toggleVisibility}>
    //             {showPwd?<EyeFill/>:<EyeSlashFill/>}
    //           </span>
    //         </div>
    //       </div>
    //       <div className="forget-password">
    //         <a href="/register">Forget password?</a>
    //       </div>
    //       <div className="submit-btn my-2">
    //         <button type="button" className="text-white" onClick={handleSubmit}>
    //           Login
    //         </button>
    //       </div>
    //       <div className="sign-up">
    //         <span>
    //           Don't have an account?<a href="/register">&nbsp;Sign up</a>
    //         </span>
    //       </div>
    //       <div className="social-login d-flex">
    //         <div className="google-icon">
    //           <Google className="mx-3" />
    //         </div>
    //         <div className="linkedin-icon">
    //           <Linkedin className="mx-3" />
    //         </div>
    //         <div className="facebook-icon">
    //           <Facebook className="mx-3" />
    //         </div>
    //       </div>
    //     </form>
    //   </div>
    // </div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <div className="error-msg">
            {error}
          </div>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={emailHandler}
              autoFocus
            />
            <TextField
              variant="filled"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              type={showPwd?"text":"password"}
              onChange={passwordHandler}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
            <Grid container justifyContent='center' className="social-login d-flex my-2">
              <div className="google-icon">
                <Google className="mx-3" />
              </div>
              <div className="linkedin-icon">
                <Linkedin className="mx-3" />
              </div>
              <div className="facebook-icon">
                <Facebook className="mx-3" />
              </div>
            </Grid>        </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>

  );
}

export default LoginComponent;
