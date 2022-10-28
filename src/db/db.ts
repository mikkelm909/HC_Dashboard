import { MongoClient } from "mongodb"
const client = new MongoClient( //needs to be moved to a .env file to be more secure
    "mongodb://stepupsolu_prod:pp8PmJr81Co4U3fsLsm4ifry5W2t14pp8PCo4Um4ifry5W2t14@mongo.stepupsolutions.dk:27017/?tls=true&authMechanism=DEFAULT")

export function start_mongo(): Promise<MongoClient>{ //makes it so svelte establishes a connection with monogdb on sveltes serverside before anything else
    console.log("Starting mongo...");
    return client.connect();
}

export default client.db("sci_db")