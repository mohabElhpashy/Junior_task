import { ActionsType } from "../Types/Type";
const InitialState = {
  products: [],
  Category: "",
  Select_product: [],
  ShoppingCart: [],
  currency: 0,
};

export const Reducer = (state = InitialState, action) => {
  switch (action.type) {
    case ActionsType.Set_Products:
      return { ...state, products: action.payload };

    default:
      return state;
  }
};
export const Reducer_Selected = (state = InitialState, action) => {
  switch (action.type) {
    case ActionsType.Selected_Category:
      return { Category: action.payload };

    default:
      return state;
  }
};
export const Reducer_Selected_Product = (state = InitialState, action) => {
  switch (action.type) {
    case ActionsType.Selecte_Product:
      return {
        ...state,
        Select_product: [action.payload],
      };

    default:
      return state;
  }
};

export const Reducer_Add_To_Shopping_Cart = (state = InitialState, action) => {
  switch (action.type) {
    case ActionsType.AddToShoppingCart:
      return {
        ...state,
        ShoppingCart: [...state.ShoppingCart, action.payload],
      };
    case ActionsType.RemoveToShoppingCart:
      return {
        ...state,
        ShoppingCart: state.ShoppingCart.filter(
          (item, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const Reducer_Currency = (state = InitialState, action) => {
  switch (action.type) {
    case ActionsType.Choose_Currency:
      return { currency: action.payload };

    default:
      return state;
  }
};
// export const Reducer_Remove_Shoppingcart = (state = InitialState, action) => {
//   switch (action.type) {
//     case ActionsType.RemoveToShoppingCart:
//       return {
//         ...state,
//         ShoppingCart: state.ShoppingCart.filter(
//           (item, index) => index !== action.payload
//         ),
//       };

//     default:
//       return state;
//   }
// };
