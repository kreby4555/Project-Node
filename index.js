const express = require('express')
const app = express()
const uuid = require('uuid')
app.use(express.json())

const users = []

app.get('/users', (request, response) => {   // Recebendo os Usuários
    return response.json(users)
})

app.post('/users', (request, response) => {  // Criação dos Usuários
    const {name, age} = request.body

    const user = {id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', (request, response) => {  // Atualiza os dados dos Usuários
    const {id} = request.params
    const {name, age} = request.body

    const updateUser = {id, name, age}

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "User Not Found"})
    }

    users[index] = updateUser

    return response.status(201).json(updateUser)
})

app.delete('/users/:id', (request, response) => {  // Deleta todo o usuário
    const {id} = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({message: "User Not Found"})
    }

    users.splice(index,1)

    return response.status(201).json()
})

app.listen(3000, () => {
    console.log("🍀 Servidor Iniciado na Port 3000")
})