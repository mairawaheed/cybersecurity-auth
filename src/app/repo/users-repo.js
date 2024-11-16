import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
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

  async updateUser(id, user) {
    try {
      return prisma.user.update({ where: { id }, data: user });
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

  async validateCredentials(username, password) {
    try {
      const user = await prisma.user.findFirst({
        where: { username },
      });

      if (!user) {
        return { userId: null };
      }
      const passwordIsValid = await bcrypt.compare(password, user.password);
      console.log("Password is valid:", passwordIsValid);

      if (!passwordIsValid) {
        return { userId: null };
      }

      return { userId: user.id };
    } catch (error) {
      console.error("Error checking credentials:", error);
      return { userId: null };
    }
  }
}

export default new UserRepo();
