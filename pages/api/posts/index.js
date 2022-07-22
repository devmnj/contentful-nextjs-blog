import {client} from "../../contentful";



export default async function  posts(req, res) {
    const r = await  client.getEntries();
    return  res.status(200).json(r)
}

