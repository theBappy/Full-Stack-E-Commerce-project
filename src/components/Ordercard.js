import { formatDistanceToNow } from 'date-fns';

const OrderCard = ({ order, isAdmin, onStatusChange }) => {
  const formattedDate = formatDistanceToNow(new Date(order.createdAt), { addSuffix: true });

  return (
    <div key={order._id} className="order-card">
      <p><strong>Order ID:</strong> {order._id}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Ordered:</strong> {formattedDate}</p>

      {isAdmin && (
        <select 
          onChange={(e) => onStatusChange(order._id, e.target.value)} 
          value={order.status}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      )}
    </div>
  );
};


export default OrderCard;

