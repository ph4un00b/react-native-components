/**
 * This represents some generic auth provider API, like Firebase.
 */
const githubProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    githubProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    githubProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { githubProvider as fakeAuthProvider };
