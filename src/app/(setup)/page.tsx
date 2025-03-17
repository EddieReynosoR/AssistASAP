import Banner from "../../components/banner";
import TestProduct from "../../components/products/mainPageProducts/ProductComponent";
import Link from "next/link";
import { CartProvider } from "@/contexts/contextCarrito";

import { initialProfile } from "@/lib/initial-profile";
import { checkTypeOfUser } from "@/utils/checkTypeOfUser";
import { AsignarTipoUsuario } from "@/components/asignarTipoUsuario";

export default async function Home() {
  let hasTypeOfUser = false; 

  // Obtenemos el perfil del usuario
  const profile = await initialProfile();
  const typeOfUser = await checkTypeOfUser(profile);

  if(profile && !typeOfUser){
    hasTypeOfUser = true;
  }

  console.log(hasTypeOfUser);

  return (
    <>
      <AsignarTipoUsuario idUsuario={profile?.id} mostrarDialog={hasTypeOfUser}/>
      <div className="felx felx-col gap-8 ">
        <div className="pb-8">
          <Banner />
        </div>
        <div>
          <Link className="font-bold text-4xl flex flex-row pb-4" href="/products">
            <p>Products</p>
            <p className="text-xl font-bold text-indigo-600 ml-auto pt-2">
              Ver todo
            </p>
          </Link>
          <div className=" mx-auto max-w-md">
            <TestProduct />
          </div>
        </div>
      </div>
    </>
  );
}
