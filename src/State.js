function State() {
  var state = {};
  return {
    reduce(f) {
      state = f(state);
      console.log("State:", state);
      return state;
    }
  };
}

export default State;
