import { currentUser } from "@clerk/nextjs/server";
import {db} from "@/lib/db";

export const initialProfile = async () => {
    const user = await currentUser();

    if(!user)
        return null;

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    });

    if(profile)
        return profile;

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName}`,
            apellidoP: `${user.lastName?.split(' ')[0]}`,
            apellidoM: `${user.lastName?.split(' ')[1]}`,
            telephone: user.phoneNumbers[0].phoneNumber,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress
        }
    });

    return newProfile;
}