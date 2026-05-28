import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;
  const monthlyId = process.env.LEMON_SQUEEZY_MONTHLY_PRODUCT_ID;
  const annualId = process.env.LEMON_SQUEEZY_ANNUAL_PRODUCT_ID;
  const lifetimeId = process.env.LEMON_SQUEEZY_LIFETIME_PRODUCT_ID;

  if (!apiKey || (!monthlyId && !annualId && !lifetimeId)) {
    return NextResponse.json({ error: 'Lemon Squeezy API key or Product IDs not configured' }, { status: 500 });
  }

  try {
    const fetchProduct = async (id: string | undefined) => {
      if (!id) return null;
      const res = await fetch(`https://api.lemonsqueezy.com/v1/products/${id}`, {
        headers: {
          'Accept': 'application/vnd.api+json',
          'Authorization': `Bearer ${apiKey}`
        },
        next: { revalidate: 3600 }
      });
      if (!res.ok) throw new Error(`Failed to fetch variant ${id}`);
      const data = await res.json();
      return data.data;
    };

    const [monthly, annual, lifetime] = await Promise.all([
      fetchProduct(monthlyId),
      fetchProduct(annualId),
      fetchProduct(lifetimeId)
    ]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formatPrice = (variant: any) => {
      if (!variant || !variant.attributes || !variant.attributes.price) return null;
      const priceCents = variant.attributes.price;
      // Convert cents to standard currency format (e.g. 4999 -> 49.99)
      const formattedPrice = (priceCents / 100).toString();
      // Replace .00 if whole number
      return formattedPrice.endsWith('.00') ? formattedPrice.slice(0, -3) : formattedPrice;
    };

    return NextResponse.json({
      monthly: formatPrice(monthly),
      annual: formatPrice(annual),
      lifetime: formatPrice(lifetime)
    });
  } catch (error) {
    console.error('Lemon Squeezy Pricing Fetch Error:', error);
    return NextResponse.json({ error: 'Failed to fetch pricing' }, { status: 500 });
  }
}
