import "./genkit.js";
import { startServer } from "./server.js";

async function main() {
  try {
    await startServer();
  } catch (error) {
    process.exit(1);
  }
}

main();
