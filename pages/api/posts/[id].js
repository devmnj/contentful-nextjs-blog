import {client} from "../../contentful";

export default async function  post(req, res) {
    const
    {
        id
    } = req.query;
    console.log(id)
    const r = await  client.getEntry(id);
    return  res.status(200).json(r)
}