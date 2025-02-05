export async function getPrice() {
  const url = "https://interview.switcheo.com/prices.json";
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    var fromCurrencyDropdown = document.getElementById("fromCurrency");
    var toCurrencyDropdown = document.getElementById("toCurrency");
    for (let i = 0; i < json.length; i++) {
      var opt = document.createElement("option");
      opt.value = json[i]["currency"];
      opt.innerHTML = json[i]["currency"];
      fromCurrencyDropdown.appendChild(opt);
      var cloneOpt = opt.cloneNode(true);
      toCurrencyDropdown.appendChild(cloneOpt);
    }
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
