class Day {

    constructor(data) {
        for(let field in data) {
            this[field] = data[field];
        }
    }

    static factory(type, data) {
        if(type === 'week') {
            let daysInWeek = [
                'maandag',
                'dinsdag',
                'woensdag',
                'donderdag',
                'vrijdag',
                'zaterdag',
                'zondag',
            ];

            let days = {};
            for(let index in daysInWeek) {
                let day = new Day(data);
                days[daysInWeek[index]] = day;
            }

            return days;
        }
    }


    static daysOfWeek(weekPicker) {
        let weekAndYear = weekPicker.split(" - ");
        let week = weekAndYear[0];
        let year = weekAndYear[1];

        let monday = moment().week(week).year(year).day(1);
        let tuesday = moment().week(week).year(year).day(2);
        let wednesday = moment().week(week).year(year).day(3);
        let thursday = moment().week(week).year(year).day(4);
        let friday = moment().week(week).year(year).day(5);
        let saturday = moment().week(week).year(year).day(6);
        let sunday = moment().week(week).year(year).day(7);

        let days = {};
        days['maandag'] = new Day({
            date: monday,
            hour: null,
        });

        days['dinsdag'] = new Day({
            date: tuesday,
            hour: null,
        });

        days['woensdag'] = new Day({
            date: wednesday,
            hour: null,
        });

        days['donderdag'] = new Day({
            date: thursday,
            hour: null,
        });

        days['vrijdag'] = new Day({
            date: friday,
            hour: null,
        });

        days['zaterdag'] = new Day({
            date: saturday,
            hour: null,
        });

        days['zondag'] = new Day({
            date: sunday,
            hour: null,
        });

        return days;
    }

    attach(data, success){
        for(let field in data) {
            this[field] = data[field];
        }
    }

}

export default Day;