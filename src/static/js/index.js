import { FilterComponent, GreetingComponent } from './components/index.js'

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
    // {
    //     selector: '.content',
    //     view: (element, options) => console.log("Showing the filtered content", element),
    //     options: {}
    // }
]

components.map(component => {
    const componentAnchor = document.querySelector(component.selector);
    
    const view = new component.view(componentAnchor, component.options)
    componentAnchor.appendChild(view.getHtml());
})
