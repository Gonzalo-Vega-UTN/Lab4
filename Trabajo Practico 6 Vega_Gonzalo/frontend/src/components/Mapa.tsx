

const Mapa = () => {
    //Coordenadas de Av. Las Heras y Av. San Martin, Ciudad de Mendoza
    const latitud = -32.886318265803276 ; 
    const longitud = -68.83828027705638; 
    let url = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3319.3193153155086!2d' + 
    longitud + '!3d' +
     latitud + '!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7e3a54aae4d5%3A0x92e91a08b6e38836!2sGolden%20Gate%20Bridge!5e0!3m2!1sen!2sus!4v1647034420160!5m2!1sen!2sus';
    return (
      <iframe
        width="100%"
        height="400px"
        allowFullScreen
        src={url}
      />
    );
  };

  export default Mapa