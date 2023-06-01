import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, TableFooter, Modal, Typography, TextField } from '@mui/material';
import { ContactDetails } from '../interface/ContactDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface ContactProps {
    contacts: ContactDetails[];
}

export default function DirectoryByUser(idUser:any): JSX.Element {
    const [contacts, setContacts] = useState<ContactProps['contacts']>([]);


    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedContactId, setSelectedContactId] = useState<number | null>(null);
    const [newContact, setNewContact] = useState<ContactDetails>({
        user_id: idUser,
        first_name: "",
        last_name: "",
        email:"",
        phone: "",
        company: "",
        status:0,
    });

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('https://crud-api-vercel.vercel.app/api/v1/directory/allByUser/'+idUser.idUser);
                setContacts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchContacts();
    }, []);

    const handleEdit = (id: number) => {
        setSelectedContactId(id);
        setIsEditModalOpen(true);

        // Encontrar el usuario seleccionado por su ID
        const selectedContact = contacts.find(contact => contact.contact_id === id);

        // Pre-fill el formulario con los datos del usuario seleccionado
        if (selectedContact) {
            setNewContact({
                user_id: selectedContact.user_id,
                first_name: selectedContact.first_name,
                last_name: selectedContact.last_name,
                email: selectedContact.email,
                phone: selectedContact.phone,
                company: selectedContact.company,
                status: selectedContact.status,

            });
        }
    };

    const handleDelete = (id: number) => {
        // Lógica para eliminar el usuario con el ID proporcionado
        setSelectedContactId(id);
        setIsDeleteModalOpen(true);
        console.log(`Eliminar usuario con ID: ${id}`);
    };

    const handleCreate = () => {
        setNewContact({
            user_id: 0,
            first_name: "",
            last_name: "",
            email: "",
            phone: "",
            company: "",
            status: 0,
        });
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedContactId(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedContactId(null);
    };


    const handleAddUser = async () => {
        // Lógica para agregar un nuevo usuario
        try {
            const newUserPayload = {
                user_id: idUser.idUser,
                first_name:newContact.first_name,
                last_name: newContact.last_name,
                email: newContact.email,
                phone: newContact.phone,
                company: newContact.company,
                status: newContact.status,
            };

            // Realizas la solicitud POST para crear el nuevo usuario
            const response = await axios.post('https://crud-api-vercel.vercel.app/api/v1/directory/create', newUserPayload);

            response.data;
            // Realiza cualquier otra acción necesaria después de crear el usuario

            console.log('Usuario creado correctamente');
            setIsAddModalOpen(false);

            // Vuelve a cargar la lista de usuarios
            const contactResponse = await axios.get('https://crud-api-vercel.vercel.app/api/v1/directory/allByUser/'+idUser.idUser);
            setContacts(contactResponse.data);
        } catch (error) {
            console.log(error);
        }
        console.log('Agregar usuario');
    };

    const handleEditUser = async () => {
        // Lógica para editar el usuario con el ID seleccionado
        try {
            const updatedUserPayload = {
                user_id: idUser.idUser,
                first_name:newContact.first_name,
                last_name: newContact.last_name,
                email: newContact.email,
                phone: newContact.phone,
                company: newContact.company,
                status: newContact.status,
            };
            

            await axios.put(`https://crud-api-vercel.vercel.app/api/v1/directory/contact/${selectedContactId}`, updatedUserPayload);

            // Perform any other necessary actions after updating the user

            console.log(`Usuario con ID ${selectedContactId} actualizado correctamente`);
            setIsEditModalOpen(false);

            // Reload the list of users
            const contactResponse = await axios.get('https://crud-api-vercel.vercel.app/api/v1/directory/allByUser/'+idUser.idUser);
            setContacts(contactResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`https://crud-api-vercel.vercel.app/api/v1/directory/contact/${selectedContactId}`);
            // Realiza cualquier otra acción necesaria después de eliminar el usuario

            // Vuelve a cargar la lista de usuarios
            const response = await axios.get(`https://crud-api-vercel.vercel.app/api/v1/directory/allByUser/${idUser.idUser}`);
            setContacts(response.data);

            console.log('Usuario eliminado correctamente');

            setIsDeleteModalOpen(false);
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Box padding={3}>
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
                        <TableCell sx={{ fontWeight: 700 }}>Acciones</TableCell>
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
                            <TableCell>
                                    <Button variant="text" color="primary" onClick={() => handleEdit(contact.contact_id??0)}>
                                        <EditIcon sx={{ color: 'green' }} />
                                    </Button>
                                    <Button variant="text" color="secondary" onClick={() => handleDelete(contact.contact_id??0)}>
                                        <DeleteIcon sx={{ color: 'red' }} />
                                    </Button>
                                </TableCell>
                                
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={10} align="right">
                                <Button variant="contained" color="primary" onClick={handleCreate}>
                                    Agregar
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            {/* Modal para Agregar Usuario */}
            <Modal open={isAddModalOpen} onClose={handleCloseAddModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2" mb={2}>
                        Agregar Usuario
                    </Typography>
                    <form>  
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required={true}
                            value={newContact.first_name}
                            onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
                        />
                        <TextField
                            label="Apellido"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required={true}
                            value={newContact.last_name}
                            onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
                        />
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required={true}
                            value={newContact.email}
                            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        />
                        <TextField
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            type="number"
                            margin="normal"
                            required={true}
                            InputProps={{ inputProps: { min: 0, max: 3 } }}
                            value={newContact.phone}
                            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        />
                        <TextField
                            label="Compañía"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            required={true}
                            value={newContact.company}
                            onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                        />
                        <Button variant="contained" color="primary" onClick={handleAddUser}>
                            Agregar
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleCloseAddModal} >
                            Cerrar
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Modal para Editar Usuario */}
            <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2" mb={2}>
                        Actualizar el Contacto {selectedContactId}
                    </Typography>
                    <form>
                    <TextField
                            label="Nombre"
                            variant="outlined"
                            required={true}
                            fullWidth
                            margin="normal"
                            value={newContact.first_name}
                            onChange={(e) => setNewContact({ ...newContact, first_name: e.target.value })}
                        />
                        <TextField
                            label="Apellido"
                            variant="outlined"
                            required={true}
                            fullWidth
                            margin="normal"
                            value={newContact.last_name}
                            onChange={(e) => setNewContact({ ...newContact, last_name: e.target.value })}
                        />
                        <TextField
                            label="Correo Electrónico"
                            variant="outlined"
                            required={true}
                            fullWidth
                            margin="normal"
                            value={newContact.email}
                            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                        />
                        <TextField
                            label="Teléfono"
                            variant="outlined"
                            fullWidth
                            required={true}
                            type="number"
                            margin="normal"
                            InputProps={{ inputProps: { min: 0, max: 3 } }}
                            value={newContact.phone}
                            onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
                        />
                        <TextField
                            label="Compañía"
                            variant="outlined"
                            required={true}
                            fullWidth
                            margin="normal"
                            value={newContact.company}
                            onChange={(e) => setNewContact({ ...newContact, company: e.target.value })}
                        />
                        <Button variant="contained" color="primary" onClick={handleEditUser}>
                            Actualizar
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleCloseEditModal}>
                            Cerrar
                        </Button>
                    </form>
                </Box>
            </Modal>

            {/* Modal para Eliminar Usuario */}
            <Modal open={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2" mb={2}>
                        Eliminar el Contacto {selectedContactId}
                    </Typography>
                    <form>
                        <Button variant="contained" color="primary" onClick={handleDeleteUser}>
                            Eliminar
                        </Button>
                        <Button variant="outlined" color="primary" onClick={handleCloseDeleteModal} >
                            Cerrar
                        </Button>
                    </form>


                </Box>
            </Modal>

        </Box>
    );
}
