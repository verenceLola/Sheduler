import { fetchPeersInfo } from './api/index.js'
import { FilterComponent,PeersComponent, GreetingComponent } from './components/index.js'
import AppEventStore from './utils/event.js';

const peersData = await fetchPeersInfo();

const components = [
    {
        selector: ".greeting",
        view: GreetingComponent,
        options: {}
    },
    {
        selector: '.filter',
        view: FilterComponent,
        options: {
            peers: peersData,
        },
    },
    {
        selector: '.content',
        view: PeersComponent,
        options: {
            peers: peersData,
            "re-render": true
        }
    }
]
const eventStore = new AppEventStore()

components.map(component => {
    const componentAnchor = document.querySelector(component.selector);

    const viewNode = new component.view(componentAnchor, component.options).getHtml();
    
    if (component.options['re-render']){
        eventStore.addListener({view: viewNode, viewClass: component.view});
    }

    componentAnchor.appendChild(viewNode);
})
