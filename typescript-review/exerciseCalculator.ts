interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}
interface Exercises {
  exercises: number[];
  target: number;
}

const parseExercises = (args: string[]): Exercises => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 33) throw new Error('Too many arguments');
  const training = args.slice(2)
  for (var exercise of training) {
    if (isNaN(Number(exercise))) throw Error('Provided values were not numbers!')
  }
  return {
    exercises: training.slice(0, -1).map(exercise => Number(exercise)),
    target: Number(training[training.length - 1])
  }


}


const calculateExercises = (training: Array<number>, target: number): Result => {
  const average: number = training.reduce((partialSum, a) => partialSum + a, 0) / training.length
  let result = {
    periodLength: training.length,
    trainingDays: training.filter(hours => hours > 0).length,
    target: target,
    average: average,
    success: target <= average ? true : false,
    rating: 3,
    ratingDescription: "Wow, great job!"
  }

  if ((target - average) < 0.5) {
    result = {
      ...result,
      rating: 2,
      ratingDescription: "not too bad but could be better"
    }
  } else if ((target - average) > 1) {
    result = {
      ...result,
      rating: 1,
      ratingDescription: "You can do better next week!"
    }
  }
  return result

}

try {
  const { exercises, target } = parseExercises(process.argv);
  console.log(calculateExercises(exercises, target))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
