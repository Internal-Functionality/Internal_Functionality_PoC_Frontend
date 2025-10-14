export default function FixerCard(){
  return(
    //caja que contiene los flex items de la informacion de usuario fixer
    <div className="max-w-2xl w-full p-7 bg-blue-100 rounded-xl shadow-md flex items-center space-x-9"> 
    {/* flex-item, Caja contenedora de la foto de perfil del fizer*/}
        <div className="w-32 h-32 bg-blue-300 rounded-full flex items-center justify-center text-white font-bold text-3xl"> 
          FP
        </div>
        {/* Flex-item, Caja contenedora de la informacion del fizer*/}
        <div> 
          <h2 className="text-2xl font-semibold text-gray-800">Francisco Perez</h2>
          <p className="text-md text-gray-700">
            franciscoperex@gmail.com<br />
            1234567<br />
            Ing. en Sistemas<br />
            Con 7 años de experiencia
          </p>
        </div>
      </div>
  )
} 