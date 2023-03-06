import { useEffect, useState } from 'react'
import { Button, Form, InputGroup, Table } from 'react-bootstrap'
import api from './service/api'
import "./Livro.css"

function App() {

  const [clientes, setClientes] = useState([])

  const [nome, setNome] = useState("")
  const [valorDiaria, setValorDiaria] = useState("")
  const [isAlugado, setIsAlugado] = useState("")

  async function cadastrarLivro() {
    console.log({ nome: nome, valorDiaria: valorDiaria, isAlugado: isAlugado })
    await api
      .post('/livro', {
        nome: parseInt(nome),
        valorDiaria: parseInt(valorDiaria),
        isAlugado: Boolean(isAlugado)
      })
      .then((response) => {
        setLivros(response)
        getLivros()
      })
  }
  const [livros, setLivros] = useState([])
  async function getLivros() {
    await api.get('/livro').then((response) => {
      setLivros(response.data)
    })
  }

  const [aluguels, setAluguels] = useState([])
  async function getAluguels() {
    await api
      .get('/livro')
      .then((response) => {
        setAluguels(response.data)
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



  return (
    <div className="container">
      <Form className="Form mt-3">
          <h2>Cadastrar um novo livro</h2>

          <InputGroup className="mb-2">
          <Form.Control 
            placeholder="Nome do Livro"
            value={nome}
            onChange={(e) => {
                setNome(e.target.value)
            }}
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control 
            placeholder="Valor Diária"
            value={valorDiaria}
            onChange={(e) => {
                setValorDiaria(e.target.value)
            }}
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control 
            placeholder="Está alugado?"
            value={isAlugado}
            onChange={(e) => {
                setIsAlugado(e.target.value)
            }}
          />
        </InputGroup>

          <Button 
            variant="dark"
            className="button-salvar"
            onClick={cadastrarLivro}>
            Salvar
          </Button>

      </Form> 

      <Table striped bordered hover className="Table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Livro</th>
            <th>Valor Diária</th>
            <th>Está alugado?</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((a) => {
            console.log(a)
            return (
                <tr>
                  <td>{a.id}</td>
                  <td>{a.nome}</td>
                  <td>{a.valorDiaria}</td>
                  <td>{a.isAlugado.toString()}</td>
                </tr>
              )
          })}
        </tbody>
      </Table>


    </div>
  )
}

export default App
