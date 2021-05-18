// eslint-disable-next-line import/no-cycle
import { deletePost, orderPostbyTimeDesc } from './firestore-controller.js';
import { templatePost, templateModal } from './templates-sections.js';

export const idDocumentPost = (e) => {
  const idPost = e.target.dataset.id;
  deletePost(idPost);
};
export const setupPosts = (data, templateInitialPage) => {
  const postList = templateInitialPage.querySelector('.posts');
  postList.innerHTML = '';
  if (data.length) {
    data.forEach((doc) => {
      const section = templatePost(doc);
      const btnDeletePost = section.querySelector('.btn-delete');
      // obteniendo nuevos valores
      const templateModalValue = templateModal();
      section.appendChild(templateModalValue);
      const modalContainer = section.querySelector('.modal-container');
      const optionYes = templateModalValue.querySelector('.btn-confirmYes');
      optionYes.dataset.id = doc.id;
      const optionNo = templateModalValue.querySelector('.btn-confirmNo');
      btnDeletePost.addEventListener('click', () => {
        modalContainer.style.display = 'flex';
      });
      optionNo.addEventListener('click', () => {
        modalContainer.style.display = 'none';
      });
      optionYes.addEventListener('click', idDocumentPost);
      postList.appendChild(section);
    });
  } else {
    postList.innerHTML = '<h4 class="text-white">Login to See Posts</h4>';
  }
};
export const showPost = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      orderPostbyTimeDesc()
        .onSnapshot((querySnapshot) => {
          const output = [];
          querySnapshot.forEach((doc) => {
            output.push({ id: doc.id, ...doc.data() });
          });
          callback(output);
        });
    } else {
      callback([]);
    }
  });
};

// Modal del botón "Eliminar"
// const open = document.querySelector('.btn-delete');
// const modal_container = document.querySelector('modal-container');
// const optionYes = document.querySelector('btn-confirmYes');
// const optionNo = document.querySelector('btn-confirmNo');

// open.addEventListener('click', () => {
//   modal_container.classList.add('show');
//   // alert('prueba');
// });
// optionNo.addEventListener('click', () => {
//   modal_container.classList.remove('show');
// });
