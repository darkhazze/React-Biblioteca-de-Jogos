import { useState } from "react";

function App() {

  const [games, setGames] = useState(() => {
    const storedGames = localStorage.getItem("obc-game-lib")
    if (!storedGames) return []
    return JSON.parse(storedGames)
  })
  const [title, setTitle] = useState("")
  const [cover, setCover] = useState("")

  const addGames = ({ title, cover }) => {
    const id = Math.floor(Math.random() * 1000000)
    const game = { id, title, cover }
    setGames(state => {
      const newState = [...state, game]
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))
      return newState
    })
  }

  const removeGames = (id) => {
    setGames(state => {
      const newState = state.filter(game => game.id !== id)
      localStorage.setItem("obc-game-lib", JSON.stringify(newState))
      return newState
    })
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    addGames({title, cover})
    setTitle("")
    setCover("")
  }

  return (
    <div className="App">
     <h1> Biblioteca de Jogos </h1>

     <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Titulo do jogo</label>
        <input type="text" 
               name="title"
               id="title"
               placeholder="Insira o título do jogo"
               value={title}
               onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label htmlFor="cover">Capa do Jogo</label>
        <input type="text"
               name="cover"
               id="cover"
               value={cover}
               placeholder="Insira o link da imagem"
               onChange={(e) => setCover(e.target.value)}/>
      </div>
      <button type="submit">Adicionar à biblioteca</button>
     </form>
    <div className="games">
      {games.map((game) => (
        <div key={game.id}>
          <div className="game-cover"> 
            <img src={game.cover} alt=""/>
          </div>
          <div className="game-content">
            <h2>{game.title}</h2>
            <button onClick={() => removeGames(game.id)}>Remover</button>
          </div>
        </div>
      ))}

    </div>
    </div>
  );
}

export default App;
