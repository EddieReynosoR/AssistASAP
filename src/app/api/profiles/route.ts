import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// PUT - Actualizar perfil
export async function PUT(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const { data } = await req.json();

        const updateProfile = await db.profile.update({
            where: { id: profile.id },
            data
        });

        return NextResponse.json(updateProfile);

    } catch (error) {
        console.error("[PROFILE_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE - Eliminar perfil
export async function DELETE(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const deleteProfile = await db.profile.delete({
            where: { id: profile.id }
        });

        return NextResponse.json(deleteProfile);

    } catch (error) {
        console.error("[PROFILE_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
