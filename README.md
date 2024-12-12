# Projeto Restaurante Rendezvous Gourmet

Este é um projeto para o site de um restaurante chamado "Rendezvous Gourmet". O projeto é composto por uma interface web utilizando HTML, CSS e Bootstrap para exibição do cardápio e funcionalidades de pedidos, reservas e delivery. Além disso, foi implementado um backend em Node.js com Express para gerenciar o cadastro de usuários, login e reservas de clientes, utilizando um banco de dados MySQL.

## Funcionalidades

### Frontend
- **Navegação**: Barra de navegação com links para as principais seções do site (Home, Cardápio, Reservas, Delivery, Sobre, Contato, Login).
- **Cardápio**: Exibição de pratos promocionais utilizando cards com imagens e nomes dos pratos.
- **Reserva Online**: Funcionalidade para realizar reservas diretamente no site.
- **Delivery**: Opção para pedir pratos no conforto de casa.

### Backend (Node.js com Express)
- **Cadastro de Usuários**: Rota para cadastro de novos usuários com criptografia de senha usando bcrypt.
- **Login de Usuários**: Rota para realizar login com validação de e-mail e senha.
- **Gestão de Reservas**: Rota para o cliente fazer a reserva com informações como nome, email, telefone, cidade, número de pessoas e data de check-in.
- **Consulta de Reservas e Usuários**: Exibição de todos os usuários e reservas cadastrados no banco de dados MySQL.

## Requisitos

### Frontend
- **HTML/CSS**: Estrutura e estilo da página, incluindo layout responsivo.
- **Bootstrap 5**: Framework CSS para o design responsivo.
- **Imagens**: Utilização de imagens externas para ilustrar os pratos e o restaurante.

### Backend
- **Node.js**: Ambiente de execução JavaScript.
- **Express**: Framework para construção da API.
- **MySQL**: Banco de dados utilizado para armazenar informações de usuários e reservas.
- **bcryptjs**: Biblioteca para criptografar senhas dos usuários.
- **CORS**: Middleware para permitir requisições de diferentes origens.

## Como Rodar o Projeto

### Frontend

 Clone o repositório:
   ```bash
   git clone https://github.com/LuisMoura18/proj_site_api_restaurante.git
   ```
   
## Desenvolvido por: 

Luis Andre Moura,
Leandro Roriz Fidalgo.

Orientador Hudson Neves https://github.com/HudsonNeves
