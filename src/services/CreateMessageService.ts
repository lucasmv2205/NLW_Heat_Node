import prismaClient from '../prisma';
import { io } from '../app'

class CreateMessageService{
    async execute(text: string, user_id: string){
        const message = prismaClient.message.create({
            data:{
                text, 
                user_id
            },
            include:{
                user:true
            }
        });

        const infoWS = {
            text: (await message).text,
            user_id: (await message).user_id,
            created_at: (await message).created_at,
            user: {
                name: (await message).user.name,
                avatar_url: (await message).user.name
            }
        };

        io.emit("new_message", infoWS);

        return message
    }
}

export { CreateMessageService }