window.onload = () => {

    //get previous sales;
    get_coffee_sales();

    //calculate selling price on quantity or unit cost change;
    $('#unit-cost,#quantity').on('keyup',  () => {
        update_selling_price()
    })
    $('#product').on('change', () => {
        update_selling_price()
    })

    $('#record-sale').on('click', () => {
        record_sale();
    })
}

const get_coffee_sales = async () => {
    await axios.get("/coffee-sales")
        .then( ({data}) => {
            data.sales.map( sale => {
                insert_new_sale_row(sale)
            })
        })
        .catch( err => {
            console.log(err)
        })
}

/**
 * Record Sale Action
 */
const record_sale = async () => {
    let quantity = document.querySelector("#quantity").value;
    let unit_cost = document.querySelector("#unit-cost").value;
    let selling_price = document.querySelector("#selling-price-value").value;
    let product = document.querySelector('#product');
    product = product ? product.options[product.selectedIndex].value : null;

    //alert and ignore if any are missing
    if(!quantity || !unit_cost || !selling_price){
        alert("Please check fields and try again...")
        return false;
    }

    //ajax call to record sale 
    await axios.post("/coffee-sales/store", {
        quantity: parseInt(quantity),
        unit_cost:  parseFloat(unit_cost),
        selling_price: parseFloat(selling_price),
        product: product
    })
    .then( ({data}) => {
        if(data.status == 200){
            //add table row with sale data;
            insert_new_sale_row(data.sale)
        }
    })
    .catch( ({ response }) => {
        let errorsText = '';
        Object.keys(response.data.errors).map( errorKey => {
            errorsText += `${response.data.errors[errorKey]} \n`;
        })
        alert(errorsText);
    })
}

const insert_new_sale_row = async (sale) => {
    let newRowData = `<tr>
        <td class='capitalize'>${sale.product} Coffee</td>
        <td>${sale.quantity}</td>
        <td>£${(sale.unit_cost / 100).toFixed(2)}</td>
        <td>£${(sale.selling_price / 100).toFixed(2)}</td>
        <td>${moment(sale.created_at).format('MMM Do YYYY')}</td>
    </tr>`
    let tbody = $('#previous-sales').find('tbody').append(newRowData);
}

const update_selling_price = () =>  {
    //init variables using input fields or defaults;
    let shipping_cost = 10;
    let product = document.querySelector('#product');
    product = product ? product.options[product.selectedIndex].value : null;
    let quantity = parseInt(document.querySelector('#quantity').value);
    let unit_cost = parseFloat(document.querySelector('#unit-cost').value);

    //calc selling_price;
    let selling_price = calculate_selling_price(quantity, unit_cost, product, shipping_cost)

    //ignore if no selling_price calculated;
    if(!selling_price) return false;

    //update dom with selling price;
    document.querySelector('#selling-price').innerHTML = `£${selling_price}`;
    document.querySelector('#selling-price-value').value = selling_price;
}

const calculate_selling_price = (quantity, unit_cost, product, shipping_cost) => {
    let profit_margin;
    //calc cost;
    let cost = parseInt(quantity) * parseFloat(unit_cost);
    
    //set profit_margin based on product
    switch(product){
        case 'arabic':
            profit_margin = 0.15;
            break;
            
        case 'gold':
            profit_margin = 0.25;
            break;

        default:
            profit_margin = 0.25;
    }
    //calc selling price;
    let selling_price = ( cost / ( 1 - profit_margin ) ) + shipping_cost;

    //ignore if not a number;
    if(isNaN(selling_price)) return false;
    
    return selling_price.toFixed(2);
}

export {
    calculate_selling_price
};