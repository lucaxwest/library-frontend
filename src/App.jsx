import { useEffect, useState } from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import api from './service/api'
import moment from 'moment'
import "./App.css"

function App() {
  const [livros, setLivros] = useState([])
  const [clientes, setClientes] = useState([])

  const [clienteId, setClienteId] = useState()
  const [livroId, setLivroId] = useState()

  async function cadastrarAluguel() {
    console.log({ clienteId: clienteId, livroId: livroId })
    await api
      .post('/aluguel', {
        clienteId: parseInt(clienteId),
        livroId: parseInt(livroId),
      })
      .then((response) => {
        getAluguels()
      })
  }

  const [aluguels, setAlguels] = useState([])

  async function getAluguels() {
    await api
      .get('/aluguel')
      .then((response) => {
        setAlguels(response.data)
      })
      .catch((e) => {
        alert(e)
      })
  }

  useEffect(() => {
    getAluguels()
    getClientes()
    getLivros()
  }, [])

  async function getClientes() {
    await api.get('/cliente').then((response) => {
      setClientes(response.data)
    })
  }

  async function getLivros() {
    await api.get('/livro').then((response) => {
      setLivros(response.data)
    })
  }

  return (
    <div className="container">
      <Form className="Form">
          <h2>Cadastrar</h2>

          <Form.Select
            className="mb-1"
            onChange={(e) => {
              setClienteId(e.target.value)
            }}
            value={clienteId}
            aria-label="Default select example"
          >
            {clientes.map((c) => {
              return <option value={c.id}>{c.nome}</option>
            })}
          </Form.Select>
          <Form.Select
            className="mb-1"
            onChange={(e) => {
              setLivroId(e.target.value)
            }}
            value={livroId}
            aria-label="Default select example"
          >
            {livros.map((v) => {
              return <option value={v.id}>{v.nome}</option>
            })}
          </Form.Select>

          <Button 
            variant="dark"
            className="button-salvar"
            onClick={cadastrarAluguel}>
            Salvar
          </Button>

      </Form> 

      <Table striped bordered hover className="Table">
        <thead>
          <tr>
            <th>Livro</th>
            <th>Cliente</th>
            <th>Data</th>
            <th>Data Retorno</th>
            <th>Valor Diaria</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {aluguels.map((a) => {
            return (
              <tr>
                <td>{a.Livro.nome}</td>
                <td>{a.Cliente.nome}</td>
                <td>{moment(a.data).format('DD/MM/YYYY')}</td>
                <td>
                  {a.dataDevolucao &&
                    moment(a.dataDevolucao).format('DD/MM/YYYY')}
                </td>
                <td>{a.Livro.valorDiaria}</td>
                <td>{a.valorArrecadado}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>


    </div>
  )
}

export default App
