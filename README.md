# Mario Jump - 🎮

**Um jogo estilo "Mario Jump" desenvolvido em **``React (Vite)``** para o frontend e **``FastAPI``** para o backend, com persistência de pontuações em banco de dados.  
O projeto é totalmente containerizado com **``Docker Compose``**, permitindo rodar facilmente em qualquer ambiente.**

---

## Tecnologias utilizadas
- **Frontend:** React + Vite + SCSS
- **Backend:** FastAPI (Python)
- **Banco de dados:** SQLite (pode ser adaptado para MySQL/PostgreSQL)
- **Containerização:** Docker + Docker Compose
- **Servidor web:** Nginx para servir o frontend

---

## Estrutura do projeto 📂
**mariojump/**

**frontend/ # Código do jogo (React/Vite)**

**backend/ # API de pontuações (FastAPI)**

**docker-compose.yml**

**README.md**


---

## ⚙️ Como rodar o projeto ⚙️

### Pré-requisitos
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)

### Passos
1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/mariojump.git
   cd mariojump
### Suba os containers:
``**docker compose up --build**``

### Acesse no navegador:

``Frontend (jogo): http://localhost:3000``

``Backend (API): http://localhost:8000/docs``

## Funcionalidades
Mario pula com teclado (barra de espaço) ou toque na tela (mobile).

Score e nível aumentam conforme o tempo.

Colisão com o tubo encerra o jogo.

Ao perder, o jogador pode salvar seu nome e pontuação via API.

Responsividade para desktop, tablet e celular.

## Endpoints principais (Backend)

``POST /api/score → salva pontuação do jogador.``

``GET /api/score → lista pontuações registradas.``

## Desenvolvimento

**Se quiser rodar apenas o frontend em modo dev (com hot reload):**

``cd frontend``

``npm install``

``npm run dev``

**Se quiser rodar apenas o backend:**

``cd backend``

``pip install -r requirements.txt``

``uvicorn main:app --reload``

## Contribuição
Faça um fork do projeto

Crie uma branch para sua feature (git checkout -b minha-feature)

Commit suas mudanças (git commit -m 'feat: minha feature')

Faça push para a branch (git push origin minha-feature)

Abra um Pull Request

## Licença 📜
**``Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e compartilhar.``**
