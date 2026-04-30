export function normalizeMatrix(matrix) {
  const colSums = matrix[0].map((_, colIndex) =>
    matrix.reduce((sum, row) => sum + row[colIndex], 0)
  );

  return matrix.map(row =>
    row.map((value, colIndex) => value / colSums[colIndex])
  );
}

export function calculateWeights(normalizedMatrix) {
  return normalizedMatrix.map(row => {
    const sum = row.reduce((a, b) => a + b, 0);
    return sum / row.length;
  });
}

export function calculateConsistency(matrix, weights) {
  const n = matrix.length;

  const weightedSum = matrix.map(row =>
    row.reduce((sum, value, i) => sum + value * weights[i], 0)
  );

  const lambda = weightedSum.map((val, i) => val / weights[i]);
  const lambdaMax = lambda.reduce((a, b) => a + b, 0) / n;

  const CI = (lambdaMax - n) / (n - 1);

  const RI_VALUES = {
    1: 0, 2: 0, 3: 0.58, 4: 0.9, 5: 1.12,
    6: 1.24, 7: 1.32, 8: 1.41, 9: 1.45, 10: 1.49
  };

  const RI = RI_VALUES[n];
  const CR = CI / RI;

  return { CI, CR, isConsistent: CR < 0.1 };
}

export function calculateScores(alternatives, weights) {
  return alternatives.map(alt => {
    let score = 0;
    weights.forEach((w, i) => {
      score += w * alt.values[i];
    });
    return { name: alt.name, score };
  });
}