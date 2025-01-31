import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";
import { NextResponse } from "next/server";

export async function establecimientosAPI(req: Request){
    try{
        // Checamos si hay un perfil de usuario
        const profile = await currentProfile();

        if(!profile){
            return new NextResponse("Unathorized", {status:401});
        }
        
        // Checamos el tipo de usuario que es el usuario
        const typeOfUser = await checkTypeOfUser(profile);

        if(!typeOfUser) {
            return new NextResponse("User does not have a type", {status: 400});
        }

        if(typeOfUser === "MECANICO"){

            if(req.method === "POST")
            {
                // Obtenemos los datos a insertar en la base de datos
                const {mecanicoID, establecimientoID} = await req.json();         

                
                const establishment = await db.mecanicoEnEstablecimento.create({
                    data: {
                        mecanicoID: mecanicoID,
                        establecimientoID: establecimientoID
                    }
                });

                return NextResponse.json(establishment);
                
            }

            if(req.method === "DELETE"){
                // Obtenemos los datos a insertar en la base de datos
                const {mecanicoID, establecimientoID} = await req.json();         

                
                const establishment = await db.mecanicoEnEstablecimento.delete({
                    where: {
                        mecanicoID: mecanicoID,
                        establecimientoID: establecimientoID
                    }
                });

                return NextResponse.json(establishment);
                
            }

            return new NextResponse("Invalid Method", {status: 405});
        }

        return new NextResponse("Invalid Input", {status: 400});

    }catch (error) {
        console.log("[SERVER_POST]", error);
        return new NextResponse("Internal Error", {status:500});
    }
}