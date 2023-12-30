const { default: axios } = require("axios");
const { getCustomFieldPattern, formatDate } = require('./helpers');
const util = require('util');
const DOMAIN = process.env.AMOCRM_DOMAIN;

exports.createContact = async (data, token) => {
  const { contact } = data;
  try {
    const { data: responseData } = await axios.post(`${DOMAIN}/api/v4/contacts`,
    [
      {
        first_name: contact.name,
        custom_fields_values: [
          {
            field_id: 2254989,
            values: [
              {
                value: contact.phone
              }
            ]
          }
        ]
      }
    ],
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    return responseData;
  } catch (error) {
    throw error;
  }
}

exports.createLead = async (data, contact, token) => {
  console.log(token)
  try {
    const { price, services, general, time, date } = data;

    const createCustomFields = [...services, ...general].map((service) => {
      let [id, value] = Object.entries(service)[0]

      if (value) {
        return getCustomFieldPattern(id, value)
      }
    }, [])
    .filter((item) => item)

    await axios.post(`${DOMAIN}/api/v4/leads`,
    [
      {
        name: 'Заявка',
        price,
        custom_fields_values: [
          ...createCustomFields,
          formatDate(date, time)
        ],
        _embedded: {
          tags: [
              {
                  name: 'tilda'
              }
          ],
          contacts: [
            {
              id: contact._embedded.contacts[0].id
            }
          ]
        }
      }
    ],
    {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
  } catch (error) {
    throw error;
  }
}