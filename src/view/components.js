import Home from './home.js';
import SignIn from './signin.js';
// eslint-disable-next-line import/no-cycle
import SignUp from './signUp.js';
import HomePage from './homePage.js';

const components = {
  home: Home,
  signin: SignIn,
  signup: SignUp,
  homePage: HomePage,
};

export { components };
