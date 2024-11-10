export interface HeightMass {
  height: number;
  mass: number;
}

export const parseArguments = (args: string[]): HeightMass => {
  if (args.length < 2) throw new Error('Not enough arguments');
  if (args.length > 2) throw new Error('Too many arguments');

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      mass: Number(args[1])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, mass: number): string => {
  const bmi: number = mass / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25.0) {
    return "Normal range";
  } else {
    return "Overweight";
  }
};

// Command-line usage
if (require.main === module) {
  try {
    const { height, mass } = parseArguments(process.argv.slice(2));
    console.log(calculateBmi(height, mass));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
