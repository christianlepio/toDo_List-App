import GroceryComponent from "./components/GroceryComponent"
import GroceryContextProvider from "./components/GroceryContextProvider"
import GroceryItemsComponent from "./components/GroceryItemsComponent"
import ToggleTheme from "./components/ToggleTheme";

function App() {
  return (
    <>
      <div className="container">
        <GroceryContextProvider>
          <ToggleTheme />
          <div style={{marginTop: '8vh',}}>
            <div className="row justify-content-center">
              <div className="col-10 shadow rounded p-3 border-top border-info border-5 mb-5 todoBox">
                <h1 className='fs-1 text-center font-monospace'>ToDo-List</h1>
                  <GroceryComponent />
                  <GroceryItemsComponent />
              </div>
            </div>
          </div>
        </GroceryContextProvider>                
      </div>  
    </>
  )
}

export default App
