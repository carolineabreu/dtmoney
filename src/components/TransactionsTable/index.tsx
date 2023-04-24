import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface Transaction {
  id: number;
  amount: number;
  title: string;
  type: string;
  category: string;
  createdAt: string;
}

export function TransactionsTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    api.get("transactions")
      .then(response => setTransactions(response.data.transactions))
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((currentTransaction) => {
            return (
              <tr key={currentTransaction.id}>
                <td>{currentTransaction.title}</td>
                <td className={currentTransaction.type}>
                  {new Intl.NumberFormat("pt-Br", {
                    style: "currency",
                    currency: "BRL"
                  }).format(currentTransaction.amount)}
                </td>
                <td>{currentTransaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(new Date(currentTransaction.createdAt))}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  )
}