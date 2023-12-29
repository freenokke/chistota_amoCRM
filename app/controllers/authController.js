const { default: axios } = require("axios");
const DB = require('../model/dataController')

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const DOMAIN = process.env.AMOCRM_DOMAIN;

exports.authTrigger = (_, res) => {
  try {
    if (CLIENT_ID) {
      res.redirect(`https://amocrm.ru/oauth?client_id=${CLIENT_ID}&mode=popup`);
    } else {
      res.status(400).send('Wrong client_id was provided');
    }
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error');
  }
}

exports.redirectFn = async (req, res) => {
  try {
    const code = req.query.code;

    const body = {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI
    }
    const { data } = await axios.post(`${DOMAIN}/oauth2/access_token`, body)
    DB.updateData(data)
    res.status(200).end()
  } catch (error) {
    console.log(error)
    res.status(500).send('Internal Server Error');
  }
}
