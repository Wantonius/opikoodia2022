function start() {
	console.log("----------------------------------------");
	console.log("Method invocation pattern");
	
	var person = {
		name:"Calvin",
		age:25,
		greet:function() {
			console.log("My name is",this.name)
		}
	}
	
	person.greet();
	
	console.log("---------------------------------------------");
	console.log("Function invocation pattern");
	
	person.calculateAge = function(yearsFromNow) {
		function yearsOld() {
			return this.age + yearsFromNow;
		}
		
		console.log("I will be "+yearsOld()+" years old "+yearsFromNow+" years from now");
	}
	console.log(person);
	person.calculateAge(10);
	
	console.log("Let's fix this");
	
	person.calculateAge = function(yearsFromNow) {
		function yearsOld() {
			return this.age + yearsFromNow;
		}
		
		yearsOld = yearsOld.bind(this);
		console.log("I will be "+yearsOld()+" years old "+yearsFromNow+" years from now");
	}
	
	person.calculateAge(10);
}