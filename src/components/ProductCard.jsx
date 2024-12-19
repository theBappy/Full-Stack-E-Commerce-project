import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <Link to={`/product/${product._id}`} className="btn">View Details</Link>
      <button className="btn" onClick={() => alert('Added to cart!')}>Add to Cart</button>
    </div>
  );
};

export default ProductCard;
