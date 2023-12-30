const fs = require('fs');
const path = require('path');
const { default: axios } = require("axios");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const DOMAIN = process.env.AMOCRM_DOMAIN;

class DataController {
  constructor() {
    this.data = this.loadData();
  }

  
  loadData() {
    try {
      const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
      return data;
    } catch (error) {
      console.error('Error loading data:', error.message);
      return null;
    }
  }


  async getData() {
    await this.#updateToken();
    return this.data;
  }


  updateData(updatedData) {
    this.data = updatedData;
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(updatedData, null, 2), 'utf8');
  }

  #updateToken = async () => {
    try {
      const body = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: this.data.refresh_token,
        redirect_uri: REDIRECT_URI
      }
      const { data } = await axios.post(`${DOMAIN}/oauth2/access_token`, body)
      this.updateData(data)
    } catch (error) {
      throw error
    }
  }
}

const DB = new DataController();

module.exports = DB;