import { MongoClient } from 'mongodb';
import { MONGO_URL } from '$env/static/private';
const client = new MongoClient("mongodb://stepupsolu_prod:pp8PmJr81Co4U3fsLsm4ifry5W2t14pp8PCo4Um4ifry5W2t14@mongo.stepupsolutions.dk:27017/?tls=true&authMechanism=DEFAULT"); //needs to be in a .env file to be more secure

export function start_mongo(): Promise<MongoClient> {
	console.log('Starting mongo...');
	return client.connect();
}

export default client.db('HC_dashboard');
