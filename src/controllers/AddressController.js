const AddressService = require('../Services/AddressService');
const citis = require('../../address_data/citis');
const districts = require('../../address_data/districts');
const communes = require('../../address_data/communes');

const createAddress = async (req, res) => {
    try {
        const { homeNumber, commune, district, city, userId, phone, name, addressMain } = req.body; 

        const cityExists = citis.some(c => c.city === city.trim());
        if (!cityExists) return res.status(400).json({ message: "Thành phố không tồn tại" });

        const districtExists = districts.some(d => d.city === city.trim() && d.district === district.trim());
        if (!districtExists) return res.status(400).json({ message: "Quận/Huyện không tồn tại" });

        const communeExists = communes.some(c => c.city === city.trim() && c.district === district.trim() && c.commune === commune.trim());
        if (!communeExists) return res.status(400).json({ message: "Xã/Phường không tồn tại" });

        const response = await AddressService.createAddress(req.body);
        return res.status(200).json(response);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getAddressByUserId = async (req, res) => {
    try{
        const userId = req.params.id
        if(!userId){
            res.status(304).json({message: "Yêu cầu UserId"})
        }
        const response = await AddressService.getAddressByUserId(userId)
        return res.status(200).json(response)
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
}

const deleteAddressById = async (req, res) => {
    try {
        const addressId = req.params.id
        if(!addressId){
            res.status(304).json({message: "Yêu cầu AddressId"})
        }
        const response = await AddressService.deleteAddressById(addressId)
        return res.status(200).json(response)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    createAddress,
    getAddressByUserId,
    deleteAddressById
};
