import { useEffect, useState } from 'react'
import { Button, Form, Table, InputGroup } from 'react-bootstrap'
import api from './service/api'
import './Cliente.css'

function App() {
  const [clientes, setClientes] = useState([])

  const [clienteId, setClienteId] = useState('')
  const [cpf, setCpf] = useState('')

  useEffect(() => {
    getClientes()
  }, [])

  async function cadastrarCliente() {
    const client = {
      clienteId,
      cpf: parseInt()
    }

    await api
      .post('/cliente', client)
      .then((response)=>{
        setClientes([... clientes, response.data])
        })
      .catch(()=>{
          alert('error')
        }) 
    }

  async function getClientes() {
    await api.get('/cliente').then((response) => {
      setClientes(response.data)
    })
  }

  return (
    <div className="container">
      <Form className="Form">

          <Form.Label className='label mt-4'>Cadastrar Cliente</Form.Label>

        <InputGroup className="mb-1 mt-3" >
          <Form.Control
            type="text"
            placeholder="Nome"
            value={clienteId}
            onChange={(e) => {
              setClienteId(e.target.value)
            }}
          />
        </InputGroup>

        <InputGroup className="mb-2">
          <Form.Control 
            type="number"
            placeholder="CPF"
            value={cpf}
            onChange={(e) => {
              setCpf(e.target.value)
            }}
          />
        </InputGroup>

        <Button variant="dark" className='button-cadastrar' onClick={cadastrarCliente}>
        Salvar
      </Button>
      </Form>


      <Table striped bordered hover>
        <thead>
          <tr className='tr'>
            <th>Cliente</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((a) => {
            console.log(a)
            return (
              <tr>
                <td className='td'>{a.nome}</td>
                <td className='td'>{a.cpf}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </div>
  )
}

export default App
