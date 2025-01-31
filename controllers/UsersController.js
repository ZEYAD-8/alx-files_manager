import sha1 from 'sha1';
import dbClient from '../utils/db';

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Missing email' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Missing password' });
    }
    const existingUser = await dbClient.db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Already exist' });
    }

    const user = {
      email,
      password: sha1(password),
    };

    const result = await dbClient.db.collection('users').insertOne(user);

    return res.status(201).json({
      id: result.insertedId,
      email: user.email,
    });
  }
}

export default UsersController;
