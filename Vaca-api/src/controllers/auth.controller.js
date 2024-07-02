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
                .json({ error: 'Usuario y/o contraseña incorrectos' });
        }

        const payload = { id: user.userid, email: user.email, date: Date.now() };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ token });
    };
    const check = async (_req, res) => {
        res.send('you are authenticated');
    };

    return { login, check };
};

export default Controller;
