import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, TableFooter, Modal, Typography, TextField } from '@mui/material';
import { UserDetails } from '../interface/UserDetails';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface UserProps {
    users: UserDetails[];
}

export default function User(): JSX.Element {
    const [users, setUsers] = useState<UserProps['users']>([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    const [newUser, setNewUser] = useState<UserDetails>({
        id_user: 0,
        user: '',
        first_name: '',
        last_name: '',
        email: '',
        role: 0,
        created_at: '',
        password: ''
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('https://crud-api-vercel.vercel.app/api/v1/users/all/1');
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchUsers();
    }, []);

    const handleEdit = (id: number) => {
        setSelectedUserId(id);
        setIsEditModalOpen(true);

        // Find the user with the selected ID
        const selectedUser = users.find(user => user.id_user === id);

        // Pre-fill the input fields with the user's details
        if (selectedUser) {
            setNewUser({
                id_user: selectedUser.id_user,
                user: selectedUser.user,
                first_name: selectedUser.first_name,
                last_name: selectedUser.last_name,
                email: selectedUser.email,
                role: selectedUser.role,
                created_at: selectedUser.created_at,
                password: selectedUser.password,
            });
        }
    };

    const handleDelete = (id: number) => {
        // Lógica para eliminar el usuario con el ID proporcionado
        setSelectedUserId(id);
        setIsDeleteModalOpen(true);
        console.log(`Eliminar usuario con ID: ${id}`);
    };

    const handleCreate = () => {
        setNewUser({
            id_user: 0,
            user: '',
            first_name: '',
            last_name: '',
            email: '',
            role: 0,
            created_at: '',
            password: ''
        });
        setIsAddModalOpen(true);
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedUserId(null);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setSelectedUserId(null);
    };


    const handleAddUser = async () => {
        // Lógica para agregar un nuevo usuario
        try {
            const newUserPayload = {
                user: newUser.user,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role,
                password: newUser.password,
            };

            // Realizas la solicitud POST para crear el nuevo usuario
            const response = await axios.post('https://crud-api-vercel.vercel.app/api/v1/users/create', newUserPayload);

            response.data;
            // Realiza cualquier otra acción necesaria después de crear el usuario

            console.log('Usuario creado correctamente');
            setIsAddModalOpen(false);

            // Vuelve a cargar la lista de usuarios
            const usersResponse = await axios.get('https://crud-api-vercel.vercel.app/api/v1/users/all/1');
            setUsers(usersResponse.data);
        } catch (error) {
            console.log(error);
        }
        console.log('Agregar usuario');
    };

    const handleEditUser = async () => {
        // Lógica para editar el usuario con el ID seleccionado
        try {
            const updatedUserPayload = {
                user: newUser.user,
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
                role: newUser.role,
                password: newUser.password,
            };

            await axios.put(`https://crud-api-vercel.vercel.app/api/v1/users/details/${selectedUserId?.toString()}`, updatedUserPayload);

            // Perform any other necessary actions after updating the user

            console.log(`Usuario con ID ${selectedUserId} actualizado correctamente`);
            setIsEditModalOpen(false);

            // Reload the list of users
            const usersResponse = await axios.get('https://crud-api-vercel.vercel.app/api/v1/users/all/1');
            setUsers(usersResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteUser = async () => {
        try {
            await axios.delete(`https://crud-api-vercel.vercel.app/api/v1/users/details/${selectedUserId?.toString()}`);
            // Realiza cualquier otra acción necesaria después de eliminar el usuario

            // Vuelve a cargar la lista de usuarios
            const response = await axios.get('https://crud-api-vercel.vercel.app/api/v1/users/all/1');
            setUsers(response.data);

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
                            <TableCell sx={{ fontWeight: 700 }}>Usuario</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Apellido</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Correo</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Rol</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Fecha Creación</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Contraseña</TableCell>
                            <TableCell sx={{ fontWeight: 700 }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id_user}>
                                <TableCell>{user.id_user}</TableCell>
                                <TableCell>{user.user}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role}</TableCell>
                                <TableCell>{user.created_at}</TableCell>
                                <TableCell>{user.password}</TableCell>
                                <TableCell>
                                    <Button variant="text" color="primary" onClick={() => handleEdit(user.id_user)}>
                                        <EditIcon sx={{ color: 'green' }} />
                                    </Button>
                                    <Button variant="text" color="secondary" onClick={() => handleDelete(user.id_user)}>
                                        <DeleteIcon sx={{ color: 'red' }} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={9} align="right">
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
                            label="User"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.user}
                            onChange={(e) => setNewUser({ ...newUser, user: e.target.value })}
                        />
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.first_name}
                            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                        />
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.last_name}
                            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                        />
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <TextField
                            label="Role"
                            variant="outlined"
                            fullWidth
                            type="number"
                            margin="normal"
                            InputProps={{ inputProps: { min: 0, max: 3 } }}
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: parseInt(e.target.value) })}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
                        Actualizar el Usuario {selectedUserId}
                    </Typography>
                    <form>
                        <TextField
                            label="Usuario"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.user}
                            onChange={(e) => setNewUser({ ...newUser, user: e.target.value })}
                        />
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.first_name}
                            onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                        />
                        <TextField
                            label="Apellido"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.last_name}
                            onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                        />
                        <TextField
                            label="Correo electrónico"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                        />
                        <TextField
                            label="Rol"
                            variant="outlined"
                            fullWidth
                            type="number"
                            margin="normal"
                            InputProps={{ inputProps: { min: 0, max: 3 } }}
                            value={newUser.role}
                            onChange={(e) => setNewUser({ ...newUser, role: parseInt(e.target.value) })}
                        />
                        <TextField
                            label="Contraseña"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
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
                        Eliminar el Usuario {selectedUserId}
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
