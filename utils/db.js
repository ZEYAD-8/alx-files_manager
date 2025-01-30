import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${this.host}:${this.port}`;

    MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
      if (err) {
        console.log(err.message);
        this.db = false;
      } else {
        this.db = client.db(this.database);
        this.users = this.db.collection('users');
        this.files = this.db.collection('files');
      }
    });
  }

  isAlive() {
    return !!this.db;
  }

  async nbUsers() {
    return this.users.countDocuments();
  }

  async nbFiles() {
    return this.files.countDocuments();
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
