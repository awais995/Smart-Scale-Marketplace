import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const query = `
      *[_type == "products" && _id == $id][0] {
        _id,
        name,
        price,
        description,
        "imageUrl": image.asset->url,
        category,
        discountPercent,
        isNew,
        colors,
        sizes
      }
    `;

    const product = await client.fetch(query, { id });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product details" },
      { status: 500 }
    );
  }
}
