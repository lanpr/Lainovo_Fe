import UserOrderStyle from './UserOrder.module.scss'
function UserOrder() {
  return (
    <table className={UserOrderStyle.table}>
      <thead>
        <tr>
          <th>Order id</th>
          <th>Order day</th>
          <th>Status</th>
          <th>Total price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
            <td>1</td>
            <td>2024/4/4</td>
            <td>Complete</td>
            <td>100.000 vnd</td>
        </tr>
      </tbody>
    </table>
  );
}

export default UserOrder;
