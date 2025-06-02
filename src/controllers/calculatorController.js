'use strict';

const bodyParser = require('../utils/bodyParser');
const validator = require('../utils/validators');
const powerCalculator = require('../utils/powerCalculator');
const psuRecommender = require('../utils/psuRecommender');

const calculatePower = (req, res) => {
  bodyParser.parseBody(req, (error, components) => {
    if (error) {
      res.writeHead(error.status || 400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: error.message }));
      return;
    }

    const validationError = validator.validateComponents(components);
    if (validationError) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: validationError }));
      return;
    }

    try {
      const totalPower = powerCalculator.calculateTotalPower(components);
      
      const recommendedPsu = psuRecommender.recommendPsu(totalPower);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ totalPower, recommendedPsu }));
    } catch (error) {
      console.error('Error calculating power:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Error calculating power consumption' }));
    }
  });
};

module.exports = {
  calculatePower
};