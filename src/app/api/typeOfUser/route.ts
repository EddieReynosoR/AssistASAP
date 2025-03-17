import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";

// POST - Asignar tipo de usuario
export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const typeOfUser = await checkTypeOfUser(profile);
        if (typeOfUser) return new NextResponse("User already has a type", { status: 400 });

        const { typeOfUser: newType } = await req.json();

        if (newType === "CLIENTE") {
            const clientProfile = await db.client.create({
                data: { profileId: profile.id }
            });
            return NextResponse.json(clientProfile);
        }

        if (newType === "MECANICO") {
            const mechanicProfile = await db.mechanic.create({
                data: { profileId: profile.id }
            });
            return NextResponse.json(mechanicProfile);
        }

        return new NextResponse("Invalid Input", { status: 400 });

    } catch (error) {
        console.error("[SERVER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
