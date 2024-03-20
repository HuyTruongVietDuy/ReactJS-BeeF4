import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { XoaSP } from "../../redux/cartSlice";
function ThanhToan(){
  const navigate = useNavigate();
    const dispatch = useDispatch();
    
    let htRef = React.createRef(); 
    let emRef = React.createRef(); 
    let numRef = React.createRef();
    let dcRef = React.createRef(); 
    let noteRef = React.createRef(); 
    const cart = useSelector(state => state.cart.listSP);
    // Calculate total price
   const total = cart.reduce((acc, sp) => acc + sp.gia * sp.soluong, 0);
   // Render the total cart section
 const renderTotalCart = () => (
     <div className="total-right">{Number(total).toLocaleString("vi")} VNĐ</div>
   
 );
    const submitDuLieu = () =>{
        let ht = htRef.current.value; let em = emRef.current.value;
        if(ht===""|| em===""){alert('Nhập đủ thông tin bạn eiii'); return;}
        if(cart.length === 0){alert("ban chua chon san pham nao"); return;}
        let url="http://localhost:4000/donhang/luudonhang";
        let tt = {ho_ten:htRef.current.value,
                  email:emRef.current.value,
                  dienthoai:numRef.current.value,
                  diachi:dcRef.current.value,
                  ghichu:noteRef.current.value,
          }
        var opt = {method:"post", body:JSON.stringify(tt),
        headers:{'Content-type':'application/json'}}
        fetch(url, opt).then(res=> res.json()).then(data => {
          if (data.id_dh < 0) {
            console.log("Lỗi lưu đơn hàng", data);
          } else {
            let id_dh = data.id_dh;
            console.log("Đã lưu xong đơn hàng");
  
            luuchitietdonhang(id_dh, cart);
            
            // Redirect to /thank on successful order
            navigate("/thank");
          }
        });
    };
        const luuchitietdonhang = (id_dh, cart) => {
          let url ="http://localhost:4000/donhang/luugiohang";
          cart.forEach(sp =>{
            let t = {id_dh:id_dh, id_sp: sp.id_dh, so_luong: sp.so_luong}
            let opt={method:"post",
                body:JSON.stringify(t),
                headers:{'Content-Type':'application/json'} }
                fetch(url, opt).then(res => res.json() )
                .then(data => luuxongsp(data))
                
                const luuxongsp = (data) =>{
                  console.log(data)
                  dispatch( XoaSP(data.id_sp) ) ;
                  }
                  
          })
          console.log("Se gui len server id_dh=",id_dh);
          console.log("Se gui len server cart=", cart);
        // lưu đơn hàng và chi tiết đơn hàng
        
    
    }
    return(
       <div className="home-bill">
     
        <article>
        <div className="bill-logo">
        <a href="/"><img src="images/SQBE Logo.png" alt=""/></a> 
     </div>
     <div className="container-aritcle-thanhtoan">
        <form action="">
        <h1>Thông tin nhận hàng</h1>
  
        <input type="text" placeholder="Email" className="inp" ref={emRef}/> <br/>
        <input type="text" placeholder="Họ và tên" className="inp" ref={htRef}/> <br/>
        <input type="text" placeholder="Số điện thoại" className="inp" ref={numRef}/> <br/>
        <input type="text" placeholder="Địa chỉ" className="inp" ref={dcRef}/> <br/>
        <input type="text" placeholder="Ghi chú(tùy chọn)" className="inp" ref={noteRef}/>
      </form>
  
      <div className="thongtin-thanhtoan">
      <h1>Vận chuyển</h1>
      <div className="box-vanchuyen">
      Vui lòng nhập thông tin giao hàng
      <h1>Thanh Toán</h1>
      Thanh toán qua thẻ tín dụng: <input type="radio" name="bil" id=""/><br/>
      <br/><hr/><br/>
      Thanh toán khi nhận hàng (COD): <input type="radio" name="bil" id=""/>
    </div>

      </div>
      </div>
        </article>
        
        <aside>
        {cart.map((sp, index) =>{return (
          <div key={index} className="content-bill">
          <h1>Đơn hàng ({sp.soluong} sản phẩm)</h1>  
          <div className="bill-cart" >
          <div className="bill-cart-left">
            <div className="bill-cart-img">
                <img  src={`http://localhost:4000/product/uploads/${sp.hinh}`} alt=""/>
                <div className="bill-cart-count">{sp.soluong}</div>
            </div>
            <div className="bill-cart-name">
            {sp.ten_sp}
            </div>
  
           
          </div>
          
          <div className="bill-cart-right">
          {Number(sp.soluong * sp.gia).toLocaleString("vi")} VNĐ
          </div>
        </div>
          </div>
        )

        })}
       
     

        <hr/>

        <div className="discount">
        <div className="discount-left">
          <input type="text" placeholder="Nhập mã giảm giá"/>
        </div>

        <div className="discount-right">
          <button>Áp dụng</button>
        </div>

        <hr/>
        <div className="total">
          <div className="total-left">Tổng cộng</div>
       
          {renderTotalCart()}
        </div>

        <div className="total-button">
        <div className="total-button-left">  Quay về giỏ hàng </div>
       <a href="#/" onClick={() => submitDuLieu()}> <div className="total-button-right"> <button type="button" > Lưu Đơn Hàng</button></div></a>
        
      </div>
      </div>
        </aside>
       </div>
    )
}
export default ThanhToan;