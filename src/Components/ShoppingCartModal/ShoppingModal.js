import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Style from "./ShoppingModal.module.css";
import { Remove_Product } from "../../redux/Actions/Action";

class Shoppingmodal extends Component {
  state = {
    more_product: 1,
    aho: [],
  };
  render() {
    const DeleteProduct = (index) => {
      this.props.remove(index);
    };
    const Viewbag = () => {
      window.location = "/Cart";
    };
    const TotalPrice = () => {
      let Total_Price = 0;

      if (this.props.Products.length === 0) {
        return Total_Price;
      } else {
        this.props.Products.forEach((item) => {
          Total_Price += item.price * item.items;
        });
        return this.props.Products[0].curr + Total_Price;
      }
    };
    const More_Product = (index) => {
      this.props.Products[index].items++;

      document.getElementById(this.props.Products[index].id).innerHTML =
        this.props.Products[0].curr +
        this.props.Products[index].price * this.props.Products[index].items;
      document.getElementById(
        `items_${this.props.Products[index].id}`
      ).innerHTML = this.props.Products[index].items;

      document.getElementById("total").innerHTML = TotalPrice();
      console.log("Aho =>", this.props.Products);
    };
    const Less_Product = (index) => {
      // if (this.props.Products[index].items <= 1) return;
      this.props.Products[index].items--;

      document.getElementById(this.props.Products[index].id).innerHTML =
        this.props.Products[0].curr +
        this.props.Products[index].price * this.props.Products[index].items;
      document.getElementById(
        `items_${this.props.Products[index].id}`
      ).innerHTML = this.props.Products[index].items;
      document.getElementById("total").innerHTML = TotalPrice();

      console.log("Aho =>", this.props.Products);
      if (this.props.Products[index].items <= 0) {
        DeleteProduct(index);
      }
    };
    return (
      <Fragment>
        <div
          className={Style.ShoppingModal}
          style={{ display: !this.props.Modal ? "none" : null }}
        >
          <div style={{ display: " flex", alignItems: "center" }}>
            <h5>My Bag.</h5>
            <span>
              {this.props.Products.length > 0
                ? this.props.Products.length + "items"
                : "No items"}
            </span>
          </div>

          {this.props.Products.length > 0 ? (
            this.props.Products.map((products, index) => {
              return (
                <div key={index} className={Style.All_Products}>
                  <div className={Style.Products_behav}>
                    <div style={{ marginBottom: "10px" }}>{products.name}</div>
                    <div id={products.id} style={{ marginBottom: "10px" }}>
                      {products.curr}
                      {products.price}
                    </div>
                    <div id={index} className={Style.Size}>
                      {products.size}
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <button
                      style={{
                        width: "24px",
                        height: "24px",
                        border: "1px solid #1D1F22",
                        cursor: "pointer",
                      }}
                      onClick={() => More_Product(index)}
                    >
                      +
                    </button>
                    <h6 id={`items_${products.id}`}>{products.items}</h6>
                    <button
                      onClick={() => Less_Product(index)}
                      style={{
                        width: "24px",
                        height: "24px",
                        border: "1px solid #1D1F22",
                        cursor: "pointer",
                      }}
                    >
                      -
                    </button>
                  </div>
                  <img
                    style={{
                      width: "70px",
                      height: "100px",
                      marginBottom: "30px",
                    }}
                    src={products.gallery}
                    alt=""
                  />
                </div>
              );
            })
          ) : (
            <h1>No Products added!</h1>
          )}
          <div
            style={{
              display: this.props.Products.length > 0 ? "flex" : "none",
              flexDirection: "row",
              justifyContent: "space-around",
              marginBottom: "40px",
              marginTop: "20px",
            }}
          >
            <h4>Total</h4>
            <h4 id={`total`}>{TotalPrice()}</h4>
          </div>
          <div
            className={Style.Footer}
            style={{
              display: this.props.Products.length > 0 ? "flex" : "none",
            }}
          >
            <button
              style={{
                width: "90px",
                height: "43px",
                left: "0px",
                top: "0px",
                background: "#FFFFFF",
                border: "1px solid #1D1F22",
                boxSizing: "border-box",
                fontFamily: "Raleway",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
              }}
              onClick={Viewbag}
            >
              VIEW BAG
            </button>
            <button
              style={{
                cursor: "pointer",

                width: "90px",
                height: "43px",
                left: "0px",
                top: "0px",
                background: "#5ECE7B",
                border: "1px solid #1D1F22",
                boxSizing: "border-box",
                fontFamily: "Raleway",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "14px",
                color: "white",
              }}
            >
              CHECK OUT
            </button>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    Products: state.S_cart.ShoppingCart,
    _product: state.S_Product.Select_product,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    remove: (index) => dispatch(Remove_Product(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shoppingmodal);
