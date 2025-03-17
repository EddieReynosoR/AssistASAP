import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";
import { NextResponse } from "next/server";

// POST - Crear un establecimiento
export async function POST(req: Request) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const typeOfUser = await checkTypeOfUser(profile);

        if (typeOfUser !== "MECANICO") {
            return new NextResponse("Invalid Input", { status: 400 });
        }

        const { nombre, latitud, longitud, mecanicoID } = await req.json();

        const establishment = await db.establecimiento.create({
            data: {
                nombre,
                latitude: latitud,
                longitude: longitud,
                mecanico: {
                    connect: {
                        profileId: profile.id,
                    },
                },
                mecanicos: {
                    create: {
                        mecanicoID,
                    },
                },
            },
        });

        return NextResponse.json(establishment);
    } catch (error) {
        console.error("[SERVER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// PUT - Actualizar un establecimiento
export async function PUT(req: Request) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const typeOfUser = await checkTypeOfUser(profile);

        if (typeOfUser !== "MECANICO") {
            return new NextResponse("Invalid Input", { status: 400 });
        }

        const { id, nombre, latitud, longitud } = await req.json();

        const establishment = await db.establecimiento.update({
            where: { id },
            data: { nombre, latitude: latitud, longitude: longitud },
        });

        return NextResponse.json(establishment);
    } catch (error) {
        console.error("[SERVER_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE - Eliminar un establecimiento
export async function DELETE(req: Request) {
    try {
        const profile = await currentProfile();

        if (!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const typeOfUser = await checkTypeOfUser(profile);

        if (typeOfUser !== "MECANICO") {
            return new NextResponse("Invalid Input", { status: 400 });
        }

        const { id } = await req.json();

        const establishment = await db.establecimiento.delete({
            where: { id },
        });

        return NextResponse.json(establishment);
    } catch (error) {
        console.error("[SERVER_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
