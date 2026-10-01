const phone = document.getElementById("phone");

const formatPhone = (value) => {
  let digits = value.startsWith("+27") ? value.slice(3) : value;
  digits = digits.replace(/\D/g, "");

  if (digits.length > 9 && digits.startsWith("27")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = digits.slice(1);
  digits = digits.slice(0, 9);

  if (!digits) return "";
  const parts = [digits.slice(0, 2), digits.slice(2, 5), digits.slice(5)];
  return "+27 " + parts.filter(Boolean).join(" ");
};

phone.addEventListener("input", () => {
  phone.value = formatPhone(phone.value);
});

phone.addEventListener("focus", () => {
  if (!phone.value) phone.value = "+27 ";
});

phone.addEventListener("blur", () => {
  if (phone.value.trim() === "+27") phone.value = "";
});