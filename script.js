function formatMoney(value) {
  return value.toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR"
  });
}

function calculate() {

  const price = parseFloat(document.getElementById("price").value);
  const entry = parseFloat(document.getElementById("entry").value);
  const interest = parseFloat(document.getElementById("interest").value) / 100 / 12;
  const years = parseFloat(document.getElementById("years").value);
  const error = document.getElementById("error");
  const btn = document.getElementById("calc-btn");

  if (!price || !entry || !interest || !years) {
    error.innerText = "Completa todos los campos";
    return;
  }

  error.innerText = "";

  btn.disabled = true;
  btn.innerText = "Calculando...";

  setTimeout(() => {

    const loan = price - entry;
    const months = years * 12;

    // Fórmula hipoteca (clave PRO)
    const monthly = loan * (interest * Math.pow(1 + interest, months)) / 
                    (Math.pow(1 + interest, months) - 1);

    const total = monthly * months;
    const interestTotal = total - loan;

    document.getElementById("loan").innerText = formatMoney(loan);
    document.getElementById("monthly").innerText = formatMoney(monthly);
    document.getElementById("interestTotal").innerText = formatMoney(interestTotal);
    document.getElementById("total").innerText = formatMoney(total);

    document.getElementById("results").classList.add("show");

    btn.disabled = false;
    btn.innerText = "Calcular hipoteca";

  }, 800);
}
