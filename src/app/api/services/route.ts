import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";

// POST - Crear un servicio
export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const typeOfUser = await checkTypeOfUser(profile);
        if (typeOfUser !== "MECANICO") return new NextResponse("Invalid Input", { status: 400 });

        const { name, imageUrl, price, slug, description, tipo, establecimientoID } = await req.json();

        const service = await db.service.create({
            data: {
                establecimientoID,
                name,
                imageUrl,
                price,
                slug,
                description,
                tipo
            }
        });

        return NextResponse.json(service);

    } catch (error) {
        console.error("[SERVER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// PUT - Actualizar un servicio
export async function PUT(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const typeOfUser = await checkTypeOfUser(profile);
        if (typeOfUser !== "MECANICO") return new NextResponse("Invalid Input", { status: 400 });

        const { id, ...updateData } = await req.json();

        const service = await db.service.update({
            where: { id },
            data: updateData
        });

        return NextResponse.json(service);

    } catch (error) {
        console.error("[SERVER_PUT]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE - Eliminar un servicio
export async function DELETE(req: Request) {
    try {
        const profile = await currentProfile();
        if (!profile) return new NextResponse("Unauthorized", { status: 401 });

        const typeOfUser = await checkTypeOfUser(profile);
        if (typeOfUser !== "MECANICO") return new NextResponse("Invalid Input", { status: 400 });

        const { id } = await req.json();

        const service = await db.service.delete({
            where: { id }
        });

        return NextResponse.json(service);

    } catch (error) {
        console.error("[SERVER_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
