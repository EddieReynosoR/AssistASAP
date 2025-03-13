import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();

        if (!profile)
            return new NextResponse("Unathotized", { status: 401 });

        const typeOfUser = await checkTypeOfUser(profile);

        if (!typeOfUser) 
            return new NextResponse("User does not have a type", { status: 400 });

        if (typeOfUser === "MECANICO") {
            const { mecanicoID, establecimientoID } = await req.json();
      
            const establishment = await db.mecanicoEnEstablecimento.create({
              data: {
                mecanicoID,
                establecimientoID
              }
            });
      
            return NextResponse.json(establishment);
        }

        return new NextResponse("Invalid Input", { status: 400 });
    }
    catch (error) {
        return new NextResponse("Internal Error", { status: 401 });
    }
}

export async function DELETE(req: Request) {
    try {
      // Checamos si hay un perfil de usuario
      const profile = await currentProfile();
  
      if (!profile) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Checamos el tipo de usuario que es el usuario
      const typeOfUser = await checkTypeOfUser(profile);
  
      if (!typeOfUser) {
        return new NextResponse("User does not have a type", { status: 400 });
      }
  
      if (typeOfUser === "MECANICO") {
        const { mecanicoID, establecimientoID } = await req.json();
  
        const establishment = await db.mecanicoEnEstablecimento.delete({
          where: {
            mecanicoID,
            establecimientoID
          }
        });
  
        return NextResponse.json(establishment);
      }
  
      return new NextResponse("Invalid Input", { status: 400 });
  
    } catch (error) {
      console.error("[SERVER_DELETE]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
}