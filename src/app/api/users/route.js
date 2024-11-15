import userRepo from "@/app/repo/users-repo";

export async function POST(request) {
  const user = await request.json();
  const response = await userRepo.addUser(user);
  return Response.json(response, { status: 201 });
}
