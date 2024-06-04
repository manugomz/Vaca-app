import Service from '../services/users.service.js';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

const Controller = () => {
    const login = async (req, res) => {
        const service = Service(req.dbClient);
        const { email, password } = req.body;

        const user = await service.getByEmail(email);
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res
                .status(StatusCodes.UNAUTHORIZED)
                .json({ message: 'Usuario y/o contraseña incorrectos' });
        }

        const payload = { id: user.id, date: Date.now(), name: user.name };

        const token = jwt.sign(payload, process.env.JWT_SECRET);
        res.json({ token });
    };

    return { login };
};

export default Controller;
