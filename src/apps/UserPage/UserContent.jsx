import UserContentStyle from "./UserContent.module.scss";
import UserOrder from "./components/UserOrder";
function UserInfo() {
  const customerInfo = {
    name: "Đỗ Nguyễn Trọng Hiếu",
    email: "thienthan726@gmail.com",
  };
  return (
    <div className={UserContentStyle.container}>
      <div className={UserContentStyle.userInfo}>
        <p>{customerInfo.name}</p>
        <p>{customerInfo.email}</p>
      </div>
      <div>
        <UserOrder />
      </div>
    </div>
  );
}

export default UserInfo;
