import { account } from "@/lib/appwrite";
import prisma from "@/lib/prisma";

export async function syncUser() {
  const user = await account.get();

  const existingUser = await prisma.user.findUnique({
    where: {
      appwriteId: user.$id,
    },
  });

  if (existingUser) {
    return existingUser;
  }

  return prisma.user.create({
    data: {
      appwriteId: user.$id,
      name: user.name,
      email: user.email,
      avatar: null,
    },
  });
}