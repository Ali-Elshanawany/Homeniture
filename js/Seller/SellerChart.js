import { getSellerSalesByMonth } from "../Data.js";
// import gradient from 'chartjs-plugin-gradient';
const dataValues = getSellerSalesByMonth();
const ctx = document.getElementById("myChart").getContext("2d");

// * Find the highest value
const maxValue = Math.max(...dataValues);

// * Assign Diffrent Color For The Highest Value
const backgroundColors = dataValues.map(
    (value) => (value === maxValue ? "#002333" : "#B4BEC9") // * Red for the highest, blue for others
);


const config = {
    type: "bar",
    data: {
        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "June",
            "July",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        datasets: [
            {
                data: dataValues,
                backgroundColor: backgroundColors,
                borderColor: "black",
                borderWidth: 2,
                tension: 0.4,
                fill: true,
            },
        ],
    },
    options: {
        animation: {
            duration: 3000, 
            easing: "easeOutQuart", 
        },
        responsive: true, // * Ensures the chart adjusts to the container size
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (tooltipItem) {
                        return `Month: ${tooltipItem.label}, Sales: ${tooltipItem.raw}`;
                    },
                },
            },
            legend: false, 
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: "rgba(0, 0, 0, 0.1)", // Light grid lines
                },
            },
        },
    },
};






const chart = new Chart(ctx, config);

// * Without This Action The Chart Won't be Responsive
window.addEventListener("resize", () => {
    chart.resize();
});
