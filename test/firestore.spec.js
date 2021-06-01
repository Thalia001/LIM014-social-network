import MockFirebase from 'mock-cloud-firestore';
import {
  addPost, orderPostbyTimeDesc, deletePost, createUser, getUser, editDescriptions, editPost,
  showPostUserid,
} from '../src/lib/firestore-controller.js';

const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        post_1: {
          post: 'textPost',
          idUser: 'uid_001',
          email: 'ichef@mailito.com',
          timePost: new Date().toLocaleString('GMT-0500'),
          likes: [],
        },
      },
    },
  },
};
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });

// <-----Functions from {lib/firestore-controller.js}----->
// Create data document new user
describe('Document user', () => {
  it('Should it create a new user', (done) => createUser('nameUser_002', 'nickNameuser_002', 'ichef@mailito.com', '002', 'photoURLgoole.jpg')
    .then(() => {
      const callback = () => {
        getUser('002', (userData) => {
          const user = userData.data();
          expect(user.displayName).toBe('nameUser_002');
          expect(user.Usuario).toBe('nickNameuser_002');
          expect(user.Correo).toBe('ichef@mailito.com');
          expect(user.Id).toBe('002');
          expect(user.Photo).toBe('photoURLgoole.jpg');
          done();
        });
      };
      getUser('002', callback);
    }));
});
// Add new propertyName "Description"
describe('Add new "Description"', () => {
  it('Should it a new description', (done) => editDescriptions('002', 'Lorem Ipsum')
    .then(() => {
      const callback = () => {
        getUser('002', (userData) => {
          const user = userData.data();
          expect(user.Description).toBe('Lorem Ipsum');
          done();
        });
      };
      getUser('002', callback);
    }));
});
// Create new posts
describe('add new post', () => {
  it('Should it a new post', (done) => addPost('Text Post', '001', 'ichef@mailito.com')
    .then(() => {
      const callback = (post) => {
        const result = post.find((e) => e.post === 'Text Post');
        expect(result.post).toBe('Text Post');
        done();
      };
      orderPostbyTimeDesc(callback);
    }));
});
// Update edit post
describe('update Post', () => {
  it('Should it update edit post', (done) => editPost('001', 'post editado')
    .then(() => {
      const callback = () => {
        orderPostbyTimeDesc((userData) => {
          const user = userData.data();
          console.log(user);
          expect(user.Description).toBe('post editado');
          done();
        }, '002');
      };
      orderPostbyTimeDesc(callback, '002');
    }));
});
// Delete posts
describe('Delete post', () => {
  it('Should it delete a post', (done) => deletePost('001')
    .then(() => {
      const callback = (post) => {
        const result = post.find((e) => e.id === '001');
        expect(result).toBe(undefined);
        done();
      };
      orderPostbyTimeDesc(callback);
    }));
});
// Filter only User's Post
describe('Show just user.s post', () => {
  it.skip('Should it show only user.s post', (done) => showPostUserid('001')
    .then(() => {
      const callback = (post) => {
        const result = post.find((e) => e.id === '001');
        expect(result.id).toBe('001');
        done();
      };
      orderPostbyTimeDesc(callback);
    }));
});