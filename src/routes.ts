import app from './app';
import User from './models/user';
import { OK, CREATED, NO_CONTENT, NOT_FOUND } from 'http-status';

app.get('/users', async function getAllusers(req, res) {
  const users: any = await User.findAll();
  res.status(OK).send({ success: true, users: users.map(userToJson) });
});

app.get('/users/:id', async function getSingleUser(req, res) {
  const user: any = await User.findOne({ where: { id: req.params.id } });

  if (user === null) {
    return res.status(NOT_FOUND).send({ success: false });
  }

  res.status(OK).send({ success: true, user: userToJson(user) });
});

app.post('/users', async function createUser(req, res) {
  const user: any = await User.create({ name: req.body.name });
  res.status(CREATED).send({ success: true, user: userToJson(user) });
});

app.delete('/users', async function deleteAllUsers(req, res) {
  await User.destroy({ where: {} });
  res.status(NO_CONTENT).send();
});

app.delete('/users/:id', async function deleteUser(req, res) {
  const user: any = await User.findOne({ where: { id: req.params.id } });

  if (user === null) {
    return res.status(NOT_FOUND).send();
  }

  await user.destroy();
  res.status(NO_CONTENT).send();
});

app.put('/users/:id', async function deleteUser(req, res) {
  const id = parseInt(req.params.id, 10);
  const name = req.body.name;

  const user: any = await User.findOne({ where: { id } });

  if (user === null) {
    return res.status(NOT_FOUND).send({ success: false });
  }

  await user.update({ name });
  res.status(OK).send({ success: true, user: { id, name } });
});

function userToJson(user) {
  return { id: user.id, name: user.name };
}
