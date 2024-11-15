import userRepo from "@/app/repo/users-repo";

export async function GET(request, { params }) {
  const { id } = await params;
  const user = await userRepo.getUserById(id);
  return Response.json(user, { status: 200 });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const response = await userRepo.deleteUser(id);
  return Response.json(response, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = await params;
  const user = await request.json();
  const response = await userRepo.updateUser(id, user);
  return Response.json(response, { status: 200 });
}
