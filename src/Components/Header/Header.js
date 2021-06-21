import React, { Component } from "react";
import Style from "./Header.module.css";
import Logo from "../../assesst/Images/Logo.svg";
import Cart from "../../assesst/Images/SoppingCart.svg";
import DownList from "../../assesst/Images/DownList.svg";
import { connect } from "react-redux";
import { Selected_Category } from "../../redux/Actions/Action";

class Header extends Component {
  // const Dispatch_categ = useDispatch();
  // const se = useSelector((state) => state.S_Product.Select_product);
  // const Check_category_list = () => {
  //   const arr = [];
  //   Categories.forEach((item) => {
  //     arr.push(item.category);
  //   });
  //   return helper_to_filterCategories(arr);
  // };

  render() {
    const Categories = ["tech", "clothes"];

    const show_index = async (Category, index) => {
      await this.props._Category(Category);

      window.location = "/";
    };
    // console.log("FAdya from header", this.props.Select_product[0].name);

    return (
      <header className={Style.Header}>
        <nav>
          <ul className={Style.Categories}>
            {Categories.map((Category, index) => {
              return (
                <li
                  id={index}
                  key={index}
                  onClick={() => show_index(Category, index)}
                >
                  {Category}
                </li>
              );
            })}
          </ul>
        </nav>
        <img src={Logo} alt="Logo" />
        <div className={Style.Tools}>
          <div onClick={this.props.opencurrncy} style={{ cursor: "pointer" }}>
            {"$"}
            <img src={DownList} alt="Down Arrow" />
          </div>
          <div onClick={this.props.openModal} className={Style.Logo}>
            <img src={Cart} alt="Shopping cart" />
            <span
              className={Style.ProductNptification}
              style={{
                display: this.props.Products.length > 0 ? "flex" : "none",
              }}
            >
              {this.props.Products.length}
            </span>
          </div>
        </div>
      </header>
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
    _Category: (index) => dispatch(Selected_Category(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
