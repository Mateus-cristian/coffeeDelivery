import {
  createAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from "@reduxjs/toolkit";
import store, { IRootState } from "..";
import { api } from "../../services/api";
import { CoffeeProps, FormCartCheckout } from "../../types/@types";

const PREFIX = "app/coffee";

const initialState: coffes = {
  coffes: [],
  coffeCart: [],
  totalItens: 0,
  priceTotal: 0,
  address: {} as FormCartCheckout,
};

interface coffes {
  coffes: CoffeeProps[];
  coffeCart: CoffeeProps[];
  totalItens: number;
  priceTotal: number;
  address: {};
}

export const fetchCoffes = createAsyncThunk("coffes/fetchCoffes", async () => {
  const response = await api.get("/cafes");
  return response.data;
});

export const incrementItensToRedux = createAction<coffes>(
  `${PREFIX}/incrementQuantityProduct`
);

export const incrementQuantityProduct = createAction<CoffeeProps>(
  `${PREFIX}/incrementQuantityProduct`
);
export const decrementQuantityProduct = createAction<CoffeeProps>(
  `${PREFIX}/decrementQuantityProduct`
);

export const incrementQuantityProductInTheCartCheckout =
  createAction<CoffeeProps>(`${PREFIX}/incrementQuantityProductCartCheckout`);

export const decrementQuantityProductInTheCartCheckout =
  createAction<CoffeeProps>(`${PREFIX}/decrementQuantityProductInCartCheckout`);

export const incrementProductToCart = createAction<CoffeeProps>(
  `${PREFIX}/incrementProductToCart`
);

export const deleteProductToCart = createAction<CoffeeProps>(
  `${PREFIX}/deleteProductToCartCheckout`
);

export const deliveryAddress = createAction<FormCartCheckout>(
  `${PREFIX}/deliveryAddress`
);

export const clearCart = createAction(`${PREFIX}/clearCart`);

const slice = createSlice({
  name: PREFIX,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCoffes.fulfilled, (state, action) => {
      state.coffes = action.payload;
    });

    builder.addCase(deliveryAddress, (state, { payload }) => {
      //Adiciona o endereço e apaga os itens do carrinho
      state.address = payload;
      state.coffeCart = [];
      state.coffes = [];
    });

    // Acrescenta o produto ao carrinho
    builder.addCase(incrementProductToCart, ({ coffeCart }, { payload }) => {
      // Faz a busca se existe o produto no carrinho

      const ifExistItemInCartCheckout = coffeCart.find(
        (item: CoffeeProps) => item.id === payload.id
      );

      // Se não existir adiciona ao mesmo
      if (!ifExistItemInCartCheckout && payload.quantity > 0) {
        coffeCart.push(payload);
      }
    });

    // Aumenta a quantidade do produto na página home
    builder.addCase(incrementQuantityProduct, ({ coffes }, { payload }) => {
      const incrementQuantity = coffes.find(
        (item: CoffeeProps) => item.id === payload.id
      );
      if (incrementQuantity) {
        incrementQuantity.quantity += 1;
      }
      return;
    });

    // Diminue a quantidade do produto na página home
    builder.addCase(decrementQuantityProduct, (state, { payload }) => {
      // Verifica se a quantia se é 0 pois se for retira o produto do carinho
      if (payload.quantity < 1) {
        state.coffeCart = state.coffeCart.filter(
          (item) => item.id !== payload.id
        );
        return;
      }

      const decrementQuantity = state.coffes.find(
        (item: CoffeeProps) => item.id === payload.id
      );

      // Verifica a quantia se é maior que 0 pois não pode haver quantidade negativa no carrinho
      if (decrementQuantity && decrementQuantity.quantity > 0) {
        decrementQuantity.quantity -= 1;
      }
      return;
    });

    // Aumenta a quantidade do produto na página de checkout
    builder.addCase(
      incrementQuantityProductInTheCartCheckout,
      ({ coffeCart }, { payload }) => {
        const incrementQuantity = coffeCart.find(
          (item: CoffeeProps) => item.id === payload.id
        );
        if (incrementQuantity) {
          incrementQuantity.quantity += 1;
        }
        return;
      }
    );

    // Diminue a quantidade do produto na página de checkout
    builder.addCase(
      decrementQuantityProductInTheCartCheckout,
      (state, { payload }) => {
        // Verifica se a quantia é 0 pois se for retira o produto do carrinho
        if (payload.quantity < 1) {
          state.coffeCart = state.coffeCart.filter(
            (item) => item.id !== payload.id
          );
          return;
        }

        const decrementQuantity = state.coffeCart.find(
          (item: CoffeeProps) => item.id === payload.id
        );

        // Verifica a quantia se é maior que 0 pois não pode haver quantidade negativa no carrinho
        if (decrementQuantity && decrementQuantity.quantity > 0) {
          decrementQuantity.quantity -= 1;
        }
        return;
      }
    );

    // Deleta um produto do carrinho
    builder.addCase(deleteProductToCart, (state, { payload }) => {
      state.coffeCart = state.coffeCart.filter(
        (item) => item.id !== payload.id
      );
    });

    // Limpa o carrinho após a compra
    builder.addCase(clearCart, (state, { payload }) => {
      state.coffeCart = [];
      state.address = {};
      state.priceTotal = 0;
      state.totalItens = 0;
    });

    builder.addMatcher(
      isAnyOf(
        deleteProductToCart,
        decrementQuantityProductInTheCartCheckout,
        incrementQuantityProductInTheCartCheckout,
        incrementProductToCart
      ),
      (state, _) => {
        // Soma de todos os preços dos cafés do carrinho
        const CartPriceTotalProducts = state.coffeCart.reduce((count, item) => {
          return (count += item.amount);
        }, 0);

        state.totalItens = CartPriceTotalProducts;

        // faz o preço dos produtos mais o frete
        const PriceTotal = CartPriceTotalProducts + 11.9;
        state.priceTotal = PriceTotal;

        // Faz o calculo da quantidade de produtos que se tem
        state.coffeCart.forEach((item: CoffeeProps) => {
          item.amount = item.price * item.quantity;
        });
      }
    );
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default slice.reducer;
