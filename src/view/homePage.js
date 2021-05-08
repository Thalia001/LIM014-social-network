export default () => {
  const pageHome = document.createElement('section');
  const viewHome = `
    <ul>
      <li><a></a>#Comida</li>
      <li><a></a>#Bebida</li>
      <li><a></a>Cerrar Sesión</li>
    </ul>
  
    <section>
      <p>PERFIL</p>
      <p>PUBLICAR POST</p>
      <p>VER POST</p>
    </section>`;

  pageHome.classList.add('position');
  pageHome.innerHTML = viewHome;
  return pageHome;
};
