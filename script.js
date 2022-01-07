function add(...numbers) {
  return numbers.reduce((acc, number) => acc + number, 0);
}

function subtract(...numbers) {
  return numbers.reduce((acc, number) => {
    console.log("acc: ", acc);
    return acc - number;
  });
}
function multiply(...numbers) {
  return numbers.reduce((acc, number) => acc * number, 1);
}

function divide(...numbers) {
  return numbers.reduce((acc, number) => acc / number);
}
