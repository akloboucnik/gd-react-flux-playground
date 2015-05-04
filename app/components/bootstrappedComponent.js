import React from 'react';
import { login as apiLogin,
         bootstrap as apiBootstrap } from '../utils/APIUtils';
const {USER, PASS} = require('../../.credentials');

// Higher order component.
// https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750
export default function bootstrappedComponent(Component) {
  return class BootstrappedComponent extends React.Component {
    constructor(props, ctx) {
        super(props, ctx);

        this.state = { bootstrap: {}, projectId: null };
    }

    // XXX this would probably be just getProjectId call
    componentWillMount() {
        apiLogin(USER, PASS).then(apiBootstrap).then((bootstrapData) => {
            let id = bootstrapData.bootstrapResource.current.project.links.self.split('/')[3];
            this.setState({
                bootstrap: bootstrapData.bootstrapResource,
                projectId: id
            });
        }, (reason) => {
            console.log(`Login in component failed because ${reason}`);
        });
    }
    render() {
      return <Component {...this.props} bootstrap={this.state.bootstrap} projectId={this.state.projectId} />;
    }
  };

}

