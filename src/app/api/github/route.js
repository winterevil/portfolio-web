import axios from "axios";

export async function GET(request) {
  const url = new URL(request.url);
  const username = url.searchParams.get('username'); 

  if (!username) {
    return new Response(
      JSON.stringify({ error: "Username is required" }),
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${username}/repos`);
    return new Response(JSON.stringify(response.data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch repositories from GitHub" }),
      { status: 500 }
    );
  }
}
