async function getAuthToken() {
  const response = await fetch("http://4.224.186.213/evaluation-service/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: "suyash.23b0131126@abes.ac.in",
      name: "suyash verma",
      rollNo: "2300320130257",
      accessCode: "cXuqht",
      clientID: "14a91eca-89eb-411a-ad22-822de4a7daf6",
      clientSecret: "gRXRYEyxxDhHyEVq",
    }),
  });

  const data = await response.json();
  console.log(data.access_token);
}

getAuthToken();
