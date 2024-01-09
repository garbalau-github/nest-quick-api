import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'John Doe',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Jane Doe',
      role: 'ENGINEER',
    },
    {
      id: 3,
      name: 'Johnny Doe',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: 'Janie Doe',
      role: 'ENGINEER',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter((user) => user.role === role);
    }
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  create(user: { name: string; role: 'INTERN' | 'ENGINEER' | 'ADMIN' }) {
    const usersByHeighestId = this.users.sort((a, b) => {
      return Number(b.id) - Number(a.id);
    });

    const newUser = {
      id: Number(usersByHeighestId[0].id) + 1,
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }

  update(
    id: number,
    userUpdate: { name?: string; role?: 'INTERN' | 'ENGINEER' | 'ADMIN' },
  ) {
    const user = this.users.find((user) => user.id === id);
    const userIndex = this.users.findIndex((user) => user.id === id);

    const updatedUser = {
      ...user,
      ...userUpdate,
    };

    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return user;
  }
}
