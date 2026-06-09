const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdXlhc2guMjNiMDEzMTEyNkBhYmVzLmFjLmluIiwiZXhwIjoxNzgwOTg1ODQ2LCJpYXQiOjE3ODA5ODQ5NDYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJjYmE5N2U0OC01N2I2LTRkNDYtOWFiOS1kOGExMDk2YzY0YTAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzdXlhc2ggdmVybWEiLCJzdWIiOiIxNGE5MWVjYS04OWViLTQxMWEtYWQyMi04MjJkZTRhN2RhZjYifSwiZW1haWwiOiJzdXlhc2guMjNiMDEzMTEyNkBhYmVzLmFjLmluIiwibmFtZSI6InN1eWFzaCB2ZXJtYSIsInJvbGxObyI6IjIzMDAzMjAxMzAyNTciLCJhY2Nlc3NDb2RlIjoiY1h1cWh0IiwiY2xpZW50SUQiOiIxNGE5MWVjYS04OWViLTQxMWEtYWQyMi04MjJkZTRhN2RhZjYiLCJjbGllbnRTZWNyZXQiOiJnUlhSWUV5eHhEaEh5RVZxIn0.d2eWJ3MYAbO-37IG0OZPcSQ0PSJsNreybM59BU6bndg";

export async function Log(stack, level, pkg, message) {
  try {
    const response = await fetch(
      "http://4.224.186.213/evaluation-service/logs",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          stack: stack,
          level: level,
          package: pkg,
          message: message,
        }),
      },
    );

    const data = await response.json();
    console.log("Log response:", data);
    return data;
  } catch (error) {
    console.error("Log failed:", error.message);
  }
}
