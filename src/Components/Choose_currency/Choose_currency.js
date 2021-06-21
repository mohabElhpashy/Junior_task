import React, { Component, Fragment } from "react";
import Style from "./Choose_currency.module.css";
import { connect } from "react-redux";
import { Choose_currency } from "../../redux/Actions/Action";

const currency = ["USD", "GBP", "AUD", "JPY", "RUB"];
class Currency extends Component {
  render() {
    const ChooseCURRENCY = (index) => {
      this.props.Choose_C(index);
    };
    return (
      <Fragment>
        <div
          onClick={this.props.opencurrncy}
          style={{ display: this.props.chooseCurrency ? "flex" : "none" }}
          className={Style.Main}
        >
          {currency.map((currency, index) => {
            return (
              <div
                onClick={() => ChooseCURRENCY(index)}
                style={{ cursor: "pointer" }}
                key={index}
              >
                {currency}
              </div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    Choose_C: (index) => dispatch(Choose_currency(index)),
  };
};
export default connect(null, mapDispatchToProps)(Currency);
