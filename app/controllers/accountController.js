const { default: axios } = require("axios");
const DB = require('../model/dataController')
const DOMAIN = process.env.AMOCRM_DOMAIN;

exports.getAccountData = async (_, res) => {
  try {
    const { access_token } = DB.getData()
    const { data } = await axios.get(`${DOMAIN}/api/v4/account`, {
      headers: {
        'Authorization': `Bearer ${access_token}`
      }
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}