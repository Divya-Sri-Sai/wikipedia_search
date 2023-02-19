let spinner = document.getElementById("spinner");
let inputEle = document.getElementById("searchInput");
let seachResultsEle = document.getElementById("searchResults");

function createAndAppendSearchResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //1 creating result item--div
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    seachResultsEle.appendChild(resultItem);
    //2 tile element-anchor Element
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-item");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank"; //to open in new HTMLTableCaptionElement
    resultItem.appendChild(resultTitleEl);
    //3Title break
    let titleBreakEle = document.createElement("br");
    resultItem.appendChild(titleBreakEle);
    //4Anchor url ---result-url
    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.href = link;
    urlEle.target = "_blank";
    urlEle.textContent = link;
    resultItem.appendChild(urlEle);
    //5line break
    let lineBreakEle = document.createElement("br");
    resultItem.appendChild(lineBreakEle);
    //6 paragarph description line-description
    let descriptionEl = document.createElement("p");
    descriptionEl.classList.add("line-description");
    descriptionEl.textContent = description;
    resultItem.appendChild(descriptionEl);
}

function displayResults(search_results) {
    spinner.classList.toggle("d-none");
    for (let result of search_results) {
        createAndAppendSearchResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        seachResultsEle.textContent = "";
        spinner.classList.toggle("d-none");
        let searchInput = inputEle.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET"
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsondata) {
                let {
                    search_results
                } = jsondata; //object destructing
                displayResults(search_results);
            });
    }
}
inputEle.addEventListener("keydown", searchWikipedia);