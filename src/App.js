import React, { Component, Fragment } from "react";
import Header from "./Components/Header/Header";
import Tech from "./Components/ProductList/ProductList";
import ShoppingModal from "./Components/ShoppingCartModal/ShoppingModal";
import Cart from "./Components/Cart/Cart";
import Currency from "./Components/Choose_currency/Choose_currency";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import ProductDetails from "./Components/DetailProductPage/ProductsDetails";
import { BrowserRouter, Route } from "react-router-dom";
const errorLinke = onError(({ grphqlError }) => {
  if (grphqlError) {
    console.log("erre");
  }
});
const link = from([
  errorLinke,
  new HttpLink({ uri: "http://localhost:4000/" }),
]);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});
class App extends Component {
  state = {
    IsModalOpen: false,
    ChooseCurrency: false,
  };
  render() {
    const open_cartModal = () => {
      this.setState({ IsModalOpen: !this.state.IsModalOpen });
    };
    const open_currency = () => {
      this.setState({ ChooseCurrency: !this.state.ChooseCurrency });
    };

    return (
      <Fragment>
        <BrowserRouter>
          <div style={{ position: "relative" }}>
            <ApolloProvider client={client}>
              <Header openModal={open_cartModal} opencurrncy={open_currency} />

              <Route
                exact
                path="/"
                render={(props) => (
                  <Tech Modal={this.state.IsModalOpen} {...props} />
                )}
              />

              <Route
                exact
                path="/products"
                render={(props) => (
                  <ProductDetails Modal={this.state.IsModalOpen} {...props} />
                )}
              />
              <Route
                exact
                path="/Cart"
                render={(props) => (
                  <Cart Modal={this.state.IsModalOpen} {...props} />
                )}
              />
            </ApolloProvider>
            <ShoppingModal Modal={this.state.IsModalOpen} />
            <Currency chooseCurrency={this.state.ChooseCurrency} />
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}
export default App;
