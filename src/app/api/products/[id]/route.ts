import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  // Validate the `id` parameter
  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    // Sanity query to fetch the product
    const query = `
      *[_type == "products" && _id == $id][0] {
        _id,
        name,
        image,
        imageslist,
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

    // Fetch product data from Sanity
    const product = await client.fetch(query, { id });

    // Check if product exists
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Return the product details
    return NextResponse.json(product);
  } catch (error) {
    // Narrow the type of `error` for better TypeScript handling
    if (error instanceof Error) {
      console.error("Error fetching product:", error.message);
      return NextResponse.json(
        { error: "Failed to fetch product details", details: error.message },
        { status: 500 }
      );
    } else {
      console.error("Unknown error fetching product:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 }
      );
    }
  }
}
