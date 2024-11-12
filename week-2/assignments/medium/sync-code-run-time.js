const syncCodeRunTime = (n) => {
  const startTime = Date.now();
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  const endTime = Date.now();
  console.log(endTime - startTime);
};

syncCodeRunTime(100000000);
