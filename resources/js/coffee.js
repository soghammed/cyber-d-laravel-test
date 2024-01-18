window.onload = () => {

    //get previous sales;
    getCoffeeSales();

    //calculate selling price on quantity or unit cost change;
    $('#unit-cost,#quantity').on('keyup',  () => {
        selling_price_calculator()
    })

    $('#record-sale').on('click', () => {
        recordSale();
    })
}

const getCoffeeSales = async function(){
    await axios.get("/api/coffee-sales")
        .then( ({data}) => {
            data.sales.map( sale => {
                insertNewSaleRow(sale)
            })
        })
        .catch( err => {
            console.log(err)
        })
}

const recordSale = async () => {
    let quantity = document.querySelector("#quantity").value;
    let unit_cost = document.querySelector("#unit-cost").value;
    let selling_price = document.querySelector("#selling-price-value").value;

    //alert and ignore if either are missing
    if(!quantity || !unit_cost){
        alert("Please check fields and try again...")
        return false;
    }

    await axios.post("/api/coffee-sales/store", {
        quantity: parseInt(quantity),
        unit_cost:  parseFloat(unit_cost),
        selling_price: parseFloat(selling_price),
    })
    .then( ({data}) => {
        if(data.status == 200){
            insertNewSaleRow(data.sale)
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

const insertNewSaleRow = async (sale) => {
    let newRowData = `<tr>
        <td>${sale.quantity}</td>
        <td>£${(sale.unit_cost / 100).toFixed(2)}</td>
        <td>£${(sale.selling_price / 100).toFixed(2)}</td>
    </tr>`
    let tbody = $('#previous-sales').find('tbody').append(newRowData);
}

const selling_price_calculator = function() 
{
    //init variables using input fields or defaults;
    let profit_margin;
    let shipping_cost = 10;
    let product = document.querySelector('#product');
    let quantity = parseInt(document.querySelector('#quantity').value);
    let unit_cost = parseFloat(document.querySelector('#unit-cost').value);
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

    //calc selling_price;
    let selling_price = ( cost / ( 1 - profit_margin ) ) + shipping_cost;

    //ignore selling_price if not a number;
    if(isNaN(selling_price)) return false;

    //update dom with selling price;
    document.querySelector('#selling-price').innerHTML = `£${selling_price.toFixed(2)}`;
    document.querySelector('#selling-price-value').value = selling_price.toFixed(2);
}