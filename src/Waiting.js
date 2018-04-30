import React from "react";

const Context = React.createContext(() => {});

export default class Waiting extends React.Component {
  state = {
    waiting: true,
    size: 1
  };

  setState = this.setState.bind(this);

  componentDidMount() {
    this.setState(decrement);
  }

  render() {
    return (
      <Context.Provider value={this.setState}>
        {this.props.children(this.state.waiting)}
      </Context.Provider>
    );
  }
}

export function IncrementWaiting() {
  return (
    <Context.Consumer>
      {setState => <IncrementWaitingSideEffect setState={setState} />}
    </Context.Consumer>
  );
}

class IncrementWaitingSideEffect extends React.Component {
  componentDidMount() {
    this.props.setState(increment);
  }

  componentWillUnmount() {
    this.props.setState(decrement);
  }

  render() {
    return null;
  }
}

function increment(state) {
  state.size = state.size + 1;
  const waiting = !!state.size;
  if (state.waiting === waiting) return null;
  return { size: state.size, waiting };
}

function decrement(state) {
  state.size = state.size - 1;
  const waiting = !!state.size;
  if (state.waiting === waiting) return null;
  return { size: state.size, waiting };
}
