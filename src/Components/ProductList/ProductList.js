import { useQuery } from "@apollo/client";
import { Tech_category } from "../../GraphQl/queries";
import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Shopping_cart from "../../assesst/Images/ShoppingIcon.svg";
import { gql } from "@apollo/client";
import Style from "./Products.module.css";
import { Selected_Product } from "../../redux/Actions/Action";
import { connect } from "react-redux";

const ProductList = ({ Modal }) => {
  const Category = useSelector((state) => state.Categ.Category);
  const Currency = useSelector((state) => state.CURRENCY.currency);

  const [State, setState] = useState([""]);
  const dispatch_selected_product = useDispatch();
  // const SSS_product = useSelector((state) => state.S_Product.Select_product);
  const Load_Products = () => {
    if (Category === "") return Tech_category;
    else {
      return gql`
        query {
          category(input: { title: "${Category}" }) {
            products {
              name
              category
              gallery
              inStock
              description

              prices{
                currency
                amount
                
              }
              attributes{
                items{
                  value
                
                  
                }
              }
              
            }
          }
        }
      `;
    }
  };
  const { data, loading } = useQuery(Load_Products());

  const add_shoppingCart_icon_toProduct = (index) => {
    var elem = document.createElement("img");
    elem.setAttribute("src", `${Shopping_cart}`);
    elem.setAttribute("width", "83px");
    elem.setAttribute("style", "position: absolute;right: 50px;bottom: 46px;");
    elem.setAttribute("alt", "shooping_cart");
    document.getElementById(index).appendChild(elem);
  };
  const design_selected_product = (index) => {
    document.getElementById(index).style.display = "flex";
    document.getElementById(index).style.flexDirection = "column";
    document.getElementById(index).style.alignItems = "center";
    document.getElementById(index).style.boxSizing = "border-box";
    document.getElementById(index).style.padding = "40px";
    document.getElementById(index).style.border = "3px solid white";
    document.getElementById(index).style.boxShadow =
      "5px 5px 5px 5px gainsboro";
    add_shoppingCart_icon_toProduct(index);
  };
  // console.log("CCCDCWCCDCd", this.props.Currency);
  const check_product_exist = (index) => {
    let already_in_cart = false;
    State.forEach((item) => {
      if (item === data.category.products[index].name) {
        alert("already_in_cart");
        already_in_cart = true;
      }
    });
    if (!already_in_cart) {
      setState([...State, data.category.products[index].name]);
      dispatch_selected_product(
        Selected_Product(data.category.products[index])
      );
    }
  };
  const chose_product = async (index) => {
    design_selected_product(index);
    await check_product_exist(index);

    window.location = "/products";
  };

  return (
    <Fragment>
      <div
        style={{
          fontFamily: "Raleway",
          fontStyle: "normal",
          fontWeight: "normal",
          fontSize: "42px",
          lineHeight: "160%",
          marginLeft: "50px",

          display: "flex",
          alignItems: "center",

          /* --c-text */

          color: "#1D1F22",
        }}
      >
        Category Name
      </div>

      <div
        id="DDD"
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: "100px",
          backgroundColor: Modal ? "#393748 " : "white",
          opacity: Modal ? "0.4" : "1",
        }}
      >
        {!loading
          ? data.category.products.map((product, index) => {
              console.log(index);
              return (
                <div
                  value={product}
                  id={index}
                  onClick={() => chose_product(index)}
                  className={
                    product.inStock ? Style.Product_div : Style.notAllowed
                  }
                  key={index}
                  style={{
                    width: "449px",
                    textAlign: "left",
                    opacity: product.inStock && !Modal ? "1" : "0.5",

                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    boxSizing: "border-box",
                    padding: "40px",
                    marginTop: "40px",
                  }}
                >
                  <div>
                    <img
                      className={Style.Products_Images}
                      src={product.gallery[0]}
                      alt="Product_image"
                    />
                    <h4
                      style={{
                        fontFamily: "Raleway",
                        fontStyle: "normal",
                        fontWeight: "300",
                        fontSize: "18px",
                      }}
                    >
                      {product.name}
                    </h4>

                    <h6
                      style={{
                        fontFamily: "Raleway",
                        fontStyle: "normal",
                        fontWeight: "500",
                        fontSize: "18px",
                      }}
                    >
                      {product.prices[Currency].currency}
                      {product.prices[Currency].amount}
                    </h6>
                    <img
                      className={Style.ShoppingCart}
                      src={Shopping_cart}
                      alt=""
                    />
                    <span
                      className={
                        product.inStock ? Style.InStock : Style.OutStock
                      }
                    >
                      OUT OF STOCK
                    </span>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </Fragment>
  );
};
// const mapStateToProps = (state) => {
//   return {
//     Currency: state.CURRENCY.currency,
//   };
// };
export default ProductList;
