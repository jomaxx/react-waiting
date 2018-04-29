import React from "react";

const Context = React.createContext(() => {});

export default class Waiting extends React.Component {
  state = { waiting: 0 };

  setState = this.setState.bind(this);

  render() {
    return (
      <Context.Provider value={this.setState}>
        {this.props.children(!!this.state.waiting)}
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
  return { waiting: state.waiting + 1 };
}

function decrement(state) {
  return { waiting: state.waiting - 1 };
}
