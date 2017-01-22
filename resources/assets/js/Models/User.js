import Model from './Model';

class User extends Model{

	
	save() {
		API.post('users/save', this.data(), this.success, function() {
			// notify the user if something went wrong. 
		});
	}

	update() {
		API.post('users/update/' + this.id, this.data(), this.success, function() {
			// notify the user if something went wrong. 
		});
	}

	delete(confirm = false, success) {
		if(confirm == true) {
			Notifier.askConfirmation(() => {
				API.delete('users/remove', this.id);
				success();
			});
		}else{
			API.delete('users/remove', this.id);
			success();
		}

	}
	static all(success, failure) {
		super.all('users', data => new User(data), success, failure );
	}

	static find(id, success, failure) {
		API.get('users/' + id + '/edit', function(data){
			let user = new User(data);
			success(user);
			Event.fire('userLoaded');
		}, failure);
	}

}

export default User;