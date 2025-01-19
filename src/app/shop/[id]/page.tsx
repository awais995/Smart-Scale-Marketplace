// src/app/productpage/page.tsx

import React from 'react';
import ProductDetail from './productdetail';
import ProductReviews from '@/components/ProductReviews';
import {RelatedProducts} from '@/components/RelatedProducts';

const page = () => {
  return (
    <div>
      <ProductDetail  /> {/* Example static ID */}
      <ProductReviews />
      <RelatedProducts />
    </div>
  );
};

export default page;
