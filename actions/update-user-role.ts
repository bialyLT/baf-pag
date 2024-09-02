"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/db";
import { userRoleSchema } from "@/lib/validations/user";

export type FormData = {
  role: UserRole;
};

export async function updateUserRole(userId: string, data: FormData) {
  try {
    const session = await auth();

    if (!session?.user || session?.user.id !== userId) {
      throw new Error("No autorizado desde update-user-role.ts");
    }

    const { role } = userRoleSchema.parse(data);

    // Actualizar el rol del usuario.
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role,
      },
    });

    revalidatePath("/panel-de-control/configuraciones");
    return { status: "success" };
  } catch (error) {
    // console.log(error)
    return { status: "error" };
  }
}
