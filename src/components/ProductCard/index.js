const ProductCard = props => {
  const {productData} = props
  const product = productData
  return <h1>{product.title}</h1>
}
export default ProductCard
