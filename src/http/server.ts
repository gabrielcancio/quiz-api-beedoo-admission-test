import { app } from "./app";

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is runnig on http://localhost:3000")
);
