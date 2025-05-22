const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeSelect = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const ctx = document.getElementById("expenseChart").getContext("2d");
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let chart;
function updateChart() {
  const income = expenses
    .filter((exp) => exp.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const expense = expenses
    .filter((exp) => exp.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Amount",
        data: [income, expense],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
function addExpense() {
  const description = descriptionInput.value;
  const amount = parseFloat(amountInput.value);
  const type = typeSelect.value;
  if (description && !isNaN(amount)) {
    expenses.push({ description, amount, type });
    localStorage.setItem("expenses", JSON.stringify(expenses));
    descriptionInput.value = "";
    amountInput.value = "";
    updateChart();
  } else {
    alert("Please enter valid description and amount.");
  }
}
addBtn.addEventListener("click", addExpense);
// Initial chart update
updateChart();
