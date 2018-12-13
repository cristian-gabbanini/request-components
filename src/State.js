function State() {
  var state = {};
  return {
    reduce(f) {
      state = f(state);
      return state;
    },
    get() {
      return state;
    }
  };
}

export default State;
