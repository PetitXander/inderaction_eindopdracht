


const getCoinData = async (vs_coin, vs_currency, result_view) =>{
    document.getElementById('image_coin').src = "svg/833.svg";
    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${vs_currency}&ids=${vs_coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`

    const data = await fetch(url)
	.then((res) => res.json())
    .catch(err => console.error(err))
    


    console.log(data[0]);
    var image = data[0].image;

    document.getElementById('image_coin').src = image;

    var price = data[0].current_price;
    document.getElementById('price_coin').innerHTML = price;

    var percentage  = data[0].price_change_percentage_24h;
    percentage = percentage.toFixed(2) + " %";
    var percentage_color;

    if (percentage < 0){
        percentage_color = "red";
    }
    else{
        percentage_color = "green";
    }

    document.getElementById('percentage_coin').innerHTML = percentage;
    document.getElementById('percentage_coin').style.color = percentage_color;

    var volume = data[0].total_volume;
    volume = volumeformat(volume);
    volume = parseFloat(volume).toFixed(2) + volume.replace(/[^B|M|K]/g,"");
    document.getElementById('volume_coin').innerHTML = volume;

    var max_24h = data[0].high_24h;
    document.getElementById('max_coin').innerHTML = max_24h;
    var min_24h = data[0].low_24h;
    document.getElementById('min_coin').innerHTML = min_24h;


    

};

function volumeformat(labelValue) 
{
// Nine Zeroes for Billions
return Math.abs(Number(labelValue)) >= 1.0e+9

     ? Math.abs(Number(labelValue)) / 1.0e+9 + "B"
     // Six Zeroes for Millions 
     : Math.abs(Number(labelValue)) >= 1.0e+6

     ? Math.abs(Number(labelValue)) / 1.0e+6 + "M"
     // Three Zeroes for Thousands
     : Math.abs(Number(labelValue)) >= 1.0e+3

     ? Math.abs(Number(labelValue)) / 1.0e+3 + "K"

     : Math.abs(Number(labelValue));

 }

function distributedCopy(items, n) {
    var elements = [items[0]];
    var totalItems = items.length - 2;
    var interval = Math.floor(totalItems/(n - 2));
    for (var i = 1; i < n - 1; i++) {
        elements.push(items[i * interval]);
    }
    elements.push(items[items.length - 1]);
    return elements;
}

const load_chart = async (vs_coin, vs_currency, result_view) =>{

    var ts = Math.round(new Date().getTime() / 1000);
    var ts2 = new Date();
     // 24h : ts - (24 * 3600)
     // 7d : ts - (24 * 3600 * 7)

    if (result_view == 1){
        var ts2 = ts - (24 * 3600);
    }
    else if (result_view == 2){
        var ts2 = ts - (24 * 3600 * 7);
    }
    else if (result_view == 3){
        var ts2 = ts - (24 * 3600 * 14);
    }
    else if (result_view == 4){
        var ts2 = ts - (24 * 3600 * 30);
    }
    else if (result_view == 5){
        var ts2 = ts - (24 * 3600 * 183);
    }
    else if (result_view == 6){
        var ts2 = ts - (24 * 3600 * 365);
    }
    

    let url = `https://api.coingecko.com/api/v3/coins/${vs_coin}/market_chart/range?vs_currency=${vs_currency}&from=${ts2}&to=${ts}`;
    
    const data = await fetch(url)
	.then((res) => res.json())
    .catch(err => console.error(err))
    
    console.log(data.prices);

    var spaced = distributedCopy(data.prices, 14);
    console.log(spaced);

    var arr_time = new Array();
    var arr_price = new Array();
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     

    spaced.forEach(element =>{
        var date = new Date(element[0]);
        var year = date.getFullYear();
        var month = months_arr[date.getMonth()];
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var formattedTime = day+'-'+month+'-'+year+' '+hours + ':' + minutes.substr(-2);
        arr_time.push(formattedTime);

        var price = element[1];
        price = price.toFixed(0);
        arr_price.push(price);
    })

    console.log(arr_time);
    console.log(arr_price);
    

    
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: arr_time,
            datasets: [{
                label: 'Price',
                data: arr_price,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        }
    });

}

document.addEventListener('DOMContentLoaded', function() {
    

    const coin = document.getElementById("select_coin");
    var result_coin = coin.options[coin.selectedIndex].value;  
    console.log(result_coin);

    const cur = document.getElementById("select_cur");
    var result_cur = cur.options[cur.selectedIndex].value;
        console.log(result_cur);

    const view = document.getElementById("select_view");
    var result_view = view.options[view.selectedIndex].value;
        console.log(result_view);


    coin.addEventListener("change", function() {
        result_coin = coin.options[coin.selectedIndex].value;
        console.log(result_coin);
        getCoinData(result_coin, result_cur);
        load_chart(result_coin, result_cur, result_view);
    })

    cur.addEventListener("change", function() {
        result_cur = cur.options[cur.selectedIndex].value;
        console.log(result_cur);
        getCoinData(result_coin, result_cur);
        load_chart(result_coin, result_cur, result_view);
    })

    view.addEventListener("change", function() {
        result_view = view.options[view.selectedIndex].value;
        console.log(result_view);
        load_chart(result_coin, result_cur, result_view);
    })

    // alles voor ophalen currency
    
    
	console.log("domcontent loaded")
    getCoinData(result_coin, result_cur, result_view);
    load_chart(result_coin, result_cur, result_view);
});