const express = require('express')
const app = express()
const uuid = require('uuid')
app.use(express.json())

const users = []

const userCheckId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ erro: "User Not Found" })
    }

    request.userId = id
    request.userIndex = index

    next()

}

app.get('/users', (request, response) => {   // Recebendo os Usuários
    return response.json(users)
})

app.post('/users', (request, response) => {  // Criação dos Usuários
    const { name, age } = request.body

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(users)
})

app.put('/users/:id', userCheckId, (request, response) => {  // Atualiza os dados dos Usuários

    const { name, age } = request.body
    const id = request.userId
    const index = request.userIndex

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.status(201).json(updateUser)
})

app.delete('/users/:id', userCheckId, (request, response) => {  // Deleta todo o usuário
    const index = request.userIndex

    users.splice(index, 1)

    return response.status(201).json()
})

app.listen(3000, () => {
    console.log("🍀 Servidor Iniciado na Port 3000")
})