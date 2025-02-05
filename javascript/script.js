<<<<<<< HEAD
const DISTANCE = {
  "driving": {
    "distance": "10km", 
    "time": "35 mins"
  }, 
  "walking": {
    "distance": "11km", 
    "time": "2 hours 5 mins"
  }
};

var LOCAL_FOOD_BANK = [
  {
    "address": "Address 1", 
    "name": "Food Bank 1", 
    "phone": "Phone Number 1"
  }, 
  {
    "address": "Address 2", 
    "name": "Food Bank 2", 
    "phone": "Phone Number 2"
  }, 
  {
    "address": "Address 3", 
    "name": "Food Bank 3", 
    "phone": "Phone Number 3"
  }
];


// Utility Functions

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
=======


>>>>>>> master

async function postData(url = '', data = {}) {

	const response = await fetch(url, {
		method: 'POST', 
		mode: 'no-cors', 
		cache: 'no-cache', 
		credentials: 'same-origin', 
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow', 
		referrerPolicy: 'no-referrer', 
		body: JSON.stringify(data) 
	});

	return response;

}

<<<<<<< HEAD
// Utility Functions
=======
>>>>>>> master

async function getLocalFoodBanks(address, radius) {
	return await postData('http://localhost:8000/getAvailableBanks', {'address': address, 'radius': radius}).then(r => {return r.json()}).then(r => {return r});
}

async function getDistance(address1, address2) {
    return await postData('http://localhost:8000/getDistance', {'address1': address1, 'address2': address2}).then(r => {return r.json()}).then(r => {return r});
}

async function getDistances(address1, address2) {
    var response;
    try {
        response = await getDistance(address1, address2);
    } catch (err) {
        console.log(err)
        response = DISTANCE;
    }
    return response;
}

function formatJson(address, json) {
    var total = "";

    distance = getDistances(address, json['address'])
    
    total += "Name: " + json['name']
    total += "\nAddress: " + json['address'];
    total += "\nPhone Number: " + json['phone'];

    total += "\nWalking Distance: " + distance['walking']['distance'] + " (" + distance['walking']['time'] + ")";
    total += "\nDriving Distance: " + distance['driving']['distance'] + "(" + distance['driving']['time'] + ")";

    return total;
}


async function getFoodBanks() {
    const address = document.getElementById('postal-code').value;
    const radius = document.getElementById('radius').value;
    var response;

    if (address == '') {
        alert('Address or Postal Code must be filled');
    } else {
        try {
            response = await getLocalFoodBanks(address, radius);
        } catch (err) {
            console.log(err)
            response = LOCAL_FOOD_BANK;
        }
        var response_list = document.getElementById('search-results')
        response_list.innerHTML = ''
        for (var i = 0; i < response.length; i++) {
            var node = document.createElement("LI");       
            var textnode = document.createTextNode(formatJson(address, response));
            node.appendChild(textnode);                      
            response_list.appendChild(node)
        }
    }

    
}
