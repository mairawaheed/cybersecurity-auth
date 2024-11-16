import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class FingerprintRepo {
  async getFingerprints() {
    try {
      return prisma.fingerprint.findMany();
    } catch (error) {
      return { error: error.message };
    }
  }

  async getFingerprintById(id) {
    try {
      return prisma.fingerprint.findUnique({
        where: { id },
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  async addFingerprint(fingerprint) {
    try {
      return prisma.fingerprint.create({ data: fingerprint });
    } catch (error) {
      return { error: error.message };
    }
  }

  async deleteFingerprint(id) {
    try {
      return prisma.fingerprint.delete({ where: { id } });
    } catch (error) {
      return { error: error.message };
    }
  }

  async verifyFingerprint(fingerprint) {
    try {
      return prisma.fingerprint.findFirst({
        where: fingerprint,
      });
    } catch (error) {
      return { error: error.message };
    }
  }
}

export default new FingerprintRepo();
