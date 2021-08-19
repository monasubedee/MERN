import React, { useState } from 'react';
import { Container, Avatar, Paper, Typography, Grid, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import Input from './Input';


const Auth = () => {

    const initialState = { firstName:'', lastName:'', email:'', password:'', confirmPassword:''}

    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
       
        if(isSignup) {
            dispatch(signup(formData,history))
        }
        else{
            dispatch(signin(formData,history))
        }
    }

    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value})
    }
    const switchMode = () => {
        setIsSignup((prevSignup) => !prevSignup);

    }

    const googleSuccess = async (res) => {
        console.log(res);
        const result = res?.profileObj;
        const token = res?.tokenId;
        
        try{
            dispatch({ type: 'AUTH', data:{ result, token }});
            history.push('/');
            
        }catch(error){
            console.log(error);
        }
    }

    const googleFailure = () => {
        console.log("Google Sign In was unsuccessful. Try again later")
    }

    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Avatar >

                        <LockOutlinedIcon />

                    </Avatar>
                </div>
                <Typography variant="h5" style={{ display: "flex", justifyContent: "center", marginBottom: "8px" }}>
                    {
                        isSignup ? "Sign Up" : "Sign In"
                    }
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                </>

                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="text" />
                        <Input name="password" label="Password" type={showPassword ? "text" : "password"} handleChange={handleChange} handleShowPassword={handleShowPassword} />

                        {
                            isSignup && <Input name="confirmPassword" label="Repeat Password" type="password" handleChange={handleChange} />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" style={{ marginTop: "10px" }}>
                        {isSignup ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId="847266493539-58hookkbm9bhq8gv9o2gcngjmb4cif48.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button
                                color="primary"
                                fullWidth
                                style={{ marginTop: "10px" }}
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                                variant="contained">
                                Google Sign In
                            </Button>

                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"

                    />
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Button onClick={switchMode}>
                                {isSignup ? 'Already have an account? Sign In' : 'You dont have an account? Sign Up'}
                            </Button>
                        </Grid>
                    </Grid>

                </form>
            </Paper>
        </Container>
    )
}

export default Auth;