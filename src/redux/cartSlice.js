import { createSlice } from "@reduxjs/toolkit";

const saveToLocalStorage = (cartItems) => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
};
export const cartSlice = createSlice({
    name:'cart',
    initialState:{   listSP: JSON.parse(localStorage.getItem('cart')) || [], }, // cấu trúc trúc listsp sẽ như yêu cầu ở trên
    reducers:{
      themSP: (state, action) => {
    const sp = action.payload; // Get product from action payload
    const existingProductIndex = state.listSP.findIndex(s => s.id_sp === sp.id_sp && s.id_mau === sp.id_mau && s.id_size === sp.id_size);

    if (existingProductIndex === -1) {
        // If the product doesn't exist in the cart, add it as a new entry
        state.listSP.push({ ...sp, soluong: 1 });
    } else {
        // If the product exists in the cart, increase its quantity by 1
        state.listSP[existingProductIndex].soluong += 1;
    }

    console.log("Đã thêm sản phẩm. Số lượng sản phẩm trong giỏ hàng:", state.listSP.length);

    // Update localStorage
    saveToLocalStorage(state.listSP);
}

,
SuaSL: (state, action) => {
  const { id_sp, id_mau, id_size, soluong } = action.payload;
  const index = state.listSP.findIndex(s => s.id_sp === id_sp && s.id_mau === id_mau && s.id_size === id_size);

  if (index !== -1) {
      const updatedListSP = [...state.listSP];
      updatedListSP[index].soluong = soluong;
      state.listSP = updatedListSP;

      console.log("Đã sửa số lượng sản phẩm. Sản phẩm ID:", id_sp, "Màu ID:", id_mau, "Size ID:", id_size, "Số lượng mới:", soluong);

      saveToLocalStorage(updatedListSP);
  }
},
  
  
XoaSP: (state, action) => {
  const { id_sp, id_mau, id_size } = action.payload; // Lấy id sản phẩm, id màu và id size từ action payload
  const updatedListSP = state.listSP.filter(product => !(product.id_sp === id_sp && product.id_mau === id_mau && product.id_size === id_size)); // Lọc ra các sản phẩm không trùng khớp với id_sp, id_mau và id_size được cung cấp từ action payload
  state.listSP = updatedListSP; // Cập nhật trạng thái giỏ hàng

  console.log("Đã xóa sản phẩm. ID sản phẩm:", id_sp, "ID màu:", id_mau, "ID size:", id_size);

  // Cập nhật localStorage
  saveToLocalStorage(updatedListSP);
}
,
  
        XoaTatCaSP: (state) => {
            state.listSP = [];
            localStorage.removeItem('cart');
        },
    
    }
})

export const { themSP, SuaSL,XoaSP,XoaTatCaSP} = cartSlice.actions
export default cartSlice.reducer;