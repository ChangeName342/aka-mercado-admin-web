const mongoose = require('mongoose');
const User = require('./models/User');

// Conectar a la base de datos
mongoose.connect('mongodb+srv://lintz123:lintz123@cluster0.gb0xq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(async () => {
        console.log('Conectado a MongoDB');

        // Verificar si el super usuario ya existe
        const userExists = await User.findOne({ username: 'admin' });
        if (userExists) {
            console.log('El super usuario ya existe');
            return process.exit();
        }

        // Crear el super usuario
        const superUser = new User({
            username: 'admin',
            password: 'admin123', // La contraseña se guarda sin cifrar
            role: 'admin'
        });

        // Guardar el super usuario
        await superUser.save();
        console.log('Super usuario creado correctamente');
        process.exit();
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
        process.exit(1);
    });
