import connectDB from "./lib/connectDB";
import app from "./app";
import "dotenv/config"

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}).catch((e) => console.log(e));
