import "dotenv/config";
import "./instrumentation";
import app from "./app";

if (process.env.NODE_ENV !== "test") {
    const PORT = Number(process.env.PORT) || 4000;

    app.listen(PORT, () => {
        console.log(`Backend running on port ${PORT}`);
    });
}

export default app;