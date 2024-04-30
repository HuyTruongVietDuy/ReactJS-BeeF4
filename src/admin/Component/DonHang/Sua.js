import React, { useState, useEffect } from 'react';
import { message } from 'antd'; // Sử dụng Ant Design để hiển thị thông báo

const SuaDonHang = ({ showEditModal, closeEditModal, selectedBill, donhangID, dispatchdata }) => {
  // Trạng thái ban đầu
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  const [address, setAddress] = useState({
    diachi: '',
    tinh: '',
    huyen: '',
    xa: '',
    sdt: '',
  });

  // Khi modal được mở và có hóa đơn được chọn, cập nhật địa chỉ
  useEffect(() => {
    if (showEditModal && selectedBill) {
      setAddress({
        diachi: selectedBill.diachi || '',
        tinh: selectedBill.tinh || '',
        huyen: selectedBill.huyen || '',
        xa: selectedBill.xa || '',
        sdt: selectedBill.sdt || '',
      });
    }
  }, [showEditModal, selectedBill]);

  // Tải dữ liệu tỉnh thành khi component được mount
  useEffect(() => {
    fetch("http://localhost:4000/donhang/data")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
        setLoadingProvinces(false);
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
        message.error("Lỗi khi tải dữ liệu tỉnh/thành phố.");
        setLoadingProvinces(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setLoadingDistricts(true); // Bắt đầu tải dữ liệu huyện/quận
  
    const selectedProvinceData = provinces.find((province) => province[1] === selectedProvince);
  
    if (selectedProvinceData && selectedProvinceData[4]) {
      setDistricts(selectedProvinceData[4]);
    } else {
      setDistricts([]);
    }
  
    setWards([]); // Reset danh sách xã/phường khi thay đổi tỉnh
    setLoadingDistricts(false);
  
    setAddress((prevAddress) => ({
      ...prevAddress,
      tinh: selectedProvince,
      huyen: '',
      xa: '',
    }));
  };
  
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setLoadingWards(true);
  
    const selectedDistrictData = districts.find((district) => district[1] === selectedDistrict);
  
    if (selectedDistrictData && selectedDistrictData[4]) {
      setWards(selectedDistrictData[4]);
    } else {
      setWards([]);
    }
  
    setLoadingWards(false);
  
    setAddress((prevAddress) => ({
      ...prevAddress,
      huyen: selectedDistrict,
      xa: '',
    }));
  };
  

  // Gửi yêu cầu cập nhật địa chỉ
  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của form

    try {
      const response = await fetch(
        `http://localhost:4000/donhang/update-address/${donhangID}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(address), // Gửi dữ liệu địa chỉ
        }
      );

      const result = await response.json();

      if (response.ok) {
        message.success(result.message); // Hiển thị thông báo thành công
        dispatchdata(); // Cập nhật lại dữ liệu
        closeEditModal(); // Đóng modal sau khi cập nhật thành công
      } else {
        message.error(result.message); // Hiển thị thông báo lỗi
      }
    } catch (error) {
      console.error('Error updating address:', error);
      message.error('Lỗi khi cập nhật địa chỉ');
    }
  };

  return (
    <>
      {showEditModal && (
        <div className="admin-edit">
          <div className="admin-edit-content">
            <span id="close" onClick={closeEditModal}>
              x
            </span>
            <form className="form-admin-edit" onSubmit={handleSubmit}>
              <h1> Thay đổi địa chỉ đơn hàng {donhangID}</h1>
              <label>Địa chỉ:</label>
              <input
                type="text"
                name="diachi"
                value={address.diachi}
                onChange={handleInputChange}
              />
             <label>Tỉnh/Thành phố:</label>
<select
  onChange={handleProvinceChange}
  value={address.tinh}
  disabled={loadingProvinces}
>
  <option value="" disabled>
    Chọn Tỉnh/Thành phố
  </option>
  {provinces.map((province) => (
    <option key={province[0]} value={province[1]}>
      {province[1]}
    </option>
  ))}
</select>

<label>Huyện/Quận:</label>
<select
  onChange={handleDistrictChange}
  value={address.huyen}
  disabled={loadingDistricts}
>
  <option value="" disabled>
    Chọn Huyện/Quận
  </option>
  {districts.map((district) => (
    <option key={district[0]} value={district[1]}>
      {district[1]}
    </option>
  ))}
</select>

<label>Phường/Xã:</label>
<select
  value={address.xa}
  disabled={loadingWards}
>
  <option value="" disabled>
    Chọn Phường/Xã
  </option>
  {wards.map((ward) => (
    <option key={ward[0]} value={ward[1]}>
      {ward[1]}
    </option>
  ))}
</select>

<label>Số điện thoại:</label>
<input
  type="text"
  name="sdt"
  value={address.sdt}
  onChange={handleInputChange}
/>


<input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SuaDonHang;
