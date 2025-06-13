import express from "express";
import employees from "#db/employees";
const app = express();

app.route("/").get(async (req, res) => {
  res.send("Hello Employees!");
});

app.route("/employees").get(async (req, res) => {
  res.send(employees);
});

app.route("/employees/random").get(async (req, res) => {
  const random = Math.floor(Math.random() * employees.length);
  const employee = employees[random];
  
  if (!employee) {
    res.sendStatus(404);
    return;
  }

  res.send(employee);
});

app.route("/employees/:id").get(async (req, res) => {
  const { id } = req.params;
  const filtered = employees.filter(employee => employee.id == id);
  
  if (filtered.length == 0) {
    res.sendStatus(404);
    return;
  }

  res.send(filtered[0]);
});

export default app;
