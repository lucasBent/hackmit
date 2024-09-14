import { ConvexClient } from "convex/browser";
import { api } from "./convex/_generated/api.js";

const client = new ConvexClient("https://wonderful-egret-944.convex.cloud");

const unsubscribe = client.onUpdate(api.words.getWords, {}, async (words) => {
  console.log(words);
});

await Bun.sleep(1000);
unsubscribe();
await client.close();