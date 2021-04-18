import { fetchPeersInfo } from './api/index.js'
import { FilterComponent,PeersComponent, GreetingComponent } from './components/index.js'

const components = [
    {
        selector: ".greeting",
        view: GreetingComponent,
        options: {}
    },
    {
        selector: '.filter',
        view: FilterComponent,
        options: {}
    },
    {
        selector: '.content',
        view: PeersComponent,
        options: await fetchPeersInfo()
    }
]

components.map(component => {
    const componentAnchor = document.querySelector(component.selector);
    
    const view = new component.view(componentAnchor, component.options)
    componentAnchor.appendChild(view.getHtml());
})
