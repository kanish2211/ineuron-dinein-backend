const username = process.env.username;
const password = process.env.password;
const cluster = process.env.cluster;
const dbname = process.env.dbname;

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
    const collection = client.db(dbname);
    // perform actions on the collection object
    client.close();
});