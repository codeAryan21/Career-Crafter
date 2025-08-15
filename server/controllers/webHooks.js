import { Webhook } from "svix";
import { User } from "../models/user.model.js";

// API Controller function to manage clerk User with database
export const clerkWebHooks = async (req,res) => {
    try {
        // create a svix instance with clerk webhook secret.
        const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // verify the header
        await webhook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        })

        // getting data from request body type (create, update, delete)
        const {data,type} = req.body;

        // switch case for different types of Event
        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + data.last_name,
                    username: data.username,
                    image: data.image.url,
                    resume: ''
                }
                await User.create(userData);
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    name: data.first_name + data.last_name,
                    username: data.username,
                    image: data.image.url
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }
        
            default:
                break;
        }
    } catch (error) {
        console.log(error.message);
        res.json({message: 'WebHooks error', success: false});
    }
}
