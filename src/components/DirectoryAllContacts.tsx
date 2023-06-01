import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { ContactDetails } from '../interface/ContactDetails';

interface ContactProps {
    users: ContactDetails[];
}

export default function User(): JSX.Element {
    const [contacts, setContacts] = useState<ContactProps['users']>([]);


    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('https://crud-api-vercel.vercel.app/api/v1/directory/all/1');
                setContacts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Call fetchContacts in the useEffect hook
        fetchContacts();
    }, []);




    return (
        <Box padding={3}>
            <Typography variant="h4" sx={{ fontWeight: 700, marginBottom: 3 }}>Usuarios</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#e0e0e0' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 700 }}>Id</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Usuario ID</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Apellido</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Correo Electrónico</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Telefóno</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Compañía</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Estatus</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Fecha de Creación</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contacts.map((contact) => (
                            <TableRow key={contact.contact_id}>
                                <TableCell>{contact.contact_id}</TableCell>
                                <TableCell>{contact.user_id}</TableCell>
                                <TableCell>{contact.first_name}</TableCell>
                                <TableCell>{contact.last_name}</TableCell>
                                <TableCell>{contact.email}</TableCell>
                                <TableCell>{contact.phone}</TableCell>
                                <TableCell>{contact.company}</TableCell>
                                <TableCell>{contact.status}</TableCell>
                                <TableCell>{contact.created_at}</TableCell>
                                {/* Actions */}

                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>


        </Box>
    );
}
