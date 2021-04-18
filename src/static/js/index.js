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
        options: [{
            "image":"https://cdn.shopify.com/s/files/1/0417/7869/files/Mark.png",
            "name":"Mark S.",
            "last_login":"Logged in today",
            "about_me":"I am a PM with 5+ years of experience in e-commerce and retail tech products, on web & mobile. Passionate about CX.",
            "availability":[
               {
                  "start":"2021-04-19T14:00:00",
                  "end":"2021-04-19T16:00:00"
               },
               {
                  "start":"2021-04-20T14:00:00",
                  "end":"2021-04-20T16:00:00"
               },
               {
                  "start":"2021-04-26T14:00:00",
                  "end":"2021-04-26T16:00:00"
               }
            ],
            "companies":[
               "Google",
               "DoorDash"
            ],
            "sessions":6,
            "years_of_experience":3,
            "location":"North America"
         },]
    }
]

components.map(component => {
    const componentAnchor = document.querySelector(component.selector);
    
    const view = new component.view(componentAnchor, component.options)
    componentAnchor.appendChild(view.getHtml());
})
