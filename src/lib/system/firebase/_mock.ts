import firebasemock from 'firebase-mock';

const mockdatabase = new firebasemock.MockFirebase();
const mockauth = new firebasemock.MockFirebase();
const mocksdk = new firebasemock.MockFirebaseSdk(
  (path: any) => (path ? mockdatabase.child(path) : mockdatabase),
  () => mockauth
);

export default mocksdk;
