import Image from "next/image";
import MecanicoImg from "@/assets/mecanico.png";

export default function Banner() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full h-full items-center bg-secondary rounded-xl flex max-w-[1000px]">
        <p className="font-bold text-white text-center text-4xl ml-3 w-full">
           Productos de calidad
        </p>
        <div className="bg-primary rounded-xl ml-auto">
          <Image src={MecanicoImg} alt="Foto de Mecanico" />
        </div>
      </div>
    </div>
  );
}
