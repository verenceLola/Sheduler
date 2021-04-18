class EventStore {
    constructor(){
        this.listeners = this.configureListeners();

        if (!EventStore._instance){
            EventStore._instance = this;
        }
        return EventStore._instance;
    }

    configureListeners = () => new Proxy([], {
        set: (target, prop, value, _receiver ) => {
            const {view, viewClass} = value;

            if (view?.nodeName){
                window.value = value
                view.addEventListener('update', event => this.onUpdateComponent(event, viewClass));
            }

            target[prop] = value;

            return true;
        },
    })

    static getInstance = () => this._instance;

    addListener = ({view, viewClass}) => {
        this.listeners.push({view, viewClass});
    }

    onUpdateComponent = (event, viewClass) => {
        const {detail: {peers}, target} = event;

        const anchorElement = target.parentNode;
        const updatedView = new viewClass(anchorElement, {peers}).getHtml();

        anchorElement.replaceChild(updatedView, target);

        this.updateListeners(target, {view:updatedView, viewClass});
    }

    dispatchEvent = data => {
        const event = new CustomEvent('update', {detail: {peers: data}});

        this.listeners.forEach(({view}) => {
            view.dispatchEvent(event);
        });
    }

    removeListener = component => {
        this.listeners = this.listeners.filter(item => item !== component);
    }

    updateListeners = (component, updatedComponent) => {
        const index = this.listeners.findIndex(listener => listener.view === component);
        this.listeners[index] = updatedComponent;
    }
}

export default EventStore;
