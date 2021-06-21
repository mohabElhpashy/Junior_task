import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Style from "./ProductsDetails.module.css";
import { AddToCart } from "../../redux/Actions/Action";

class ProductDetails extends Component {
  state = {
    product_detail: [],
    Product_Size: [],
  };
  render() {
    const SelectSize = async (index) => {
      await this.setState({
        Product_Size: index,
      });
      document.getElementById(index).style.color = "white";
      document.getElementById(index).style.backgroundColor = "black";
    };
    const Allreadya_Product_Added = () => {
      let already_in_cart = false;

      this.props._dd.forEach((item) => {
        if (item.name === this.state.product_detail.name) {
          alert("already added");
          already_in_cart = true;
        }
      });
      if (!already_in_cart) {
        this.props.AddToCartModal(this.state.product_detail);
      }
    };
    const Check_Product_exist_InShoppingCart = async () => {
      if (
        this.props._product[0].attributes.length > 0 &&
        this.state.Product_Size.length === 0
      ) {
        alert("You have to choose Size ");
      } else {
        if (this.props._product[0].attributes.length === 0) {
          // const id =
          await this.setState({
            product_detail: {
              id: Math.floor(Math.random() * 10000).toString(),
              name: this.props._product[0].name,
              price: this.props._product[0].prices[this.props._Currency].amount,
              curr: this.props._product[0].prices[this.props._Currency]
                .currency,
              gallery: this.props._product[0].gallery[0],
              items: 1,
            },
          });
        } else {
          await this.setState({
            product_detail: {
              id: Math.floor(Math.random() * 10000).toString(),
              name: this.props._product[0].name,
              price: this.props._product[0].prices[this.props._Currency].amount,
              curr: this.props._product[0].prices[this.props._Currency]
                .currency,
              gallery: this.props._product[0].gallery[0],
              size: this.props._product[0].attributes[0].items[
                this.state.Product_Size
              ].value,
              items: 1,
            },
          });
        }

        Allreadya_Product_Added();
      }
    };
    const AddToCart = async () => {
      Check_Product_exist_InShoppingCart();
    };
    return (
      <Fragment>
        <div
          className={Style.ProductDetails}
          style={{
            opacity: this.props.Modal ? "0.3" : "1",
          }}
        >
          <div className={Style.SmallImages}>
            {this.props._product[0].gallery.map((SImages, index) => {
              return (
                <img
                  key={index}
                  style={{
                    width: "176.65px",
                    height: "87.61px",
                  }}
                  src={SImages}
                  alt=""
                />
              );
            })}
          </div>
          <div className={Style.MainImage}>
            <img
              style={{
                width: "470px",
                height: "400px",
                border: "1px solid gainspro",
              }}
              src={this.props._product[0].gallery[0]}
              alt="mainimage"
            />
          </div>

          <div className={Style.Details}>
            <div
              style={{
                fontFamily: "Raleway",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "30px",
                lineHeight: "27px",
              }}
            >
              {this.props._product[0].name}
            </div>
            <div
              id="size"
              style={{
                width: "38px",
                height: " 18px",
                left: "929px",
                top: "273px",
                display:
                  this.props._product[0].attributes.length === 0
                    ? "none"
                    : "block",
                fontFamily: "Roboto Condensed",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "px",
                lineHeight: "18px",
              }}
            >
              SIZE:
            </div>
            <div>
              {this.props._product[0].attributes.length === 0
                ? ""
                : this.props._product[0].attributes[0].items.map(
                    (Sizes, index) => {
                      return (
                        <button
                          id={index}
                          onClick={() => SelectSize(index)}
                          key={index}
                          className={Style.Sizes}
                        >
                          {Sizes.value}
                        </button>
                      );
                    }
                  )}
            </div>

            <div
              style={{
                width: "50px",
                height: " 18px",
                left: "929px",
                top: "384px",

                fontFamily: "Roboto Condensed",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "18px",
                lineHeight: "18px",
              }}
            >
              PRICE:
            </div>
            <div
              style={{
                width: "86px",
                height: " 46px",

                fontFamily: "Raleway",
                fontStyle: "normal",
                fontWeight: "bold",
                fontSize: "15px",
                lineHeight: "18px",
              }}
            >
              {this.props._product[0].prices[this.props._Currency].currency}
              {this.props._product[0].prices[this.props._Currency].amount}
            </div>
            <button
              style={{
                width: "292px",
                height: " 52px",
                background: "#5ECE7B",
                color: "white",
                fontFamily: "Raleway",
                fontStyle: "normal",
                fontWeight: "600",
                fontSize: "16px",
              }}
              onClick={AddToCart}
            >
              ADD TO CART
            </button>
            <div>{this.props._product[0].description}</div>
          </div>
        </div>
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    _product: state.S_Product.Select_product,
    _dd: state.S_cart.ShoppingCart,
    _Currency: state.CURRENCY.currency,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    AddToCartModal: (product) => dispatch(AddToCart(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
