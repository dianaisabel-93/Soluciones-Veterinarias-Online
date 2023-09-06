const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
})

// Traer Info de HTML

const cartInfo = document.querySelector('.cart-products');
const rowProduct = document.querySelector('.row-products');

// Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items');

// Variable de almacenar los productos en un arreglo
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');

const countProducts = document.querySelector('#contador-productos');

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

//Crear un evento al realizar clic en los productos de la tienda
productsList.addEventListener('click', e => {
	if (e.target.classList.contains('btn-add-cart')) {
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1,
			title: product.querySelector('h2').textContent,
			price: product.querySelector('p').textContent,
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		);

		if (exits) {
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML();
	}
});

//Crear un evento clic en el icono de eliminar productos
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

		allProducts = allProducts.filter(
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  el contenido HTML del carrito
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');

		//Agrega la clase para ocultar el mensaje
		cartEmpty.classList.remove('hidden-message');

		//Guardar los datos del carrito en localStorage
		localStorage.setItem('cart', JSON.stringify(allProducts));

	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');

		//Quita la clase para ocultar el mensaje
		cartEmpty.classList.add('hidden-message');

		//Guardar los datos del carrito en localStorage
		localStorage.setItem('cart', JSON.stringify(allProducts));

	}

	// Limpiar HTML
	rowProduct.innerHTML = '';

	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-products');

		containerProduct.innerHTML = `
        <div class="info-cart-products">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>
        </div>
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"     
            stroke-width="1.5" 
            stroke="currentColor" 
            class="icon-close">
            
            <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M6 18L18 6M6 6l12 12" />
        </svg> 
        `;

		rowProduct.append(containerProduct);
		
		//Convertir el precio a número eliminando el simbolo de moneda y los puntos
		const numericPrice = parseFloat(product.price.replace('$','').replace('.', ''));

		total += parseInt(product.quantity * numericPrice);
		totalOfProducts = totalOfProducts + product.quantity;
		
	});

	//Formatear el valor del total con separadores de miles y el simbolo de moneda
	valorTotal.innerText = `$${total.toLocaleString()}`;
	countProducts.innerText = totalOfProducts;

};

//Cargar datos del carrito desde locaLStorage cuando la pagina se carga
window.addEventListener('DOMContentLoaded', () => {
	const storedCart = localStorage.getItem('cart');
	if (storedCart) {
		allProducts = JSON.parse(storedCart);
		showHTML();
	}
})