import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserDetails } from '../interface/UserDetails';
import { useHistory } from 'react-router-dom';
import axios from 'axios';


import { AppBar, Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';


import  Users from './Users';
import  DirectoryAllContacts from './DirectoryAllContacts';
import  DirectoryByUser from './DirectoryByUser';


export default function Dashboard(): JSX.Element {

    const history = useHistory();
    const { idUser } = useParams<{ idUser: string }>();
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [showContacts, setShowContacts] = useState<boolean>(false);
    const [showAllContacts, setShowAllContacts] = useState<boolean>(false);
    const [showUsers, setShowUsers] = useState<boolean>(false);



    useEffect(() => {
        //Empieza mostrando los contactos
        setShowContacts(true);

        //Cargo de los datos del usuario
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(
                    `https://crud-api-vercel.vercel.app/api/v1/users/details/${idUser}`
                );
                await setUserDetails(response.data[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchUserDetails();
    }, [idUser]);

    useEffect(() => {
        console.log(userDetails);
    }, [userDetails]);

    //Funciones para mostrar los componentes
    const handleShowContacts = async () => {
        setShowContacts(true);
        setShowAllContacts(false);
        setShowUsers(false);
    }

    const handleShowAllContacts = async () => {
        setShowContacts(false);
        setShowAllContacts(true);
        setShowUsers(false);
    }

    const handleShowUsers = async () => {
        setShowContacts(false);
        setShowAllContacts(false);
        setShowUsers(true);
    }

    const handleLogout = () => {
        history.push('/');
    };


    return (
        <Box
            whiteSpace={"pre-wrap"}
            width={"100%"}
            margin={"0 auto"}
            justifyContent={"center"}
            alignItems={"center"}
            display={"flex"}
            flexDirection={"column"}>
            <AppBar
                // display="flex"
                position="static"
                sx={{ backgroundColor: '#ffffff', color: '#000000', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', justifyContent: 'center', alignItems: 'center' }}>
                <Box
                    display="flex"
                    // justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ justifyContent: 'space-between', marginTop: 0  }}
                    width={"70%"}>

                    
            {userDetails ? (
                <>
                    <Typography >Usuario: {userDetails?.user}</Typography>
                    <Button color="inherit" endIcon={<LogoutIcon/>} onClick={handleLogout}>Salir</Button>
                </>
            ) : (
                <></>
            )}
                </Box>
            </AppBar>


            {/* //Botones para mostrar los componentes */}
            <Box
                display="flex"
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ justifyContent: 'space-around', marginTop: 2 }}
                width={"100%"}>

                <Button variant="text" color="primary" onClick={handleShowContacts}>Contactos</Button>


                {userDetails?.role === 1 || userDetails?.role === 3 ? (
                    <Button variant="text" color="primary" onClick={handleShowAllContacts}>Todos los Contactos</Button>
                ) : (
                    <></>
                )}
                

                

                {userDetails?.role === 1 ? ( //Si es admin, muestra el botón de usuarios
                    <Button variant="text" color="primary" onClick={handleShowUsers}>Usuarios</Button>
                ) : (
                    <></>
                )} 
                
            </Box>





            {
                showContacts ? (
                    <DirectoryByUser  idUser={idUser}/>
                ) : (
                    <p></p>
                )
            }

            {
                showAllContacts ? (
                    <DirectoryAllContacts />
                ) : (
                    <p></p>
                )
            }





            {
                showUsers ? (
                    <Users />
                ) : (
                    <p></p>
                )
            }



        </Box>
    );
}
