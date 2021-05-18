/* eslint-disable eqeqeq */
/* eslint-disable func-names */
export const templatePost = (doc) => {
  const section = document.createElement('section');
  section.classList.add('style-post');
  section.style = 'background-color:skyblue';
  const template = `
    <h5 id ="ruta">${doc.email}</h5>
    <p>${doc.post}</p>
    <button id=${doc.id} class="btn-delete" data-id=${doc.id}> eliminar </button>
    <button id=${doc.id} class="btn-edit" data-id=${doc.id}> editar </button>
    `;
  section.innerHTML = template;
  return section;
};
export const templateModal = () => {
  const createTemplate = document.createElement('div');
  createTemplate.classList.add('modal-container');
  createTemplate.id = 'modal-container';
  const template = `
  <div class="modal">
  <h1>¿Estas seguro de eliminar esta publicación?</h1></br>
  <button class="btn-confirmYes">Si</button>
  <button class="btn-confirmNo">No</button>
  </div>`;
  createTemplate.innerHTML = template;
  return createTemplate;
};
