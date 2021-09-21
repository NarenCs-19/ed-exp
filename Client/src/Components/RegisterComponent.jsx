import React, { useState } from "react";
import "../Css/login.css";
import avatar from "../Images/avatar.svg";
import axios from "axios";
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

import {
  EnvelopeFill,
  LockFill,
  Google,
  Linkedin,
  Facebook,
  PersonFill,
  EyeSlashFill,
  EyeFill
} from "react-bootstrap-icons";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import { createTheme, ThemeProvider  } from '@material-ui/core/styles';
function Copyright() {
  return (
    <Typography variant="body2" color="#000" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(4)
  },
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
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


function RegisterComponent() {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const[error,setError] = useState("");
  const[showPwd,setVisibility] = useState(false);

  let history = useHistory();

  const fullNameHandler = (event) => {
    setUserData({
      ...userData,
      fullName: event.target.value,
    });
  };

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
      .post("http://localhost:5000/register", userData)
      .then(({data}) => {
        if(data.message === "success"){
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
  const classes = useStyles();
  /*return (
    <div className="form-container text-center m-auto">
      <div className="title my-3">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="error-msg">
        {error}
      </div>
      <div className="input-container">
        <form className="d-flex flex-column align-items-center">
          <div className="form-group my-2">
            <div className="input-icon">
              <span>
                <PersonFill />
              </span>
            </div>
            <div className="input-control"></div>
            <input
              type="text"
              name="fullName"
              id="fullName"
              placeholder="Full Name"
              value={userData.fullName}
              onChange={fullNameHandler}
            ></input>
          </div>
          <div className="form-group my-2">
            <div className="input-icon">
              <span>
                <EnvelopeFill />
              </span>
            </div>
            <div className="input-control">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="email"
                onChange={emailHandler}
              ></input>
            </div>
          </div>
          <div className="form-group my-2">
            <div className="input-icon">
              <span>
                <LockFill />
              </span>
            </div>
            <div className="input-control">
              <input
                type={showPwd?"text":"password"}
                name="password"
                id="password"
                placeholder="password"
                onChange={passwordHandler}
              ></input>
            </div>
            <div className="eye-icon">
              <span onClick={toggleVisibility}>
                {showPwd?<EyeFill/>:<EyeSlashFill/>}
              </span>
            </div>
          </div>
          <div className="submit-btn my-2">
            <button type="button" className="text-white" onClick={handleSubmit}>
              Register
            </button>
          </div>
          <div className="sign-in my-2">
            <span>
              Already have an account?<a href="/login">&nbsp;Sign in</a>
            </span>
          </div>
          <div className="social-login d-flex my-2">
            <div className="google-icon">
              <Google className="mx-3" />
            </div>
            <div className="linkedin-icon">
              <Linkedin className="mx-3" />
            </div>
            <div className="facebook-icon">
              <Facebook className="mx-3" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );*/

  return (
    
    <Container component="main" maxWidth="sm">
      <Paper className={classes.paper}>
        <Avatar className={classes.large, classes.avatar}>
          <PersonFill fontSize="huge" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className="error-msg">
          {error}
        </div>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="fullName"
                variant="filled"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                value={userData.fullName}
                onChange={fullNameHandler}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={emailHandler}
                value={userData.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Password"
                type={showPwd?"text":"password"}
                id="password"
                onChange={passwordHandler}
                value={userData.password}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
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
          </Grid>
        </form>
      </Paper>
      <Box mt={2}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default RegisterComponent;
