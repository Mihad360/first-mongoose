import app from "./app";
import config from "./app/config";
import mongoose from "mongoose";
import { Server } from "http";
import seedSuperAdmin from "./app/DB";

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin()
    server = app.listen(config.port, () => {
      console.log(`app listening on port ${config.port}`);
    });
  } catch (error) {
    if (error) {
      console.log(error, "something went wrong");
    }
  }
}

main();

process.on("unhandledRejection", () => {
  console.log("unhandleRejection detected.. shutting down");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log("uncaughtException detected.. shutting down");
  process.exit(1);
});
