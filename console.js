module.exports = () => {
  ["log", "warn", "error"].forEach((methodName) => {
    const originalMethod = console[methodName];
    console[methodName] = (...args) => {
      try {
        throw new Error();
      } catch (error) {
        originalMethod.apply(console, [
          error.stack // Grabs the stack trace
            .split("\n")[2] // Grabs third line
            .trim() // Removes spaces
            .substring(3) // Removes three first characters ("at ")
            .replace(__dirname, "") // Removes script folder path
            .replace(/\s\(./, " at ") // Removes first parentheses and replaces it with " at "
            .replace(/\)/, ""), // Removes last parentheses
          "\n",
          ...args,
        ]);
      }
    };
  });
};
