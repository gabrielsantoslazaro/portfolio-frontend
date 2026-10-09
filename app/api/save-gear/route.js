import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req) {
  try {
    const { filename, dataUrl } = await req.json();
    if (!filename || !dataUrl) {
      return NextResponse.json({ error: "Missing filename or dataUrl" }, { status: 400 });
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    const targetPath = path.join(process.cwd(), "public", "Images", filename);
    fs.writeFileSync(targetPath, buffer);
    console.log("Saved transparent image:", filename, buffer.length);

    return NextResponse.json({ success: true, filename, size: buffer.length });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
