window.DateHelper = new class{

	constructor() {
	}

	findMondayOfWeekAndYear(week, year) {
		return moment().day("Monday").week(week).year(year);
	}

	setDate(date) {
		this.date = moment(date);
		return this;
	}
	getMonday(){
		this.date.startOf('isoweek').subtract(1, 'days');
		return this;
	}
	getTuesday() {
		this.getMonday().date.add(1, 'd');
		return this;
	}
	getWednesday() {
		this.getMonday().date.add(2, 'd');
		return this;
	}

	getThursday() {
		this.getMonday().date.add(3, 'd');
		return this;
	}

	getFriday() {
		this.getMonday().date.add(4, 'd');
		return this;
	}

	getSaturday() {
		this.getMonday().date.add(5, 'd');
		return this;
	}

	getSunday() {
		this.getMonday().date.add(6, 'd');
		return this;
	}

	getDate() {
		return this.date;
	}

	format() {
		var day = this.date;
		var dag = day.get('date');
		var month = day.get('month');
		var year = day.get('year');

		month = this.normalizeMonth(month);
		dag = this.normalizeDay(dag);
		return year + '-' + (month) + '-' + dag;
	}

	normalizeMonth(month) {
		month += 1;
		return (month >= 10) ? month : '0' + month;
	}

	normalizeDay(day) {
		day += 1;
		return (day >= 10) ? day : '0' + day;
	}

}