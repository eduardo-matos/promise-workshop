import client from './http-client';
import User from '../src/models/user';
import { expect } from 'chai';
import { OK, NO_CONTENT, CREATED, NOT_FOUND } from 'http-status';
import '../src/routes';
import './setup';

describe('Read', () => {
  it('Get single user', async () => {
    const user: any = await User.create({ name: 'Yay' });

    const res = await client().get(`/users/${user.id}`);

    expect(res).to.have.status(OK);
    expect(res.body).to.eql({ success: true, user: { id: user.id, name: user.name } });
  });

  it.skip('Get all users', async () => {
    // :: Criar 2 usuários, um com nome 'Spam' e outro com nome 'Fish' :: //

    const res = await client().get('/users');

    expect(res).to.have.status(OK);
    expect(res.body).to.eql({ success: true, users: [{ id: 1, name: 'Spam' }, { id: 2, name: 'Fish' }] });
  });

  it.skip('Return not found if user does not exist');
});

describe('Create', () => {
  it.skip('Create user', () => {
    // :: Converter para async/await :: //

    return client().post('/users').send({ name: 'Foo' }).then((res) => {
      return User.findOne({ where: { name: 'Foo' } }).then((user: any) => {
        expect(res.body).to.eql({ success: true, user: { id: user.id, name: 'Foo' } });
        expect(res).to.have.status(CREATED);
      });
    });
  });
});

describe('Delete', () => {
  it.skip('Delete single user', async () => {
    // :: Converter para async/await :: //

    return User.create({ name: 'Yay' }).then((user: any) => {
      return client().del(`/users/${user.id}`).then((res) => {
        expect(res).to.have.status(NO_CONTENT);
        expect(res.text).to.equal('');

        return User.findAll().then((users: any) => {
          expect(users).to.eql([]);
        });
      });
    });
  });

  it.skip('Delete all users');

  it('Returns not found if user does not exist', async () => {
    const res = await client().del('/users/99');

    expect(res).to.have.status(NOT_FOUND);
    expect(res.text).to.equal('');
  });
});

describe('Update', () => {
  it.skip('Updates user');
  it.skip('Returns not found if user does not exist');
});
