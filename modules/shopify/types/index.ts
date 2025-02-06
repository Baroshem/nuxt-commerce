import type { CartFragment, GetCartQuery, GetCollectionQueryVariables, GetCollectionsQuery, GetProductQuery, GetProductsQuery, ProductFragment } from '#gql'

// Price
export type ShopifyPrice = ProductFragment['priceRange']['maxVariantPrice']

// Cart
export type ShopifyCartLineItem = CartFragment['lines']['edges'][0]['node']
export type ShopifyCart = GetCartQuery['cart']

// Product
export type ShopifyProduct = GetProductQuery['product']
export type ShopifyProducts = GetProductsQuery['products']

// Collection
export type ShopifyCollections = GetCollectionsQuery['collections']
export type ShopifyCollectionSortKey = GetCollectionQueryVariables['sortKey']

// Following export of enum breaks CI
// export { ProductCollectionSortKeys as ShopifyCollectionSortKeys } from '#gql/default'
export enum ShopifyCollectionSortKeys {
  /** Sort by the `best-selling` value. */
  BEST_SELLING = 'BEST_SELLING',
  /** Sort by the `collection-default` value. */
  COLLECTION_DEFAULT = 'COLLECTION_DEFAULT',
  /** Sort by the `created` value. */
  CREATED = 'CREATED',
  /** Sort by the `id` value. */
  ID = 'ID',
  /** Sort by the `manual` value. */
  MANUAL = 'MANUAL',
  /** Sort by the `price` value. */
  PRICE = 'PRICE',
  /**
   * Sort by relevance to the search terms when the `query` parameter is specified on the connection.
   * Don't use this sort key when no search query is specified.
   *
   */
  RELEVANCE = 'RELEVANCE',
  /** Sort by the `title` value. */
  TITLE = 'TITLE',
}
