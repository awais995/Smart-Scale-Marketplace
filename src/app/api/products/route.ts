import { client } from "@/sanity/lib/client";
import {  NextResponse } from "next/server";

export async function GET() {
    const data = await client.fetch(`
   *[_type == "products"] {
  _id,
  name,
  price,
  description,
  imageslist,
  "imageUrl": image.asset->url,
  category,
  discountPercent,
  isNew,
  colors[],
  sizes[]
}
    `);
    return NextResponse.json(data);
}