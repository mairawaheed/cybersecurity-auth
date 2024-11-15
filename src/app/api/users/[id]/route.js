import userRepo from "@/app/repo/users-repo";

export async function GET(request, { params }) {
  const userId = params.id;
  const user = await userRepo.getUserById(parseInt(userId));
  return Response.json(user, { status: 200 });
}

export async function DELETE(request, { params }) {
  const userId = parseInt(params.id);
  const response = await userRepo.deleteUser(userId);
  return Response.json(response, { status: 200 });
}
