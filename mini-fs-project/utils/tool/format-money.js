/**
 * Created by caofanghui on 17/5/26.
 */

/*
将number变为金钱格式函数：
 参数：数值，保留小数位数，货币符号，整数部分千位分隔符，小数分隔符
 例子：
 var revenue = 12345678;
 alert(formatMoney(revenue)); // ￥12,345,678.00
 alert(formatMoney(revenue, 0, "HK$ ")); // HK$ 12,345,678

 var price = 4999.99;
 alert(formatMoney(price, 2, "€", ",", ".")); // €4,999.99
 alert(formatMoney(price, 2, "€", ".", ",")); // €4.999,99

 alert(formatMoney(-500000, 0, "£ ")); // £ -500,000
 */
function formatMoney (number, places, symbol, thousand, decimal) {
  places = !isNaN(places = Math.abs(places)) ? places : 2;
  symbol = symbol !== undefined ? symbol : "￥";
  thousand = thousand || ",";
  decimal = decimal || ".";

  var number = number,
    negative = number < 0 ? "-" : "",
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
    j = (j = i.length) > 3 ? j % 3 : 0;

  return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");

};

export {
  formatMoney
}
