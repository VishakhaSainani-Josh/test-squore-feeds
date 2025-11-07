import fs from "fs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;

    console.log(`📡 Live update received for match ${data.match_id}`);
    console.log(`${data.players?.A} vs ${data.players?.B}`);
    console.log(`Status: ${data.status} | Updated at: ${data.updated_at}`);

    // Optional: store locally (note: Vercel’s file system is ephemeral)
    fs.appendFileSync("/tmp/live_scores.log", JSON.stringify(data) + "\n");

    res.status(200).send("Live update received");
  } catch (err) {
    console.error("Error processing update:", err);
    res.status(500).send("Error processing update");
  }
}
