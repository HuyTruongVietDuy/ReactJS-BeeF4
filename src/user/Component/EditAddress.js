import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { message } from "antd";
const EditAddress = () => {
  const { id_donhang } = useParams();
  const navigate = useNavigate();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);
  const [diaChi, setDiaChi] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedWard, setSelectedWard] = useState('');
  const diachiRef = useRef(null);
  const tinhRef = useRef(null);
  const huyenRef = useRef(null);
  const xaRef = useRef(null);
  const sdtRef = useRef(null);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    fetch("http://localhost:4000/donhang/data")
      .then((response) => response.json())
      .then((data) => {
        setProvinces(data);
        setLoadingProvinces(false);
      })
      .catch((error) => {
        console.error("Error fetching province data:", error);
        setLoadingProvinces(false);
      });
  }, []);

  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    const selectedProvinceData = provinces.find(
      (province) => province[1] === selectedProvince
    );

    if (selectedProvinceData && selectedProvinceData.length > 4) {
      setDistricts(selectedProvinceData[4]);
      setSelectedDistrict(''); // Reset selected district
      setWards([]); // Reset wards when province changes
      setSelectedWard(''); // Reset selected ward
    } else {
      setDistricts([]);
      setSelectedDistrict('');
      setWards([]);
      setSelectedWard('');
    }
    setSelectedProvince(selectedProvince);
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    const selectedDistrictData = districts.find(
      (district) => district[1] === selectedDistrict
    );

    if (selectedDistrictData && selectedDistrictData.length > 4) {
      setWards(selectedDistrictData[4]);
      setSelectedWard(''); // Reset selected ward
    } else {
      setWards([]);
      setSelectedWard('');
    }
    setSelectedDistrict(selectedDistrict);
  };

  const handleWardChange = (e) => {
    const selectedWard = e.target.value;
    setSelectedWard(selectedWard);
  };

  const validateForm = () => {
    const errors = {};
    if (!diaChi) {
      errors.diaChi = 'Vui lòng nhập địa chỉ.';
    }
    if (!soDienThoai) {
      errors.soDienThoai = 'Vui lòng nhập số điện thoại.';
    } else if (!/^\d{10,11}$/.test(soDienThoai)) {
      errors.soDienThoai = 'Số điện thoại không hợp lệ.';
    }
    if (!selectedProvince) {
      errors.selectedProvince = 'Vui lòng chọn tỉnh/thành phố.';
    }
    if (!selectedDistrict) {
      errors.selectedDistrict = 'Vui lòng chọn quận/huyện.';
    }
    if (!selectedWard) {
      errors.selectedWard = 'Vui lòng chọn phường/xã.';
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const formData = {
        diachi: diachiRef.current.value,
        tinh: tinhRef.current.value,
        huyen: huyenRef.current.value,
        xa: xaRef.current.value,
        sdt: sdtRef.current.value
      };
      try {
        const response = await fetch(`http://localhost:4000/donhang/update-address/${id_donhang}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        if (!response.ok) {
          throw new Error('Failed to update address');
        }
        message.success('cập nhật địa chỉ và số điện thoại thành công');
        navigate(`/thanhtoanthanhcong/${id_donhang}`);
        const data = await response.json();
        console.log(data); // Assuming server sends back a success message
      } catch (error) {
        console.error('Error updating address:', error);
      }
    }
  };

  return (
    <div id='container-main'>
      <form onSubmit={handleSubmit} className="user-form-dangky">
        <h1 style={{fontSize:'1.4vw'}}>Thay đổi địa chỉ </h1>
        <input
          type="text"
          ref={diachiRef}
          placeholder="Địa chỉ"
          value={diaChi}
          onChange={(event) => setDiaChi(event.target.value)}
          
        />
        {errors.diaChi && <p style={{ color: 'red' }}>{errors.diaChi}</p>}
        
        <input
          type="text"
          ref={sdtRef}
          placeholder="Số điện thoại"
          value={soDienThoai}
          onChange={(event) => setSoDienThoai(event.target.value)}
        />
        {errors.soDienThoai && <p style={{ color: 'red' }}>{errors.soDienThoai}</p>}

        <select
          onChange={handleProvinceChange}
          ref={tinhRef}
          value={selectedProvince}
        >
          <option value="" disabled>Chọn tỉnh/thành phố</option>
          {loadingProvinces ? (
            <option>Đang tải...</option>
          ) : (
            provinces.map((province) => (
              <option key={province[0]} value={province[1]}>
                {province[1]}
              </option>
            ))
          )}
        </select>
        {errors.selectedProvince && <p style={{ color: 'red' }}>{errors.selectedProvince}</p>}

        <select
          onChange={handleDistrictChange}
          ref={huyenRef}
          value={selectedDistrict}
        >
          <option value="" disabled>Chọn quận/huyện</option>
          {loadingDistricts ? (
            <option>Đang tải...</option>
          ) : (
            districts.map((district) => (
              <option key={district[0]} value={district[1]}>
                {district[1]}
              </option>
            ))
          )}
        </select>
        {errors.selectedDistrict && <p style={{ color: 'red' }}>{errors.selectedDistrict}</p>}

        <select
          onChange={handleWardChange}
          ref={xaRef}
          value={selectedWard}
        >
          <option value="" disabled>Chọn phường/xã</option>
          {loadingWards ? (
            <option>Đang tải...</option>
          ) : (
            wards.map((ward) => (
              <option key={ward[0]} value={ward[1]}>
                {ward[1]}
              </option>
            ))
          )}
        </select>
        {errors.selectedWard && <p style={{ color: 'red' }}>{errors.selectedWard}</p>}

        <button type="submit">Cập nhật địa chỉ</button>
      </form>
    </div>
  );
};

export default EditAddress;