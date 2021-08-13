import { BrowserRouter, Switch, Route } from "react-router-dom";
import HomePage from "../../pages/Home.page";
import "./App.styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
