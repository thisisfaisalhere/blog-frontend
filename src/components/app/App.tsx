import { BrowserRouter, Switch, Route } from "react-router-dom";
import BlogDetailPage from "../../pages/BlogDetail.page";
import HomePage from "../../pages/Home.page";
import LoginPage from "../../pages/Login.page";
import FooterComponent from "../Footer/FooterComponent";
import Navbar from "../Navbar/Navbar.component";
import "./App.styles.scss";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/blog/:slug" component={BlogDetailPage} />
        <Route exact path="/login" component={LoginPage} />
      </Switch>
      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
