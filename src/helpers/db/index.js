import React, { Component } from 'react';
import mysql from 'mysql';

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            connection: this.createConnection(),
        };
        this.initialize();
    }

    initialize() {
        const { connection } = this.state;
        connection.connect((err) => {
            if (err) throw err;
            console.log('Connected!');
        });
    }

    createConnection() {
        const connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        this.setState({ connection });
    }
}

export default Database;
