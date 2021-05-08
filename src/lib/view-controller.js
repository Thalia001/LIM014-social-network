// Llamamos las funciones del FireBase con .then && Catch
import { register, registerGoogle } from './firebase-controller.js';
// eslint-disable-next-line import/no-cycle
import { changeHash } from '../view-controls/index.js';

export const registerNewUser = () => {
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  register(email, password)
    .then(() => {
      changeHash('/HomePage');
    })
    .catch(() => {
      document.getElementById('errorMail').style.display = 'block';
    });
};

export const registerWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  registerGoogle(provider)
    .then(() => {
      changeHash('/HomePage');
    })
    .catch(() => {
      document.getElementById('errorMail').style.display = 'block';
    });
};
