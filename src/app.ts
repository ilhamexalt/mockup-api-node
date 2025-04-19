import express from "express";
import userRoutes from "../src/routes/users";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
