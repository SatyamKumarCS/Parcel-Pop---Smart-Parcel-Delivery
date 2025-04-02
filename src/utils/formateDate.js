const formatDate = date => {
    if (!date) return ''; // Handle empty or invalid date
    const formattedDate = new Date(date).toISOString().split('T')[0]; // Extract date part only (YYYY-MM-DD)
    return formattedDate;
};

export default formatDate;
