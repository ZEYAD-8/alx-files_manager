/* eslint-disable import/no-named-as-default */
import redisClient from '../utils/redis';
import dbClient from '../utils/db';

export const getStatus = async (req, res) => {
  try {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ redis: false, db: false });
  }
};

export const getStats = async (req, res) => {
  try {
    const usersCount = await dbClient.nbUsers();
    const filesCount = await dbClient.nbFiles();
    res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ users: 0, files: 0 });
  }
};
