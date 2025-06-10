const gray = "#e2e8f0";
const graySecondary = "#475569";

export const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
        legend: {
            labels: {
                color: graySecondary
            }
        }
    },
    scales: {
        x: {
            ticks: {
                color: graySecondary
            },
            grid: {
                color: gray,
                drawBorder: false
            }
        },
        y: {
            ticks: {
                color: graySecondary
            },
            grid: {
                color: gray,
                drawBorder: false
            }
        }
    }
};