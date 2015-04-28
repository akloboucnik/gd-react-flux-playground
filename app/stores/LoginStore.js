import { Store } from 'flummox';

export class LoginStore extends Store {
    constructor(flux) {
        super();

        const loginActionIds = flux.getActionIds('login');
        this.registerAsync(loginActionIds.login, this.handleBootstrapStart, this.handleBootstrap, this.handleBootstrap);

        this.state = {
            bootstrap: { accountSetting: {} }
        };
    }

    handleBootstrapStart() {
        console.log('bootstrap start ==== ', arguments);
        // this actually emits the change
        this.replaceState({
            loading: true,
            bootstrap: {}
        });
    }

    handleBootstrap(data) {
        console.log('bootstrap end ==== ', data);
        // this actually emits the change
        this.replaceState({
            loading: false,
            bootstrap: data.bootstrapResource
        });
    }

    handleBootrapError(err) {
        console.log('bootstrap error ==== ', err);
        this.replaceState({ loading: false, error: true });
    }

    getBootstrap() {
        return this.state.bootstrap;
    }

    getProjectId() {
        if(!this.state.bootstrap.current) {
            return null;
        }
        return this.state.bootstrap.current.project.links.self.split('/')[3];
    }
}

