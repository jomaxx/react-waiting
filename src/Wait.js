import React from "react";
import { IncrementWaiting } from "./Waiting";

export default class Wait extends React.Component {
  static get getDerivedStateFromProps() {
    return getDerivedStateFromProps;
  }

  static defaultProps = {
    children: () => null
  };

  state = {
    status: 0,
    promise: undefined,
    value: undefined,
    error: undefined
  };

  componentDidMount() {
    let subscribed = true;

    this.componentWillUnmount = () => {
      subscribed = false;
    };

    if (this.state.promise) {
      this.state.promise.then(
        () => subscribed && this.setState(getDerivedStateFromProps(this.props)),
        () => subscribed && this.setState(getDerivedStateFromProps(this.props))
      );
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.promise === prevState.promise) return;
    this.componentWillUnmount();
    this.componentDidMount();
  }

  render() {
    switch (this.state.status) {
      case 0:
        return <IncrementWaiting />;
      case 1:
        return this.props.children(this.state.value);
      case 2:
      default:
        throw this.state.error;
    }
  }
}

function isPromise(promise) {
  return promise && typeof promise.then === "function";
}

const cache = new WeakMap();

function getDerivedStateFromProps(props) {
  if (!isPromise(props.on)) {
    return {
      status: 1,
      promise: undefined,
      value: props.on,
      error: undefined
    };
  }

  if (cache.has(props.on)) {
    return cache.get(props.on);
  }

  const cached = {
    status: 0,
    promise: undefined,
    value: undefined,
    error: undefined
  };

  cached.promise = props.on
    .then(value => {
      cached.status = 1;
      cached.promise = undefined;
      cached.value = value;
    })
    .catch(error => {
      cached.status = 2;
      cached.promise = undefined;
      cached.error = error;
    });

  cache.set(props.on, cached);

  return cached;
}
