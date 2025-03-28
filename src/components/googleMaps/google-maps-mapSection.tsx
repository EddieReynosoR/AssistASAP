import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, useJsApiLoader } from '@react-google-maps/api';

import { useState, useCallback, useContext, useEffect } from 'react';

import { SourceContext } from '@/contexts/sourceContext';
import { DestinationContext } from '@/contexts/destinationContext';

const GoogleMapsMapSection = () => {
    // Aquí se renderizará el mapa de Google Maps
    const contextSource = useContext(SourceContext);
    const contextDestination = useContext(DestinationContext);

    // Obtenemos las coordenadas desde los contextos
    const {source} = contextSource;
    const {destination} = contextDestination;

    // Indicamos los estilos del contenedor del mapa
    const containerStyle = {
        width: '100%',
        height: window.innerWidth*0.45
    };
      
    // Indicamos desde en qué localización aparecerá el mapa
    const [center, setCenter] = useState({
        lat: 32.5299265,
        lng: -116.9896755
    });

    // Checamos estado de carga del mapa de Google Maps
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string
      })
    
    // Indicar si hay un mapa que mostrar o no
    const [map, setMap] = useState<any>(null)
    
    // Estado para guardar la ruta a renderizar
    const [directionRoutePoints, setDirectionRoutePoints] = useState<google.maps.DirectionsResult>();

    // Si se ha puesto alguna dirección en el mapa, se actualizará el lugar que renderiza el mapa
    useEffect(() =>{
      if(source&&map)
      {
        // Mover automáticamente a donde está viendo el mapa
        map.panTo(
          {
            lat:source.lat,
            lng:source.lng
          }
        )
        // Actualizamos el estado, que guarda donde se está centrando en el mapa
        setCenter({
          lat:source.lat,
          lng:source.lng
        });
      }
      // Se checa si ya se tiene puesto un lugar de partida, y un destino, se muestra la ruta
      if(source&&destination){
        directionRoute();
      }
    }, [source]);

    useEffect(() =>{
      if(destination&&map)
      {
        // Mover automáticamente a donde está viendo el mapa
        map.panTo(
          {
            lat:destination.lat,
            lng:destination.lng
          }
        )
        // Actualizamos el estado, que guarda donde se está centrando en el mapa
        setCenter({
          lat:source.lat,
          lng:source.lng
        });
      }
      // Se checa si ya se tiene puesto un lugar de partida, y un destino, se muestra la ruta
      if(source&&destination){
        directionRoute();
      }
    }, [destination]);


    // Función que hace uso del servicio del renderizado de rutas de Google Maps
    const directionRoute = () => {
      // Hacemos uso del servicio de las direcciones de Google Maps
      const DirectionsService = new google.maps.DirectionsService();

      /* Inicializamos la ruta, indicando el origen (source) y el destino (destination), adempás del modo de transporte para la ruta, que en este
      caso es en carro (DRIVING)
      */
      DirectionsService.route({
        origin:{lat:source?.lat, lng:source?.lng},
        destination:{lat:destination?.lat, lng:destination?.lng},
        travelMode: google.maps.TravelMode.DRIVING
      }, (result, status) => {
        // Checamos que todo haya salido correctamente, y se lo asignamos al estado que guarda la ruta
        if(status === google.maps.DirectionsStatus.OK && result)
        {
          setDirectionRoutePoints(result);
        }
        else
        {
          console.error('Error');
        }
      })
    }

    
    // Función que se realizará en cuanto se cargue el mapa
    const onLoad = useCallback(function callback(map: any) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
  
      setMap(map)
    }, [])
  
    // Función que se ejecutará cuando se desmonte el mapa de la interfaz
    const onUnmount = useCallback(function callback(map: any) {
      setMap(null)
    }, [])
    
    // Si es mapa fue cargado correctamente, lo va a mostrar, si no, no mostrará nada
    return isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={{
            mapId: '2656f8e0448220c2', 
            mapTypeControl: false,
            streetViewControl: false
        }}
        >
          { /* Child components, such as markers, info windows, etc. */ }
          {source ? <MarkerF
          position={{
            lat:source.lat,
            lng:source.lng
          }}
          // icon={{
          //   url:"",
          //   scaledSize:{
          //     width:20,
          //     height:20,               
          //   }
          // }}
          >
            <OverlayView
            position={{lat:source.lat,lng:source.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className='p-2 bg-white font-bold inline-block'>
                <p className='text-black text-[16px]'>{source.label}</p>
              </div>
            </OverlayView>
          </MarkerF>:null}

          {destination ? <MarkerF
          position={{
            lat:destination.lat,
            lng:destination.lng
          }}
          // icon={{
          //   url:"",
          //   scaledSize:{
          //     width:20,
          //     height:20,               
          //   }
          // }}
          >
            <OverlayView
            position={{lat:destination.lat,lng:destination.lng}}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className='p-2 bg-white font-bold inline-block'>
                <p className='text-black text-[16px]'>{destination.label}</p>
              </div>
            </OverlayView>
          </MarkerF>:null}
          <DirectionsRenderer
            directions={directionRoutePoints}
            options={{
              polylineOptions:{
                strokeColor: '#000',
                strokeWeight:5
              },
              suppressMarkers: true
            }}
          />
        </GoogleMap>
    ) : <></>
}

export default GoogleMapsMapSection;