import { start_mongo } from "$db/db";

start_mongo().then((): void => {
    console.log("...Mongo started")
})