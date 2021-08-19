import React, { useEffect, useState } from 'react';
import useStyles from './styles';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import memories from '../../images/memories.png';
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = () => {

    const classes = useStyles();
    
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();


    useEffect(() => {
        const token = user?.token;

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        setUser(null);
        history.push('/');

    }

    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component={Link} to='/' className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="icon" height="60" />
            </div >
            <Toolbar className={classes.toolbar}>
                {
                    user ? (
                        <div className={classes.profile}>
                            <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl} />
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                            <Button className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                        </div>
                    ) : (
                        <div>
                            <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                        </div>
                    )
                }
            </Toolbar>
        </AppBar >
    )
}


export default Navbar;