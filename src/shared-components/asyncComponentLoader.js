import React, { Component } from 'react';

/**
 * Loads a given component asynchronously. This will be used by
 * Webpack to determine code splitting.
 * @param {function} importComponent - A function that imports the
 * component to be loaded asynchronously.
 * @returns {function} asyncComponent
 */
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();
      this.onMount(component);
    }
    /**
     * A function to be called once asyncComponent has mounted.
     * Currently, it will store the passed component in asyncComponent's state.
     * Perform any state setting here instead of directly in componentDidMount
     * to avoid unnecessary re-renders.
     * @param {function} componentToStore - A component to be stored in asyncComponent's state
     */
    onMount(componentToStore) {
      this.setState({
        component: componentToStore
      });
    }

    render() {
      const RenderComponent = this.state.component;

      return RenderComponent
        ? <RenderComponent {...this.props} />
        : null;
    }
  }

  return AsyncComponent;
}
