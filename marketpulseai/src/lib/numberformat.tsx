export function formatNumber(value : number) {
    if (value >= 1e12) {
      return `${(value / 1e12).toFixed(2)} trillion`;
    } else if (value >= 1e9) {
      return `${(value / 1e9).toFixed(2)} billion`;
    } else if (value >= 1e6) {
      return `${(value / 1e6).toFixed(2)} million`;
    } else if (value >= 1e3) {
      return `${(value / 1e3).toFixed(2)} thousand`;
    } else {
      return value.toString();
    }
  }
  