import "./genkit";
import { startServer } from "./server";

async function main() {
  try {
    await startServer();
  } catch (error) {
    process.exit(1);
  }
}

main();
