var sum_to_n_a = function (n) {
  // I found on the internet that there is a formular to calculate the sum to N. Hence I would perform it in JS
  return (n * (n + 1)) / 2;
};

var sum_to_n_b = function (n) {
  // most common way for me
  let result = 0;
  for (let i = 1; i <= n; i++) {
    result += i;
  }
  return result;
};

var sum_to_n_c = function (n) {
  // Recursion
  if (n === 1) return 1;
  else return n + sum_to_n_c(n - 1);
};
