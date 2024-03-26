import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};
export const cartSlice = createSlice({
    name:'cart',
    initialState:{   listSP: JSON.parse(localStorage.getItem('cart')) || [], }, // cấu trúc trúc listsp sẽ như yêu cầu ở trên
    reducers:{
       themSP: (state, action) => {
  const sp = action.payload; // Get the product from the action payload
  const existingProductIndex = state.listSP.findIndex(s => s.id_sp === sp.id_sp && s.id_mau === sp.id_mau);

  if (existingProductIndex === -1) {
    // If the product is not already in the cart, add it with quantity 1
    const updatedListSP = [...state.listSP, { ...sp, soluong: 1 }];
    state.listSP = updatedListSP;
  } else {
    // If the product is already in the cart, increment its quantity
    const updatedListSP = state.listSP.map((item, index) => {
      if (index === existingProductIndex) {
        return { ...item, soluong: item.soluong + 1 };
      }
      return item;
    });
    state.listSP = updatedListSP;
  }

  console.log("Đã thêm sản phẩm. Số lượng sản phẩm trong giỏ hàng:", state.listSP.length);

  // Update localStorage
  localStorage.setItem('cart', JSON.stringify(state.listSP));
}
,
SuaSL: (state, action) => {
    const { id_sp, id_mau, soluong } = action.payload; // Get product id, color id, and quantity from the action payload
    const index = state.listSP.findIndex(s => s.id_sp === id_sp && s.id_mau === id_mau); // Find the index of the product in the cart
  
    if (index !== -1) {
      // If the product is found in the cart
      const updatedListSP = [...state.listSP]; // Create a copy of the cart array
      updatedListSP[index].soluong = soluong; // Update the quantity of the product
      state.listSP = updatedListSP; // Update the cart state
      console.log("Đã sửa số lượng sản phẩm. Sản phẩm ID:", id_sp, "Màu ID:", id_mau, "Số lượng mới:", soluong);
  
      // Update localStorage
      saveToLocalStorage(updatedListSP);
    }
  },
  
  
  XoaSP: (state, action) => {
    const { id_sp, id_mau } = action.payload; // Lấy id sản phẩm và id màu từ action payload
    const updatedListSP = state.listSP.filter(product => product.id_sp !== id_sp || product.id_mau !== id_mau); // Lọc ra các sản phẩm không trùng khớp với id_sp và id_mau được cung cấp từ action payload
    state.listSP = updatedListSP; // Cập nhật trạng thái giỏ hàng
  
    console.log("Đã xóa sản phẩm. ID sản phẩm:", id_sp, "ID màu:", id_mau);
  
    // Cập nhật localStorage
    saveToLocalStorage(updatedListSP);
  },
  
        XoaTatCaSP: (state) => {
            state.listSP = [];
            localStorage.removeItem('cart');
        },
    
    }
})

export const { themSP, SuaSL,XoaSP,XoaTatCaSP} = cartSlice.actions
export default cartSlice.reducer;