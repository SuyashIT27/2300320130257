async function register() {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/register",
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
          githubUsername: "SuyashIT27",
          mobileNo:"9118848131",
        }),
      }
    );

    const result = await response.text();

    console.log("Status:", response.status);
    console.log("Response:", result);
  } catch (error) {
    console.error(error);
  }
}

register();