
const DB = require('../model/dataController')
const util = require('util');
const { createContact, createLead } = require('../shared/amoCrmAPI');



exports.processFormData = async (req, res) => {
  try {
    const { access_token } = DB.getData()

    const contact = await createContact(req.body, access_token);
    await createLead(req.body, contact, access_token)

    res.status(200).end()
  } catch (error) {
    console.log(util.inspect(error, {depth:12}));
    res.status(500).send(`Internal Server Error`);
  }
}