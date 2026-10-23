function calculateRent() {
    const monthlyRent = parseFloat(document.getElementById('monthlyRent').value);
    const duration = parseInt(document.getElementById('duration').value);

    const totalCost = monthlyRent * duration;
    document.getElementById('totalCost').innerHTML = "Total Biaya Sewa: Rp " + totalCost.toLocaleString();
}