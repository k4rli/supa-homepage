/*global document*/

function parseStringToHtml(string) {
    const tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = string;
    return tmp.body.children;
}

const htmlTableParsedAsJson = (html) => {
    const htmlContent = parseStringToHtml(html)[1];
    if (htmlContent === undefined) {
        return [];
    }
    const rows = Array.from(htmlContent.getElementsByTagName('tr'));
    const tableHeaderNames = [
        rows[0].getElementsByTagName('th')[0].innerText.trim(),
        rows[0].getElementsByTagName('th')[1].innerText.trim(),
        rows[0].getElementsByTagName('th')[2].innerText.trim()
    ];
    rows.splice(0, 1);

    const results = rows.map(row => ({
            event: row.getElementsByTagName('td')[0].innerText,
            date: row.getElementsByTagName('td')[1].innerText,
            location: row.getElementsByTagName('td')[2].innerText
        }));

    return [tableHeaderNames, results];
};

export default htmlTableParsedAsJson;
