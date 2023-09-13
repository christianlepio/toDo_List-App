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
          <div style={{marginTop: '3vh',}}>
            <div className="row justify-content-center">
              <div className="col-10 shadow rounded p-3 border-top border-info border-5 mb-5 todoBox">
                <h1 className='fs-1 text-center font-monospace'><i className="fs-2 bi bi-view-list"></i><i className="fs-2 bi bi-align-top"></i><i className="fs-5 bi bi-app"></i>D<i className="fs-2 bi bi-app-indicator"></i>-Lis<i className="fs-2 bi bi-align-top"></i></h1>
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
