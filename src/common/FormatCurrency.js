function formatCurrency(price) {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
  let formattedPrice = formatter.format(price);
  formattedPrice = formattedPrice.replace("₫", "VNĐ");
  return formattedPrice;
}
export default formatCurrency;
