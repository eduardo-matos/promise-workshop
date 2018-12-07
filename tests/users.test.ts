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

  it('Get all users', async () => {
    // :: Criar 2 usuários, um com nome 'Spam' e outro com nome 'Fish' :: //
    const [s, f] = await Promise.all([
      User.create({ name: 'Spam' }),
      User.create({ name: 'Fish' }),
    ]);
    const res = await client().get('/users');

    expect(res).to.have.status(OK);
    expect(res.body).to.eql({ success: true, users: [{ id: s.id, name: 'Spam' }, { id: f.id, name: 'Fish' }] });
  });

  it('Return not found if user does not exist', async () => {
    const result = await client().get('/users/3');

    expect(result).to.have.status(NOT_FOUND);
    expect(result.body).to.eql({success: false});
  });
});

describe('Create', () => {
  it('Create user', async () => {
    // :: Converter para async/await :: //
    const res = await client().post('/users').send({ name: 'Foo' });
    const user: any = await User.findOne({ where: { name: 'Foo' } });
    expect(res.body).to.eql({ success: true, user: { id: user.id, name: 'Foo' } });
    expect(res).to.have.status(CREATED);
  });
});

describe('Delete', () => {
  it('Delete single user', async () => {
    // :: Converter para async/await :: //

    const user = await User.create({ name: 'Yay' });
    const res = await client().del(`/users/${user.id}`);
    expect(res).to.have.status(NO_CONTENT);
    expect(res.text).to.equal('');
    const users = await User.findAll();
    expect(users).to.eql([]);
  });

  it('Delete all users', async () => {
    await Promise.all([
      User.create({name: 'baz'}),
      User.create({name: 'bar'}),
    ]);
    let users = await User.findAll();
    expect(users.length).to.eql(2);
    const res = await client().del('/users');
    users = await User.findAll();
    expect(users.length).to.eql(0);
    expect(res).to.have.status(NO_CONTENT);
  });

  it('Returns not found if user does not exist', async () => {
    const res = await client().del('/users/99');

    expect(res).to.have.status(NOT_FOUND);
    expect(res.text).to.equal('');
  });
});

describe('Update', () => {
  it('Updates user', async () => {
    let user = await User.create({name: 'baz'});
    const res = await client().put(`/users/${user.id}`).send({ name: 'Foo' });

    user = await User.findOne({where:{id:user.id}});

    expect(res).to.have.status(OK);
    expect(user.name).to.eq('Foo');
    expect(res.body).to.eql({ success: true, user: { id: user.id, name: 'Foo' } });
  });
  it('Returns not found if user does not exist', async () => {
    const res = await client().put('/users/1').send({ name: 'Foo' });

    expect(res).to.have.status(NOT_FOUND);
    expect(res.body).to.eql({ success: false });
  });
});
