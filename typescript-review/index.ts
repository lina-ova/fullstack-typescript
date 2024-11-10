import express from 'express';
import { Request } from 'express';

import { HeightMass, parseArguments, calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: Request<{}, {}, {}, HeightMass>, res) => {
  try {
    const { height, mass } = parseArguments(Object.values(req.query))
    const result = calculateBmi(height, mass);
    res.send({
      height: height,
      weight: mass,
      bmi: result
    })
  } catch (error) {
    res.status(400).send(
      {
        error: "malformatted parameters"
      })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});