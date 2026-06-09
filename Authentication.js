async function getAuthToken() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "suyash.23b0131126@abes.ac.in",
          name: "Suyash Verma",
          rollNo: "2300320130257",
          accessCode: "cXuqht",
          clientID: "14a91eca-89eb-411a-ad22-822de4a7daf6",
          clientSecret: "gRXRYEyxxDhHyEVq",
        }),
      },
    );

    const data = await response.json();

    console.log("Status:", response.status);
    console.log("Token Type:", data.token_type);
    console.log("Access Token:", data.access_token);
    console.log("Expires In:", data.expires_in);
  } catch (error) {
    console.error("Auth Failed:", error.message);
  }
}

getAuthToken();
git add .
git commit -m "Merge remote repository"
git push -u origin main
