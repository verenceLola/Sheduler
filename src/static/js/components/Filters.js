class Filter{
    constructor(anchor, options){
        this.anchor = anchor;
        this.options = options;
    }

    getHtml  = () => {
        const filterButtons = this.generateFilterButtons();
        const content = document.createElement('div');
        content.className = 'filter-content';

        const label = document.createElement('label');
        label.innerText = "Filter peers available on:";
        label.className = 'filter-label';

        const filterDays = document.createElement('div');
        filterDays.className = "filter-days";

        filterButtons.map(button => filterDays.append(button));

        content.appendChild(label);
        content.appendChild(filterDays);
        
        return content
    }

    onFilterButtonClick = (event) => {
        console.log(event.target);
    }

    generateFilterButtons = () => {
        const buttonLabels = ['All', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

        return buttonLabels.map(label => {
            const labelElement = document.createElement("label");
            labelElement.className = 'filter-day-label';
            labelElement.textContent = label;
            labelElement.onclick = this.onFilterButtonClick

            return labelElement;
        });
    }
} 

export default Filter
