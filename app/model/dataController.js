const fs = require('fs');
const path = require('path');

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


  getData() {
    return this.data;
  }


  updateData(updatedData) {
    this.data = updatedData;
    fs.writeFileSync(path.join(__dirname, 'db.json'), JSON.stringify(updatedData, null, 2), 'utf8');
  }
}

const DB = new DataController();

module.exports = DB;