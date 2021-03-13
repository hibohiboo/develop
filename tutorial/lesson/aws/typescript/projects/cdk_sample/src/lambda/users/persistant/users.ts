import { Collection } from 'mongodb';
import { getClient } from '@/persistant/client';
import { User } from '../types';

const _getUsers = async () => {
  const client = await getClient();
  const users = await client.collection('users');
  return users;
}

export const findByName = async (username: string, getUsers: () => Promise<Collection> = _getUsers) => {
  const users = await getUsers();
  return users.findOne({ username });
}

export const create = async (user: User, getUsers: () => Promise<Collection> = _getUsers) => {
  const users = await getUsers();
  const result = await users.insertOne(user);
  if (!result.insertedId) {
    throw Error('failed');
  }
  return user;
}