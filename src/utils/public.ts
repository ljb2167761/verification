export function verification(str: string) {
  // 1 首位不能是0  ^[1-9]
  // 2 必须是 [5, 11] 位的数字  \d{4, 9}
  var reg = /^[1-9][0-9]{4,9}$/gim;
  if (reg.test(str)) {
    console.log("QQ号码格式输入正确");
    return true;
  } else {
    console.log("请输入正确格式的QQ号码");
    return false;
  }
}
