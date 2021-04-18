class Filtering {
    static getAvailableDays = peerAvailability => {
        const DATE_OPTIONS = {weekday: 'short'};

        const availbleDays = peerAvailability.map(timeSlot => {
            const {start, end} = timeSlot;

            const startDate = new Date(start)
            const endDate = new Date(end);
            const availbleHours = Math.round(endDate.getHours() - startDate.getHours());

            if (availbleHours >= 1){
                return new Intl.DateTimeFormat('en-EU', DATE_OPTIONS).format(startDate);
            }
        })

        return Array.from(new Set(availbleDays));
    }
}

export default Filtering;
