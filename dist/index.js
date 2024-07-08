"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth/auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
// CONNECTION TO DATABASE
mongoose_1.default
    .connect(process.env.DB_CONNECT, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
})
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server up and running at ${PORT}`));
})
    .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});
// MIDDLEWARE
app.use(express_1.default.json(), (0, cors_1.default)());
// ROUTE MIDDLEWARE
app.use("/api/auth", auth_1.default);
app.get("/", (req, res) => {
    res.send(`<p>Ai Fairness Backend !</p>`);
});
