class Greeting {
    constructor(element, options) {
        this.element = element;
        this.options = options;
    }


    getHtml = () => {
        const {name = "Patrik"} = this.options;
        const content = document.createElement('p');
        content.innerText = `Hi ${name}, schedule your next practice session with a peer`

        return content;
    }
}


export default Greeting
