import React from 'react';
export const AppContext = React.createContext({});

export class AppContextProvider extends React.Component {
  state = {
    cart_items: [],
    user_id: 'wernancheta',
    user_name: 'Wern Ancheta',
    user_type: 'customer',
    room_id: '',
    room_name: '',
    shipping_details: {
      name: '',
      country: '',
      city: '',
      phone: '',
      preferredDeliveryDateTime: new Date(),
    },
  };

  constructor(props) {
    super(props);
  }

  setRoom = (id, name) => {
    this.setState({
      room_id: id,
      room_name: name,
    });
  };

  setShippingDetails = (item, f) => {
    console.log(item);
    this.setState({shipping_details: item});
    f();
  };

  addToCart = (item, qty) => {
    let found = this.state.cart_items.filter(el => el.id === item.id);
    if (found.length === 0) {
      this.setState(prevState => {
        return {cart_items: prevState.cart_items.concat({...item, qty})};
      });
    } else {
      this.setState(prevState => {
        const other_items = prevState.cart_items.filter(
          el => el.id !== item.id,
        );
        return {
          cart_items: [...other_items, {...found[0], qty: found[0].qty + qty}],
        };
      });
    }
  };

  removeCartItem = (item, qty) => {
    let found = this.state.cart_items.findIndex(el => el.id === item.id);
    console.log(found, found > -1);
    if (found > -1) {
      this.setState(prevState => {
        return {
          cart_items: prevState.cart_items.filter(el => el.id !== item.id),
        };
      });
    } else {
      console.log('not found');
    }
  };

  clearCart = () => {
    this.setState({
      cart_items: [],
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          addToCart: this.addToCart,
          setRoom: this.setRoom,
          removeCartItem: this.removeCartItem,
          setShippingDetails: this.setShippingDetails,
          clearCart: this.clearCart,
        }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
//

/*
export const WithAppContextProvider = ChildComponent => props => (
  <AppContextProvider>
    <ChildComponent {...props} />
  </AppContextProvider>
);*/
