import userRepo from "@/app/repo/users-repo";

export async function POST(request, { params }) {
  console.log("Inside the post call for login");
  const credentials = await request.json();
  console.log("Credentials:", credentials);
  const username = credentials.username;
  const password = credentials.password;
  const response = await userRepo.validateCredentials(username, password);
  if (response.userId != null) {
    return Response.json(response.userId, { status: 200 });
  } else {
    return Response.json(response.userId, { status: 401 });
  }
}
