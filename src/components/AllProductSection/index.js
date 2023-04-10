import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import ProductCard from '../ProductCard'

import './index.css'

class AllProductSection extends Component {
  state = {productList: [], isLoading: true}

  componentDidMount() {
    this.getProducts()
  }

  getProducts = async () => {
    const apiUrl = 'https://apis.ccbp.in/products'
    const jwtToken = Cookies.get('jwtToken')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, option)

    if (response.ok === true) {
      const fetchData = await response.json()
      const updatedData = fetchData.products
      console.log(updatedData)
      const updatedList = updatedData.map(each => ({
        title: each.title,
        brand: each.brand,
        price: each.price,
        id: each.id,
        imageUrl: each.image_url,
        rating: each.rating,
      }))
      this.setState({productList: updatedList, isLoading: false})
    }
  }

  renderProductList = () => {
    const {productList, isLoading} = this.state
    return (
      <div>
        <h1 className="products-list-heading">All Products </h1>
        <ul className="products-list">
          {isLoading ? (
            <Loader
              type="TailSpin"
              color="red"
              height={100}
              width={100}
              className="spinner"
            />
          ) : (
            productList.map(product => (
              <ProductCard productData={product} key={product.id} />
            ))
          )}
        </ul>
      </div>
    )
  }

  render() {
    return this.renderProductList()
  }
}

export default AllProductSection
