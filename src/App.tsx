import './App.css'
import { Item } from './components/Item'
import { useSEO } from './hooks/useSEO'
import { useItems } from './hooks/useItems'

//On Typescrypt, you have to use interfaces
export interface Item {
  id: string,
  text: string
}

//importante considerar casos iniciales
// const INITIAL_ITEMS: Item[] = [
//   {
//     id: crypto.randomUUID(),
//     text: "Estudiar HTML"
//   },
//   {
//     id: crypto.randomUUID(),
//     text: "Estudiar CSS"
//   }
// ]

//protip: trata de reutilizar los estilos, ahorra tiempo y vete a saco por el HTML
function App() {
  //es buena practica utilizar valores iniciales en este tipo de entrevistas
  //ahorrandote errores trasnsitorios

  //si se desea usar vacios, es importante declarar el tipo de contenido del estado (en este caso, arreglo vacio de tipo Item)

  //custom hook para items
  const { items, addItem, deleteItem } = useItems()
  //custom hook to SEO
  useSEO({
    title: `[${items.length}]Prueba tecnica React`,
    description: "Para Juniors y Trainee"
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //elements te regresa los elementos del form (inputs)
    const { elements } = event.currentTarget
    const input = elements.namedItem('item')

    //asegurarse que es lo que es
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return

    //agregar usando custom hook
    addItem(input.value)

    //reiniciando valor
    input.value = ''
  }

  //regresando arreglo sin el elemento al que sea igual el id
  //se trata de una funcion que regresa una funcion = () => () => {}
  const createHandleDelete = (id: string) => () => {
    //eliminando item usando custom hook
    deleteItem(id)
  }

  return (
    <>
      <main>
        <aside>
          <h1>Test Trainee & JR</h1>
          <form aria-label='Add Elements Form' onSubmit={handleSubmit}>
            <label>
              Elemento a introducir:
              <input
                name='item'
                required
                type='text'
                placeholder='Estudiar React'
              />
            </label>
            <button>Agregar elemento a la lista</button>
          </form>
        </aside>
        <section>
          <h2>Lista de Elementos</h2>
          { //renderizado condicional
            items.length == 0 ? (
              <p>No hay elementos en la lista...</p>)
              : (
                <ul>{
                  items.map((item) => {
                    return (
                      <Item text={item.text} handleClick={createHandleDelete(item.id)} key={item.id} />
                    )
                  })}
                </ul>
              )
          }
        </section>
      </main>
    </>
  )
}

export default App
