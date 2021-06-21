import { ActionsType } from "../Types/Type";

export const setProducts = (products) => {
  return {
    type: ActionsType.Set_Products,
    payload: products,
  };
};

export const Selected_Category = (Category) => {
  return {
    type: ActionsType.Selected_Category,
    payload: Category,
  };
};
export const Selected_Product = (Selected_Product) => {
  return {
    type: ActionsType.Selecte_Product,
    payload: Selected_Product,
  };
};

export const AddToCart = (Shoppingcart) => {
  return {
    type: ActionsType.AddToShoppingCart,
    payload: Shoppingcart,
  };
};
export const Remove_Product = (index) => {
  return {
    type: ActionsType.RemoveToShoppingCart,
    payload: index,
  };
};
export const Choose_currency = (index) => {
  return {
    type: ActionsType.Choose_Currency,
    payload: index,
  };
};
