window.Exception = new class{
	constructor() {

	}

	isType(prop, type) {
		if(typeof(prop) !== type) {
	        console.log('Helper::hasProperty expects second argument to be of type .'+ type +' ' + typeof(prop) + ' found' );
	        return false;
	    }
	    return true;
	}
}