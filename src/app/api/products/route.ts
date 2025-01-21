import { client } from "@/sanity/lib/client";
import {  NextResponse } from "next/server";

export async function GET() {
    try {
        const data = await client.fetch(`
        *[_type == "products"] {
          _id,
          name,
          price,
          image,
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

        if (!data) {
            return NextResponse.json({ error: "No products found" }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}