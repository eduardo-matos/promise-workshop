import client from './http-client';
import User from '../src/models/user';
import { expect } from 'chai';
import { OK, NO_CONTENT, CREATED, NOT_FOUND } from 'http-status';
import '../src/routes';
import './setup';

describe('Read', () => {
  it('Get all users names and IDs', async () => {
    await User.create({ name: 'Spam' });
    await User.create({ name: 'Fish' });

    const res = await client().get('/users');
    expect(res).to.have.status(OK);
    expect(res.body).to.eql({ success: true, users: [{ id: 1, name: 'Spam' }, { id: 2, name: 'Fish' }] });
  });

  it('Get single user', async () => {
    const user: any = await User.create({ name: 'Yay' });

    const res = await client().get(`/users/${user.id}`);

    expect(res).to.have.status(OK);
    expect(res.body).to.eql({ success: true, user: { id: user.id, name: user.name } });
  });

  it('Return not found if user does not exist', async () => {
    const res = await client().get('/users/99');

    expect(res).to.have.status(NOT_FOUND);
    expect(res.body).to.eql({ success: false });
  });
});

describe('Create', () => {
  it('Create user', async () => {
    const res = await client().post('/users').send({ name: 'Foo' });

    const createdUsed: any = await User.findOne({ where: { name: 'Foo' } });
    expect(res).to.have.status(CREATED);
    expect(res.body).to.eql({ success: true, user: { id: createdUsed.id, name: 'Foo' } });
  });
});

describe('Delete', () => {
  it('Delete single user', async () => {
    const user: any = await User.create({ name: 'Yay' });

    const res = await client().del(`/users/${user.id}`);

    expect(res).to.have.status(NO_CONTENT);
    expect(res.text).to.equal('');
    expect(await User.findAll()).to.eql([]);
  });

  it('Delete all users', async () => {
    await User.create({ name: 'Foo' });
    await User.create({ name: 'Bar' });

    const res = await client().del('/users');

    expect(res.text).to.equal('');
    expect(res).to.have.status(NO_CONTENT);
    expect(await User.findAll()).to.eql([]);
  });

  it('Returns not found if user does not exist', async () => {
    const res = await client().del('/users/99');

    expect(res).to.have.status(NOT_FOUND);
    expect(res.text).to.equal('');
  });
});

describe('Update', () => {
  it('Updates user', async () => {
    const user: any = await User.create({ name: 'Foo' });

    const res = await client().put(`/users/${user.id}`).send({ name: 'Yay' });

    expect(res).to.have.status(OK);
    expect(res.body).to.eql({ success: true, user: { id: user.id, name: 'Yay' } });
  });

  it('Returns not found if user does not exist', async () => {
    const res = await client().put('/users/99');

    expect(res).to.have.status(NOT_FOUND);
    expect(res.body).to.eql({ success: false });
  });
});
