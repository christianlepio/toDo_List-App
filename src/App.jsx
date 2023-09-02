import GroceryComponent from "./components/GroceryComponent"
import GroceryContextProvider from "./components/GroceryContextProvider"
import GroceryItemsComponent from "./components/GroceryItemsComponent"

function App() {

  return (
    <>
      <div className="container" style={{marginTop: '10vh',}}>
        <div className="row justify-content-center">
          <div className="col-10 shadow rounded p-3 border-top border-info border-5 mb-5">
            <h1 className='fs-1 text-center font-monospace'>ToDo-List App</h1>
            <GroceryContextProvider>
              <GroceryComponent />
              <GroceryItemsComponent />
            </GroceryContextProvider>  
          </div>
        </div>
      </div>    
    </>
  )
}

export default App
