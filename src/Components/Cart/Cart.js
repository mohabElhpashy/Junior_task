import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Style from "./Cart.module.css";
import { Remove_Product } from "../../redux/Actions/Action";

class Cart extends Component {
  state = {
    more_product: 1,
    aho: [],
  };
  render() {
    const More_Product = (index) => {
      this.props.Products[index].items++;

      document.getElementById(this.props.Products[index].id).innerHTML =
        this.props.Products[index].price * this.props.Products[index].items;
      document.getElementById(
        `items_${this.props.Products[index].id}`
      ).innerHTML = this.props.Products[index].items;
    };
    const Less_Product = (index) => {
      if (this.props.Products[index].items <= 1) return;
      this.props.Products[index].items--;

      document.getElementById(this.props.Products[index].id).innerHTML =
        this.props.Products[index].price * this.props.Products[index].items;
      document.getElementById(
        `items_${this.props.Products[index].id}`
      ).innerHTML = this.props.Products[index].items;
    };
    return (
      <Fragment>
        <div
          style={{
            opacity: this.props.Modal ? "0.3" : "1",
          }}
          className={Style.Cart}
        >
          <div
            style={{
              fontFamily: "Raleway",
              fontStyle: "normal",
              fontWeight: "bold",
              fontSize: "32px",
              lineHeight: "40px",
              marginLeft: "237px",

              texTtransform: "uppercase",

              color: "#1D1F22",
              marginBottom: "40px",
            }}
          >
            Cart
          </div>
          <div>
            {this.props.Products.length === 0 ? (
              <h1 style={{ textAlign: "center" }}>No PRoduct Added</h1>
            ) : (
              this.props.Products.map((products, index) => {
                return (
                  <div key={index} className={Style.All_Products}>
                    <div className={Style.Products_behav}>
                      <div
                        style={{
                          marginBottom: "10px",
                          fontFamily: "Raleway",
                          fontStyle: "normal",
                          fontWeight: "600",
                          fontSize: "30px",
                          lineHeight: "27px",
                          /* identical to box height, or 90% */

                          display: "flex",
                          alignItems: "center",

                          color: "#1D1F22",
                        }}
                      >
                        {products.name}
                      </div>
                      <div
                        className={Style.price}
                        id={products.id}
                        style={{ marginBottom: "10px" }}
                      >
                        {products.curr}
                        {products.price}{" "}
                      </div>
                      <div id={index} className={Style.Size}>
                        {products.size}
                      </div>
                    </div>
                    <div></div>
                    <div className={Style.img_Buttons}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-around",
                          textAlign: "center",
                        }}
                      >
                        <button
                          style={{
                            width: "31px",
                            height: "24px",
                            border: "1px solid gray",
                            color: "gray",
                          }}
                          onClick={() => More_Product(index)}
                        >
                          +
                        </button>
                        <h6 id={`items_${products.id}`}>{products.items}</h6>
                        <button
                          onClick={() => Less_Product(index)}
                          style={{
                            width: "31px",
                            height: "24px",
                            border: "1px solid gray",
                            color: "gray",
                          }}
                        >
                          -
                        </button>
                      </div>
                      <img
                        style={{
                          width: "141px",
                          height: "175px",
                          marginBottom: "30px",
                        }}
                        src={products.gallery}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Products: state.S_cart.ShoppingCart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(Remove_Product(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
