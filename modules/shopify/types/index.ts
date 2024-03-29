import type { CartFragment, CollectionFragment, GetCartQuery, GetCollectionsQuery, GetProductQuery, GetProductsQuery } from "#gql";

// Cart
export type ShopifyCartLineItem = CartFragment["lines"]["edges"][0]["node"]
export type ShopifyCart = GetCartQuery["cart"]

// Product
export type ShopifyProduct = GetProductQuery["product"]
export type ShopifyProducts = GetProductsQuery["products"]

//Collection
export type ShopifyCollection = CollectionFragment
export type ShopifyCollections = GetCollectionsQuery['collections']