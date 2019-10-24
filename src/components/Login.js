
import React from 'react';
import {useState,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import img from './images/avatar2.png';
import cover from './images/cover.png'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: "url("+cover+")",
    /*backgroundSize: 'cover',
    backgroundPosition: 'center',*/
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    width: 100,
    height: 100
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignInSide(props) {
  const classes = useStyles();
  const [user,setUser]=useState("");
  const [password,setPwd]=useState("");
  const [open,setOpen]=useState(false)
  const [reponse,setreponse]=useState("")


  const handleClose = () => {
    setOpen(false);
  };

  const handleChangepassword=(e)=>{
    setPwd(e.target.value)
  }
  const handleChangeuser=(e)=>{
    setUser(e.target.value)
  }

  
  
  const Onsubmit=(e)=>{
  e.preventDefault();   
  axios.post('http://localhost:4000/login',
  {"email":user,
  "password":password})
  .then(res => {
    console.log(res.status)
    if (res.status==200){
          localStorage.setItem('user', user);
          localStorage.setItem('token',res.data.token)
          props.history.push("/home");
         
        }
       })
   .catch(err => {
   if (err.response.status!=200){
      setOpen(true);
      setreponse(err.response.status)
      setPwd("");
      setUser("");
   }});
  }


 /* useEffect(()=>{
    const token=localStorage.getItem("token");
          axios.post('http://localhost:4000/adduser',
          {"token":token})
          .then(res => {
            console.log(res.status)})
          .catch(err => {
          if (err.response.status!=401){
            Auth.login(()=>{})
            props.history.push("/home");
            }
          });
  })*/


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} src={img} >
          </Avatar>
          <Typography component="h1" variant="h5"> 
            Sign in
          </Typography>
          <form className={classes.form} noValidate  onSubmit={Onsubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              value={user}
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChangeuser}
            />
            <TextField
              variant="outlined"
              margin="normal"
              value={password}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChangepassword}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <center>Login made By Ach.sofiene10</center>
            </Box>
          </form>
        </div>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Login problem"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Authentification failed with {reponse} response
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
