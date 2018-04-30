// async donate-bitcoin Copyright (GPL) 2017  Enrique Saez Gil
// Based on: donate-bitcoin Copyright (GPL) 2016  Nathan Robinson
// (https://github.com/nrobinson2000/donate-bitcoin)

var address = "3KLWgFp8ExohW8Gw9ZLPasdgUwRKHFv3rX";
// The bitcoin address to receive donations. Change to yours
var qrcodeOption = true;
// Set to false to disable qrcode
var link = true;
// Set to false to disable generating hyperlink
var mbits = false;
// Set to false to display bitcoin traditionally
var defaultCurrency = 'EUR'
// Default currency. Change to your default currency.
// Choose from https://api.bitcoinaverage.com/ticker/
var defaultAmountToDonate = 5;
// Default amount to donate

var params = {};
var currencyCode = defaultCurrency.toUpperCase();

// parse query params
if (location.search) {
    var parts = location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0])
            continue;
        params[nv[0]] = nv[1] || true;
    }
}

if (params.currency) {
    currencyCode = params.currency.toUpperCase();
}
;if (params.mbits == "true") {
    mbits = true
}
;if (params.mbits == "false") {
    mbits = false
}

function noValidInput(fiatUserInput) {
    return isNaN(fiatUserInput) == true;
}

function amountRequestedInUrl() {
    return isNaN(params.amount) == false
}

function getFiatDonationAmount() {
    // if user sets an amount, we will use it
    var fiatUserInput = parseFloat(document.getElementById("donatebox").value);
    if (noValidInput(fiatUserInput) && !amountRequestedInUrl()) {
        return defaultAmountToDonate;
    } else if (noValidInput(fiatUserInput) && amountRequestedInUrl()) {
        return params.amount;
    }
    return fiatUserInput;
}

function getBitcoinPrice(currencyExchangeResponse) {
    try {
        return currencyExchangeResponse[currencyCode]['buy'];
    } catch (err) {
        handlePricingError(currencyExchangeResponse);
        return currencyExchangeResponse[defaultCurrency]['buy'];
    }
}

function handlePricingError(currencyExchangeResponse) {
    alert('Could not find the requested currency, will be using Euros instead');
    currencyCode = defaultCurrency;
}

function computeBitcoinAmount(fiatDonationAmount, bitcoin_price) {
    var bitcoinAmountToDonate = (fiatDonationAmount / bitcoin_price).toFixed(5);
    return bitcoinAmountToDonate;
}

function composeDonationElements(bitcoinAmountToDonate, fiatDonationAmount) {
    var url = "bitcoin:" + address + "?amount=" + bitcoinAmountToDonate;
    var fiatAmountToDonateMessage = " (" + fiatDonationAmount + " " + currencyCode + ") " + "to " + address;
    var donateDisplayMessage = " Please send " + bitcoinAmountToDonate.toString() + " Bitcoin" + fiatAmountToDonateMessage;
    if (mbits == true) {
        var mbitprice = (bitcoinAmountToDonate * 1000).toFixed(2);
        donateDisplayMessage = " Please send " + mbitprice.toString() + " mBits" + fiatAmountToDonateMessage;
    }
    return {
        url: url,
        message: donateDisplayMessage
    };
}

function drawDonationElements(url, donateDisplayMessage) {
    if (qrcodeOption == true) {
        document.getElementById("qrcodeElement").innerHTML = "";
        new QRCode(document.getElementById("qrcodeElement"), url);
    }
    if (link == true) {
        document.getElementById("donatetext").innerHTML = "<br><a href='" + url + "'>" + donateDisplayMessage + "</a>";
    }
    drawCurrencyButton();
}

function drawCurrencyButton() {
    if (currencyCode == defaultCurrency) {
        document.getElementById("donationbutton").src = "/img/donate-EUR-brightgreen.svg";
    } else {
        document.getElementById("donationbutton").src = 'https://img.shields.io/badge/donate-' + currencyCode + '-brightgreen.svg?style=flat-square';
    }
}

function donate() {
    $.getJSON("https://blockchain.info/ticker?cors=true", function(currencyExchangeResponse) {
        var fiatDonationAmount = getFiatDonationAmount();
        var bitcoinPrice = getBitcoinPrice(currencyExchangeResponse);
        var bitcoinAmountToDonate = computeBitcoinAmount(fiatDonationAmount, bitcoinPrice);
        var donationElements = composeDonationElements(bitcoinAmountToDonate, fiatDonationAmount);
        drawDonationElements(donationElements.url, donationElements.message);
    });
}

$(document).keyup(function(e) {
    if ($(".input1:focus") && (e.keyCode === 13)) {
        donate();
    }
});
