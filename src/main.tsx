import ReactDOM from "react-dom/client"
//import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./tookit/store"

//const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  //<QueryClientProvider client={queryClient}>
  <Provider store={store}>
    <App />
  </Provider>
  //</QueryClientProvider>
)
