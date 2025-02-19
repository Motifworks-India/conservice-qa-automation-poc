import {Client} from 'pg'
let client:Client;

// Connect to the PostgreSQL database
export async function connectToDatabase(db_name:string) {
     client = new Client({
        user: 'qa_testing_svcuser',
        host: '172.20.12.74',
        database: db_name,
        password: 'uU6Ty8eR87hajfh',
        port: 5432, // default port for PostgreSQL
        ssl: {
            rejectUnauthorized: false, // This is less secure but may help with debugging
        },
    });
    await client.connect();
    console.log('Connected to PostgreSQL');
}

// Function to run a query
export async function runQuery(query: string, params?: any[]) {
    try {
        const res = await client.query(query, params);
        return res.rows;
    } catch (error) {
        console.error('Failed to execute query:', query);
        console.error('Error details:', error);
        throw error; // Re-throw the error to handle it in the test
    }
}
// Disconnect from the PostgreSQL database
export async function disconnectFromDatabase() {
    await client.end();
    console.log('Disconnected from PostgreSQL');
}
