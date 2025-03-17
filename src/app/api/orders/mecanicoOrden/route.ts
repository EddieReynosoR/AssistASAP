import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";
import { NextResponse } from "next/server";

// POST - Asignar mecánico a una orden de servicio
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

        // Obtener datos del request
        const { ordenServicioID, mecanicoID } = await req.json();

        // Actualizar la orden de servicio con el mecánico asignado
        const ordenServicio = await db.ordenServicio.update({
            where: { id: ordenServicioID },
            data: { mecanicoID }
        });

        return NextResponse.json(ordenServicio);

    } catch (error) {
        console.error("[SERVER_POST]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

// DELETE - Desasignar mecánico de una orden de servicio
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

        // Obtener datos del request
        const { ordenServicioID } = await req.json();

        // Desasignar mecánico de la orden de servicio
        const ordenServicio = await db.ordenServicio.update({
            where: { id: ordenServicioID },
            data: { mecanicoID: null }
        });

        return NextResponse.json(ordenServicio);

    } catch (error) {
        console.error("[SERVER_DELETE]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
