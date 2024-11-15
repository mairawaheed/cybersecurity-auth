import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class UserRepo {
  async getUsers() {
    try {
      return prisma.user.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }

  async getUserById(id) {
    try {
      return prisma.user.findUnique({
        where: { id },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async addUser(user) {
    try {
      return prisma.user.create({ data: user });
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteUser(id) {
    try {
      return prisma.user.delete({ where: { id } });
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new UserRepo();
