export function signIn(context, userId) {
  context.$store.state.userId = userId;
  sessionStorage.setItem("userId", userId);
}

export function signOut(context) {
  context.$store.state.userId = null;
  sessionStorage.setItem("userId", null);
}

export function initLoginState(context) {
  context.$store.state.userId = sessionStorage.getItem("userId");
}

export function isSignedOut() {
  return sessionStorage.getItem("userId") == null;
}
