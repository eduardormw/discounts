// JavaScript Document

var _order1, _order2, _order3, _products;
$.getJSON("dev/products.json", function(data) {	_products = data; getProducts(_products); });

setTimeout(function() { 
	$.getJSON("dev/order1.json", function(data) {	_order1 = data;  getDiscount(_order1); });
	$.getJSON("dev/order2.json", function(data) {	_order2 = data; getDiscount(_order2);   });
	$.getJSON("dev/order3.json", function(data) {	_order3 = data;  getDiscount(_order3); });
}, 100);

// var _discounts =[['0.1', 'total', '1', '1000'],['0.2', 'quantity', '1', '5', 'category:2'],['0.2', 'quantity', '2', '2', 'category:1']];

function getProducts(listProducts) {
	$.each(listProducts, function(key, val) {
		_products.push(val);
	});	
}

function checkProdData(id, itemName) {
		var result = '';
		$.each(_products, function(key, val) {
			if(id == val['id']) {
				result = val[itemName];
				 return false; 
			}
		});	
		return result;
}

function getDiscount(order) {
	var _category, quantity;
	var _discount = 'NA';
	var _totalQuantity = 0;
	var _cheapest = [];
	_cheapest[0] = order['items'][0]['unit-price'];
	_cheapest[1] =  order['items'][0]['id'];
	$.each(order['items'], function(key, val) {
		_id = val['product-id'];
		_quantity = val['quantity'];
		_unitPrice = val['unit-price'];
		_category = checkProdData(_id, 'category');
		
		console.log('id: ' + _id);
		console.log('quantity: ' + _quantity);
		console.log('unit-price: ' + _unitPrice);
		console.log('total: ' +  val['total']);
		console.log('category: ' + _category);
		console.log('----------------');
		
		if(_category == 2 && _quantity == 5) {
			_discount = _id + ' sixth for free';
		}
		
		if(_category == 1) {
			_totalQuantity = _totalQuantity +  parseInt(_quantity);
			if(parseFloat(_unitPrice) <= parseFloat(_cheapest[0])) {
				_cheapest[0] = _unitPrice;
				_cheapest[1] = _id;
			}
		}
		
	});
	
	if(_totalQuantity >= 2) { _discount = "20% discount for " + _cheapest[1];	}
	if(order['total'] > 1000) { _discount = "10%"; } 
	
	console.log('discount: ' + _discount);
	console.log('total: ' + order['total']);
	console.log('');
	
}