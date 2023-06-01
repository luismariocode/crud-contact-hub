import React from 'react';
import axios from 'axios';
import { useHistory   } from "react-router-dom"; 
//import { useState, useEffect } from 'react';
 import { useState } from 'react';
import '@fontsource/dm-sans/700.css';
import { Button, TextField, Grid, Box, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export default function LogIn(): JSX.Element {

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try{
            const response = await axios.post('https://crud-api-vercel.vercel.app/api/v1/users/login', { username: user, password: password });
            const idUser = response.data.id_user[0].id_user;
            await history.push(`/dashboard/${idUser}`);
        }catch(e){
            console.log(e);
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="start"
            minHeight="100vh"
            max-width={350}
            min-width={"400px"}
            width={"30%"}
            className="mainLogin">
            <Box margin={2} width="100%">
                <Typography fontFamily={'DM Sans'} className="title" alignSelf="left" component="h1" variant="h3"   sx={{ typography: { sm: 'h3', xs: 'h5' } }} >ContactHub</Typography>
            </Box>
            <form onSubmit={handleLogin}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} xl={12}>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                            size="medium"
                            required={true}
                            style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' , fontFamily: 'DM Sans', backgroundColor: '#ffffff'}}

                            value={user}
                            onChange={(event:any) => setUser(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12} xl={12}>
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            type="password"
                            fullWidth
                            size="medium"
                            required={true}
                            style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' , fontFamily: 'DM Sans', backgroundColor: '#ffffff'}}
                            value={password}
                            onChange={(event:any) => setPassword(event.target.value)}/>
                    </Grid>
                    <Grid item xs={12} alignItems="right">
                        <Button
                            type="submit"
                            color="primary" 
                            size="large"
                            fullWidth
                            variant="outlined"
                            endIcon={<LoginIcon />}
                            style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)' , fontFamily: 'DM Sans', backgroundColor: '#ffffff'}}>
                            Iniciar sesión
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}
